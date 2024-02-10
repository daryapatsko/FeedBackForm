import { showModal } from "./modal";

const form = document.getElementById('form');
form.addEventListener('submit', formSubmit);
let url = 'http://localhost:9090/api/registration';

async function formSubmit(e) {
	e.preventDefault();
	let error = formValidate(form);
	let formData = new FormData(form);
    if(error === 0){
        await postData(url, formData);
    }
	
}
function formValidate(form) {
	let error = 0;
	let formReq = document.querySelectorAll('._req');

	for (let ind = 0; ind < formReq.length; ind++) {
		const input = formReq[ind];
		formDeleteError(input);

		if (input.classList.contains('_email')) {
			if (validationEmail(input)) {
				formAddError(input);
				error++;
			}
		} else {
			if (input.value === '') {
				formAddError(input);
				error++;
			}
		}
	}
    return error
}

function formAddError(input) {
	input.parentElement.classList.add('_error');
	input.classList.add('_error');

    let errorText = input.parentElement.querySelector('.error_text');
    if(!errorText) {
        errorText = document.createElement('span');
        errorText.classList.add('error_text');
        input.parentElement.appendChild(errorText);
    }

    errorText.textContent = `Заполните поле корректно!` 
}
function formDeleteError(input) {
	input.parentElement.classList.remove('_error');
	input.classList.remove('_error');
	let errorText = input.parentElement.querySelector('.error_text');
	if(errorText){
		errorText.remove()
	}
}

function validationEmail(input) {
	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}

async function postData(url, data) {
	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		let result = await response.json();
		if (result.status === 'success') {
			showModal();
			form.reset();
		} else if  (result.status === 'error'){
            alert(result.message)
			// const errorFields = result.fields;
			// for (const field in errorFields) {
			// 	errorMessage = errorFields[field];
            // alert(`Проверьте введенные данные: ${errorMessage} в поле ${field}`)};
		}
	} catch (error) {
		console.error('Произошла ошибка:', error);
	}
}

