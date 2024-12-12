#include <iostream> // Dołączenie biblioteki standardowej do wejścia i wyjścia

using namespace std;

// Funkcja iteracyjna do obliczania silni
int silniaIteracyjna(int n) {
    int wynik = 1; // Zmienna przechowująca wynik, początkowo 1
    for (int i = 1; i <= n; ++i) { // Pętla iterująca od 1 do n
        wynik *= i; // Mnożenie wyniku przez bieżący indeks i
    }
    return wynik; // Zwracanie wyniku końcowego
}

// Funkcja rekurencyjna do obliczania silni
int silniaRekurencyjna(int n) {
    if (n <= 1) // Sprawdzanie warunku podstawowego: silnia 0 i 1 to 1
        return 1;
    else
        return n * silniaRekurencyjna(n - 1); // Wywołanie rekurencyjne
}

int main() {
    int liczba;
    
    // Wprowadzenie liczby przez użytkownika
    cout << "Podaj liczbe, aby obliczyc jej silnie: ";
    cin >> liczba;

    // Obliczanie silni metodą iteracyjną
    int wynikIteracyjny = silniaIteracyjna(liczba);
    cout << "Silnia (iteracyjna) liczby " << liczba << " wynosi: " << wynikIteracyjny << endl;

    // Obliczanie silni metodą rekurencyjną
    int wynikRekurencyjny = silniaRekurencyjna(liczba);
    cout << "Silnia (rekurencyjna) liczby " << liczba << " wynosi: " << wynikRekurencyjny << endl;

    return 0; // Zakończenie programu
}