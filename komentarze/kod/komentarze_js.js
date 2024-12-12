// Skrypt obsługujący dynamiczne wyświetlanie wyniku oraz zliczanie punktów w czasie rzeczywistym
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('quizForm');
    const resultDiv = document.getElementById('result');

    // Funkcja zliczająca punkty na bieżąco
    function calculateLiveScore() {
        const formData = new FormData(form);
        let liveScore = 0;

        // Poprawne odpowiedzi na każde pytanie
        const correctAnswers = { question0: "1", question1: "2", question2: "3" };
        
        for (const [question, answer] of formData.entries()) {
            if (correctAnswers[question] === answer) {
                liveScore++;
            }
        }
        
        resultDiv.innerHTML = `Twój bieżący wynik: ${liveScore} punktów`;
    }

    // Wywołaj funkcję `calculateLiveScore` przy każdej zmianie odpowiedzi
    form.addEventListener("change", calculateLiveScore);

    // Funkcja do obsługi przesyłania formularza i dynamicznego wyświetlania wyniku końcowego
    form.onsubmit = async function(event) {
        event.preventDefault();

        // Pobranie danych formularza do wysyłki
        const formData = new FormData(form);

        // Sprawdzenie, czy użytkownik odpowiedział na każde pytanie
        let allAnswered = true;
        for (let i = 0; i < 3; i++) {
            if (!formData.has(`question${i}`)) {
                allAnswered = false;
                break;
            }
        }

        if (!allAnswered) {
            resultDiv.innerHTML = "Proszę odpowiedzieć na wszystkie pytania przed wysłaniem.";
            return;
        }

        // Wysyłka danych do serwera za pomocą fetch i wyświetlenie wyniku końcowego
        try {
            const response = await fetch('test.php', {
                method: 'POST',
                body: formData
            });

            // Sprawdzenie odpowiedzi
            if (!response.ok) {
                throw new Error("Wystąpił błąd podczas przetwarzania odpowiedzi.");
            }

            // Wyświetlanie wyniku końcowego
            const resultText = await response.text();
            resultDiv.innerHTML = resultText;

        } catch (error) {
            resultDiv.innerHTML = "Błąd: " + error.message;
        }
    };
});