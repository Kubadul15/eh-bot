// Pytania egzaminu teoretycznego na Prawo Jazdy RP.
// Kolejnosc jest stala (bez losowania), zeby caly przebieg egzaminu
// dalo sie odtworzyc bezstanowo wylacznie z customId przyciskow.
const EXAM_QUESTIONS = [
  {
    question:
      'Zbliżasz się do skrzyżowania równorzędnego, na którym nie ma żadnych znaków. Kto ma pierwszeństwo przejazdu?',
    answers: [
      'Pojazd nadjeżdżający z prawej strony',
      'Pojazd nadjeżdżający z lewej strony',
      'Pojazd jadący szybciej',
      'Kto pierwszy wjedzie na skrzyżowanie',
    ],
    correctIndex: 0,
  },
  {
    question: 'Co oznacza czerwone światło na sygnalizatorze świetlnym?',
    answers: [
      'Zwolnij i jedź ostrożnie',
      'Zakaz wjazdu — musisz się zatrzymać',
      'Ustąp pierwszeństwa pieszym i jedź dalej',
      'Włącz światła awaryjne i jedź dalej',
    ],
    correctIndex: 1,
  },
  {
    question: 'Jaka jest domyślna dopuszczalna prędkość samochodu osobowego w terenie zabudowanym w dzień?',
    answers: ['30 km/h', '50 km/h', '70 km/h', '90 km/h'],
    correctIndex: 1,
  },
  {
    question: 'Znak w kształcie trójkąta z czerwoną obwódką najczęściej oznacza:',
    answers: ['Zakaz', 'Nakaz', 'Ostrzeżenie', 'Informację'],
    correctIndex: 2,
  },
  {
    question: 'Kiedy kierowca samochodu osobowego ma obowiązek jazdy na światłach mijania w dzień?',
    answers: [
      'Nigdy, tylko w nocy',
      'Przez cały rok, przez cały czas jazdy',
      'Tylko w tunelach',
      'Tylko podczas opadów deszczu',
    ],
    correctIndex: 1,
  },
  {
    question: 'Widzisz pojazd uprzywilejowany (np. karetkę) jadący z włączonym sygnałem świetlnym i dźwiękowym. Co robisz?',
    answers: [
      'Przyspieszam, żeby szybciej zjechać mu z drogi',
      'Zatrzymuję się dokładnie na skrzyżowaniu',
      'Ustępuję mu pierwszeństwa, w razie potrzeby zjeżdżam na bok i zatrzymuję się',
      'Ignoruję go, jeśli mam zielone światło',
    ],
    correctIndex: 2,
  },
];

module.exports = { EXAM_QUESTIONS };
