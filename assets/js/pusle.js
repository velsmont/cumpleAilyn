        // ---- Primera parte: suma ----
        document.querySelectorAll('.option').forEach(btn => {
            btn.addEventListener('click', () => {
                const val = btn.getAttribute('data-value');
                if (val === "7") {
                    document.getElementById("confetti").style.display = "block";
                    setTimeout(() => {
                        document.getElementById("animal-section").style.display = "block";
                    }, 800);
                } else {
                    alert("Respuesta incorrecta. Intenta otra vez.");
                }
            });
        });

        // ---- Segunda parte: animal favorito ----
        const input = document.getElementById("animal-input");
        input.addEventListener("input", () => {
            if (input.value.trim().toLowerCase() === "capibara") {
                document.getElementById("celebracion-img").style.display = "block";
                document.getElementById("btn-siguiente").style.display = "inline-block";
            }
        });
