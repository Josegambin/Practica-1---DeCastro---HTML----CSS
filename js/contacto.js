//  VALIDACIÓN DEL FORMULARIO EN TIEMPO REAL
const formContacto = document.getElementById("formulario-contacto");

if (formContacto) {
    const nombre = document.getElementById("nombre");
    const correo = document.getElementById("correo");
    const mensaje = document.getElementById("mensaje");

    const errNombre = document.getElementById("err-nombre");
    const errCorreo = document.getElementById("err-correo");
    const errMensaje = document.getElementById("err-mensaje");

    // VALIDACIÓN

    const validarNombre = () => {
        errNombre.textContent = "";
        if (nombre.validity.valueMissing) {
            errNombre.textContent = "El nombre es obligatorio.";
        } else if (nombre.validity.tooShort) {
            errNombre.textContent = "El nombre debe tener al menos 3 caracteres.";
        }
    };

    const validarCorreo = () => {
        errCorreo.textContent = "";
        if (correo.validity.valueMissing) {
            errCorreo.textContent = "El correo electrónico es obligatorio.";
        } else if (correo.validity.typeMismatch) {
            errCorreo.textContent = "Por favor, introduce una dirección válida (ej. usuario@dominio.com).";
        }
    };

    const validarMensaje = () => {
        errMensaje.textContent = "";
        if (mensaje.validity.valueMissing) {
            errMensaje.textContent = "El mensaje no puede quedar vacío.";
        } else if (mensaje.validity.tooShort) {
            errMensaje.textContent = "El cuerpo de la consulta debe tener al menos 10 caracteres.";
        }
    };

    // --- ESCUCHAMOS MIENTRAS EL USUARIO ESCRIBE ---
    nombre.addEventListener("input", validarNombre);
    correo.addEventListener("input", validarCorreo);
    mensaje.addEventListener("input", validarMensaje);

    // VALIDACIÓN FINAL AL ENVIAR
    formContacto.addEventListener("submit", (e) => {
        validarNombre();
        validarCorreo();
        validarMensaje();

        // Comprobamos si hay algún error en pantalla
        const hayErrores = errNombre.textContent !== "" ||
            errCorreo.textContent !== "" ||
            errMensaje.textContent !== "";

        if (hayErrores) {
            e.preventDefault();
        } else {
            alert("¡Formulario validado con éxito! Enviando datos...");
        }
    });
}