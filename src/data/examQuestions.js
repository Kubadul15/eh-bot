// Pula pytan egzaminu teoretycznego na Prawo Jazdy RP. Przy kazdym
// podejsciu losowany jest inny zestaw (patrz src/utils/exam.js), a
// wylosowana kolejnosc jest kodowana w customId przyciskow, wiec caly
// przebieg egzaminu dalej jest bezstanowy.
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
    question:
      'Widzisz pojazd uprzywilejowany (np. karetkę) jadący z włączonym sygnałem świetlnym i dźwiękowym. Co robisz?',
    answers: [
      'Przyspieszam, żeby szybciej zjechać mu z drogi',
      'Zatrzymuję się dokładnie na skrzyżowaniu',
      'Ustępuję mu pierwszeństwa, w razie potrzeby zjeżdżam na bok i zatrzymuję się',
      'Ignoruję go, jeśli mam zielone światło',
    ],
    correctIndex: 2,
  },
  {
    question:
      'Na przejściu dla pieszych bez sygnalizacji pieszy stoi na krawężniku i wyraźnie czeka. Co robisz?',
    answers: [
      'Przyspieszam i przejeżdżam przed nim',
      'Zwalniam i w razie potrzeby zatrzymuję się, aby go przepuścić',
      'Trąbię, żeby ustąpił mi pierwszeństwa',
      'Zjeżdżam na przeciwny pas, żeby go ominąć',
    ],
    correctIndex: 1,
  },
  {
    question: 'Kiedy wolno wyprzedzać na oznakowanym przejściu dla pieszych?',
    answers: [
      'Zawsze, jeśli nikogo nie widać',
      'Tylko w dzień',
      'Wyprzedzanie na przejściu dla pieszych jest zabronione',
      'Tylko jednośladami',
    ],
    correctIndex: 2,
  },
  {
    question: 'Zbliżasz się do przejazdu kolejowego, a czerwone światła sygnalizatora migają. Co robisz?',
    answers: [
      'Zatrzymuję się przed przejazdem',
      'Przyspieszam, żeby zdążyć przed pociągiem',
      'Jadę dalej bez zmian',
      'Cofam do najbliższego skrzyżowania',
    ],
    correctIndex: 0,
  },
  {
    question: 'Jaką odległość od pojazdu jadącego przed Tobą powinieneś zachować?',
    answers: [
      'Taką, żeby w razie potrzeby bezpiecznie się zatrzymać',
      'Dowolną, jeśli jedziesz wolno',
      'Nie ma to znaczenia na autostradzie',
      'Zawsze dokładnie 1 metr, niezależnie od prędkości',
    ],
    correctIndex: 0,
  },
  {
    question: 'Co oznacza włączony lewy kierunkowskaz pojazdu jadącego przed Tobą?',
    answers: [
      'Kierowca zamierza skręcić w lewo lub zmienić pas w lewo',
      'Kierowca się zatrzymuje awaryjnie',
      'Pojazd ma awarię',
      'Kierowca ustępuje Ci pierwszeństwa',
    ],
    correctIndex: 0,
  },
  {
    question: 'Zbliżasz się do ronda bez dodatkowych znaków. Kto zazwyczaj ma pierwszeństwo?',
    answers: [
      'Pojazdy wjeżdżające na rondo',
      'Pojazdy już znajdujące się na rondzie',
      'Pojazd znajdujący się z lewej strony wjazdu',
      'Ten, kto jedzie szybciej',
    ],
    correctIndex: 1,
  },
  {
    question: 'Podczas jazdy zapala się kontrolka ciśnienia oleju w silniku. Co robisz?',
    answers: [
      'Ignoruję i jadę dalej',
      'Jak najszybciej i bezpiecznie zjeżdżam oraz zatrzymuję pojazd',
      'Przyspieszam, żeby szybciej dojechać do celu',
      'Wyłączam tylko radio',
    ],
    correctIndex: 1,
  },
  {
    question: 'Jaka jest podstawowa zasada dotycząca korzystania z telefonu podczas jazdy?',
    answers: [
      'Można trzymać telefon w ręce, jeśli jedzie się wolno',
      'Zabronione jest korzystanie z telefonu trzymanego w ręku podczas jazdy',
      'Dozwolone są tylko SMS-y',
      'Dozwolone na prostych odcinkach drogi',
    ],
    correctIndex: 1,
  },
  {
    question: 'Co najczęściej oznacza znak w kształcie kwadratu lub prostokąta z niebieskim tłem?',
    answers: [
      'Ostrzeżenie o niebezpieczeństwie',
      'Zakaz',
      'Informację lub wskazanie (np. parking, szpital)',
      'Nakaz jazdy w konkretnym kierunku',
    ],
    correctIndex: 2,
  },
  {
    question:
      'Zbliżasz się do zorganizowanej kolumny pieszych prowadzonej przez opiekuna. Jak się zachowujesz?',
    answers: [
      'Zachowuję szczególną ostrożność i w razie potrzeby zatrzymuję się',
      'Przyspieszam, aby szybciej ją minąć',
      'Trąbię, aby się rozstąpili',
      'Zjeżdżam na chodnik, aby ją ominąć',
    ],
    correctIndex: 0,
  },
  {
    question: 'Czy kierowca cofający ma obowiązek ustąpić pierwszeństwa innym uczestnikom ruchu?',
    answers: ['Nie, cofanie zawsze ma pierwszeństwo', 'Tak', 'Tylko w nocy', 'Tylko na autostradzie'],
    correctIndex: 1,
  },
  {
    question: 'Kiedy dodatkowo zwiększa się zalecana odległość od poprzedzającego pojazdu?',
    answers: [
      'Przy dobrej pogodzie i suchej nawierzchni',
      'Podczas deszczu, śniegu lub ograniczonej widoczności',
      'Tylko w tunelach',
      'Nigdy się nie zwiększa',
    ],
    correctIndex: 1,
  },
  {
    question: 'Co oznacza podwójna ciągła linia na jezdni?',
    answers: [
      'Można ją przekraczać w celu wyprzedzania',
      'Zakaz przekraczania linii przez pojazdy z obu stron',
      'Oznacza pobocze',
      'Informuje wyłącznie o zwężeniu drogi',
    ],
    correctIndex: 1,
  },
  {
    question: 'Sygnalizacja świetlna na skrzyżowaniu jest wyłączona lub uszkodzona. Jak się zachowujesz?',
    answers: [
      'Jadę bez żadnych ograniczeń',
      'Stosuję zasady jak dla skrzyżowania bez sygnalizacji (pierwszeństwo z prawej)',
      'Zatrzymuję się na stałe i czekam na naprawę',
      'Cofam i szukam objazdu',
    ],
    correctIndex: 1,
  },
];

module.exports = { EXAM_QUESTIONS };
