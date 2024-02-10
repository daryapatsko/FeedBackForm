function showModal(){
    modal.style.display = 'block';
    const closeBtn= document.querySelector('.btn__next')
    closeBtn.addEventListener('click', closeModal)
    window.addEventListener('click', outsideClick);
    function closeModal(){
        modal.style.display='none';
    }
    function outsideClick(e) {
        if (e.target === modal) {
          closeModal();
        }
    }
}

export {showModal}