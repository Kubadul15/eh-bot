/**
 * Parsuje wiek podany przez gracza. Zwraca liczbe calkowita 1-100
 * albo null, jesli wartosc jest nieprawidlowa (np. tekst, ulamek,
 * liczba ujemna albo absurdalnie duza).
 */
function parseAge(rawAge) {
  if (!/^\d{1,3}$/.test(rawAge.trim())) return null;
  const age = Number(rawAge);
  if (!Number.isInteger(age) || age < 1 || age > 100) return null;
  return age;
}

/**
 * Parsuje rok produkcji pojazdu. Zwraca liczbe calkowita w rozsadnym
 * zakresie (1900 - obecny rok + 1) albo null, jesli nieprawidlowa.
 */
function parseYear(rawYear) {
  if (!/^\d{4}$/.test(rawYear.trim())) return null;
  const year = Number(rawYear);
  const maxYear = new Date().getFullYear() + 1;
  if (!Number.isInteger(year) || year < 1900 || year > maxYear) return null;
  return year;
}

/**
 * Parsuje numer rejestracyjny pojazdu podany przez gracza. Zwraca
 * znormalizowany (wielkie litery, przycieta biala spacja) numer albo
 * null, jesli zawiera niedozwolone znaki lub ma nieprawidlowa dlugosc.
 */
function parsePlateNumber(rawPlate) {
  const trimmed = rawPlate.trim().toUpperCase();
  if (!/^[A-Z0-9 -]{3,12}$/.test(trimmed)) return null;
  return trimmed;
}

module.exports = { parseAge, parseYear, parsePlateNumber };
