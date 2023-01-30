window.addEventListener('load', e => {
    var selects = document.getElementsByClassName("cantidad-seleccionada");
    var forms = document.getElementsByClassName("form-producto");

    for (let i = 0; i < selects.length; i++) {
        selects[i].addEventListener('change', e => {
            forms[i].submit();
        })
    }

})