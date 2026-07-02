const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { EXAM_QUESTIONS } = require('../data/examQuestions');
const { EXAM_ANSWER_PREFIX } = require('../interactions/constants');

// Liczba pytan losowanych z puli przy kazdym podejsciu do egzaminu.
const EXAM_QUESTION_COUNT = 6;

// Jak w prawdziwym egzaminie - dopuszczalna jest tylko jedna pomylka.
const PASSING_SCORE = EXAM_QUESTION_COUNT - 1;

function isPassing(score) {
  return score >= PASSING_SCORE;
}

/**
 * Losuje unikalne indeksy pytan z calej puli (Fisher-Yates + slice).
 * Wynik jest nastepnie kodowany w customId przyciskow, wiec caly
 * przebieg egzaminu (kolejnosc pytan) przetrwa restart bota.
 */
function pickRandomQuestionIndices(count = EXAM_QUESTION_COUNT) {
  const indices = EXAM_QUESTIONS.map((_, index) => index);

  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  return indices.slice(0, count);
}

/**
 * customId niesie: kanal docelowy, wynik dotychczasowy, indeks
 * pytania w calej puli (do sprawdzenia poprawnosci) oraz pozostale
 * (jeszcze nie zadane) indeksy pytan, zeby kolejny krok wiedzial,
 * co zapytac dalej - bez trzymania czegokolwiek w pamieci bota.
 */
function buildAnswerButtons(channelId, score, questionIndex, remainingIndices, question) {
  const remainingStr = remainingIndices.join('-');
  const row = new ActionRowBuilder();

  question.answers.forEach((answerText, answerIndex) => {
    row.addComponents(
      new ButtonBuilder()
        .setCustomId(`${EXAM_ANSWER_PREFIX}:${channelId}:${score}:${answerIndex}:${questionIndex}:${remainingStr}`)
        .setLabel(answerText)
        .setStyle(ButtonStyle.Secondary)
    );
  });

  return row;
}

module.exports = { EXAM_QUESTION_COUNT, PASSING_SCORE, isPassing, pickRandomQuestionIndices, buildAnswerButtons };
