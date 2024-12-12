<?php
// Definicja poprawnych odpowiedzi (indexy poprawnych odpowiedzi)
$correctAnswers = [1, 2, 3]; // Odpowiedzi do pytań 1, 2 i 3
$totalQuestions = count($correctAnswers); // Liczba wszystkich pytań

// Pobranie odpowiedzi użytkownika z POST
$userAnswers = [];
for ($i = 0; $i < $totalQuestions; $i++) {
    $userAnswers[$i] = isset($_POST["question$i"]) ? (int)$_POST["question$i"] : -1;
}

// Liczenie poprawnych odpowiedzi
$score = 0;
$details = []; // Przechowuje szczegóły wyniku dla każdego pytania

for ($i = 0; $i < $totalQuestions; $i++) {
    if ($userAnswers[$i] == $correctAnswers[$i]) {
        $score++;
        $details[] = "Pytanie " . ($i + 1) . ": poprawna odpowiedź.";
    } else {
        $details[] = "Pytanie " . ($i + 1) . ": niepoprawna odpowiedź.";
    }
}

// Przygotowanie wiadomości zwrotnej dla użytkownika
$response = "<h2>Twój wynik: $score z $totalQuestions</h2>";

// Wyświetlenie szczegółowego wyniku dla każdego pytania
$response .= "<ul>";
foreach ($details as $detail) {
    $response .= "<li>$detail</li>";
}
$response .= "</ul>";

// Informacje dodatkowe
$percentage = ($score / $totalQuestions) * 100;
$response .= "<p>Procent poprawnych odpowiedzi: " . round($percentage, 2) . "%</p>";

// Wskazówki dla użytkownika w zależności od wyniku
if ($percentage == 100) {
    $response .= "<p>Świetnie! Odpowiedziałeś poprawnie na wszystkie pytania.</p>";
} elseif ($percentage >= 50) {
    $response .= "<p>Dobrze! Masz solidną wiedzę.</p>";
} else {
    $response .= "<p>Warto jeszcze poćwiczyć, aby poprawić wynik.</p>";
}

// Zwrócenie odpowiedzi
echo $response;
?>