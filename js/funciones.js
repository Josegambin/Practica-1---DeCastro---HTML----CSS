// Esperamos a que el HTML esté completamente cargado 
// antes de ejecutar nada

document.addEventListener("DOMContentLoaded", () => {

    // CALENDARIO
    const reloj = document.getElementById("reloj");

    if (reloj) {
        const ahora = new Date();
        const meses = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];

        const year = ahora.getFullYear();
        // Añade un 0 delante si es menor de 10
        const day = String(ahora.getDate()).padStart(2, '0');
        const month = meses[ahora.getMonth()];

        reloj.querySelector(".cal-year").textContent = year;
        reloj.querySelector(".cal-day").textContent = day;
        reloj.querySelector(".cal-month").textContent = month;

        // Formato: AAAA-MM-DD
        const mesNumerico = String(ahora.getMonth() + 1).padStart(2, '0');
        reloj.setAttribute("datetime", `${year}-${mesNumerico}-${day}`);
    }


    //VENTANA EMERGENTE 
    const linkAviso = document.getElementById("enlace-aviso-legal");

    if (linkAviso) {
        linkAviso.addEventListener("click", (e) => {
            e.preventDefault();

            // Abre ventana emergente.
            window.open(
                "aviso-legal.html",
                "AvisoLegal",
                "width=500,height=400,toolbar=no,location=no,menubar=no,scrollbars=no,resizable=yes"
            );
        });
    }

});