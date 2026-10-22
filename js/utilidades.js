document.addEventListener("DOMContentLoaded", () => {

    // CALCULADORA IMC
    const btnImc = document.getElementById("btn-imc");
    if (btnImc) {
        btnImc.addEventListener("click", () => {
            const peso = parseFloat(document.getElementById("peso").value);
            const estaturaCm = parseFloat(document.getElementById("estatura").value);
            const feedback = document.getElementById("feedback-imc");
            const filas = document.querySelectorAll("#lista-imc li");

            // Limpiar resaltados
            filas.forEach(f => f.classList.remove("fila-resaltada"));

            // Validamos datos
            if (isNaN(peso) || peso <= 0 || isNaN(estaturaCm) || estaturaCm <= 0) {
                feedback.textContent = "Error: El peso y la estatura deben ser números mayores que 0.";
                feedback.style.color = "#cc0000";
                return;
            }

            feedback.style.color = "inherit";
            const estaturaM = estaturaCm / 100;
            const imc = peso / (estaturaM * estaturaM);
            feedback.textContent = `Tu IMC es ${imc.toFixed(2)}`;

            // Calculamos rango
            let rango = "";
            if (imc < 16.00) rango = "infrapeso-severo";
            else if (imc <= 16.99) rango = "infrapeso-moderado";
            else if (imc <= 18.49) rango = "infrapeso-aceptable";
            else if (imc <= 24.99) rango = "normal";
            else if (imc <= 29.99) rango = "sobrepeso";
            else if (imc <= 34.99) rango = "obeso-1";
            else if (imc <= 40.00) rango = "obeso-2";
            else rango = "obeso-3";

            // Resaltar fila
            const filaActiva = document.querySelector(`#lista-imc li[data-rango="${rango}"]`);
            if (filaActiva) filaActiva.classList.add("fila-resaltada");
        });
    }

    // CALCULADORA FRECUENCEIA CARDIACA MAXIMA
    const btnFcm = document.getElementById("btn-fcm");
    if (btnFcm) {
        btnFcm.addEventListener("click", () => {
            const edad = parseInt(document.getElementById("edad").value);
            const sexo = document.getElementById("sexo").value;
            const feedback = document.getElementById("feedback-fcm");

            // Validar
            if (isNaN(edad) || edad <= 0) {
                feedback.textContent = "Error: La edad debe ser un número mayor que 0.";
                feedback.style.color = "#cc0000";
                return;
            }

            feedback.style.color = "inherit";
            const fcm = (sexo === "mujer") ? (226 - edad) : (220 - edad);
            feedback.textContent = `Tu Frecuencia Cardíaca Máxima es ${fcm} ppm`;

            // Calcular zonas
            const zonas = [
                { id: "recuperacion", min: 0.60, max: 0.70, txt: "Zona de recuperación" },
                { id: "aerobica", min: 0.70, max: 0.80, txt: "Zona aeróbica" },
                { id: "anaerobica", min: 0.80, max: 0.90, txt: "Zona anaeróbica" },
                { id: "roja", min: 0.90, max: 1.00, txt: "Línea roja" }
            ];

            zonas.forEach(z => {
                const li = document.querySelector(`#lista-fcm li[data-zona="${z.id}"]`);
                if (li) {
                    const minPpm = Math.round(fcm * z.min);
                    const maxPpm = Math.round(fcm * z.max);
                    li.textContent = `${z.txt} (${Math.round(z.min * 100)}%–${Math.round(z.max * 100)}%) → ${minPpm}-${maxPpm} ppm`;
                }
            });
        });
    }


    // CATEGORÍA POR EDAD
    const btnCat = document.getElementById("btn-categoria");
    if (btnCat) {
        btnCat.addEventListener("click", () => {
            const anioNac = parseInt(document.getElementById("anio-nacimiento").value);
            const feedback = document.getElementById("feedback-categoria");
            const filas = document.querySelectorAll("#lista-categorias li");
            const anioActual = new Date().getFullYear();

            filas.forEach(f => f.classList.remove("fila-resaltada"));

            // Validar
            if (isNaN(anioNac) || anioNac < 1900 || anioNac > anioActual) {
                feedback.textContent = "Error: Introduce un año de nacimiento válido y razonable.";
                feedback.style.color = "#cc0000";
                return;
            }

            feedback.style.color = "inherit";
            const edad = anioActual - anioNac;

            let cat = "";
            if (edad >= 8 && edad <= 10) cat = "benjamin";
            else if (edad >= 11 && edad <= 12) cat = "alevin";
            else if (edad >= 13 && edad <= 14) cat = "infantil";
            else if (edad >= 15 && edad <= 16) cat = "cadetes";
            else if (edad >= 17 && edad <= 19) cat = "juveniles";
            else if (edad >= 20) cat = "senior";

            if (cat !== "") {
                feedback.textContent = `Con ${edad} años, tu categoría es la que aparece resaltada abajo.`;
                const filaActiva = document.querySelector(`#lista-categorias li[data-cat="${cat}"]`);
                if (filaActiva) filaActiva.classList.add("fila-resaltada");
            } else {
                feedback.textContent = `Tienes ${edad} años. No perteneces a ninguna categoría base regulada (Mínimo 8 años).`;
            }
        });
    }

    // GENERACIÓN DE TABLAS DE HORARIO
    const phManana = document.getElementById("tabla-manana-placeholder");
    const phTarde = document.getElementById("tabla-tarde-placeholder");

    if (phManana && phTarde) {
        //  Mañana
        const diasManana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
        const horasManana = ["9:00–11:00", "11:00–13:00", "13:00–15:00"];

        let htmlManana = "<table><thead><tr><th>Hora</th>";
        diasManana.forEach(d => htmlManana += `<th>${d}</th>`);
        htmlManana += "</tr></thead><tbody>";

        horasManana.forEach(hora => {
            htmlManana += `<tr><th>${hora}</th>`;
            diasManana.forEach(() => htmlManana += "<td>Abierto</td>");
            htmlManana += "</tr>";
        });
        htmlManana += "</tbody></table>";
        phManana.innerHTML = htmlManana;

        // Tarde
        const diasTarde = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
        const horasTarde = ["16:00–17:00", "17:00–18:00", "18:00–19:00", "19:00–20:00", "20:00–21:00"];

        let htmlTarde = "<table><thead><tr><th>Hora</th>";
        diasTarde.forEach(d => htmlTarde += `<th>${d}</th>`);
        htmlTarde += "</tr></thead><tbody>";

        horasTarde.forEach(hora => {
            htmlTarde += `<tr><th>${hora}</th>`;
            diasTarde.forEach(() => htmlTarde += "<td>Abierto</td>");
            htmlTarde += "</tr>";
        });
        htmlTarde += "</tbody></table>";
        phTarde.innerHTML = htmlTarde;
    }

});