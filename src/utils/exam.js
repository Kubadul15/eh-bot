const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { EXAM_QUESTIONS } = require('../data/examQuestions');
const { EXAM_ANSWER_PREFIX } = require('../interactions/constants');

// Jak w prawdziwym egzaminie - dopuszczalna jest tylko jedna pomylka.
const PASSING_SCORE = EXAM_QUESTIONS.length - 1;

function isPassing(score) {
  return score >= PASSING_SCORE;
}

function buildAnswerButtons(channelId, questionIndex, score, question) {
  const row = new ActionRowBuilder();

  question.answers.forEach((answerText, answerIndex) => {
    row.addComponents(
      new ButtonBuilder()
        .setCustomId(`${EXAM_ANSWER_PREFIX}:${channelId}:${questionIndex}:${score}:${answerIndex}`)
        .setLabel(answerText)
        .setStyle(ButtonStyle.Secondary)
    );
  });

  return row;
}

module.exports = { PASSING_SCORE, isPassing, buildAnswerButtons };
