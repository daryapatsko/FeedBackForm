import IMask from "imask";

const element = document.getElementById('phone');
const maskOptions = {
  mask: '+{375}(00)000-00-00'
};

const masked = IMask(element, maskOptions);

export {masked}