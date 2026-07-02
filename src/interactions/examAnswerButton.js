const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { EXAM_QUESTIONS } = require('../data/examQuestions');
const { buildExamQuestionEmbed, buildExamResultEmbed } = require('../utils/embeds');
const { buildAnswerButtons, isPassing } = require('../utils/exam');
const { generateLicenseNumber } = require('../utils/idNumber');
const { EXAM_SEND_PREFIX, CANCEL_ID_BUTTON_ID } = require('./constants');

async function handleExamAnswerButton(interaction) {
  await interaction.deferUpdate();

  const [, channelId, qIndexStr, scoreStr, answerIndexStr] = interaction.customId.split(':');
  const qIndex = Number(qIndexStr);
  const score = Number(scoreStr);
  const answerIndex = Number(answerIndexStr);

  const question = EXAM_QUESTIONS[qIndex];
  const newScore = score + (answerIndex === question.correctIndex ? 1 : 0);
  const nextIndex = qIndex + 1;
  const candidateEmbed = interaction.message.embeds[0];

  if (nextIndex < EXAM_QUESTIONS.length) {
    const nextQuestion = EXAM_QUESTIONS[nextIndex];
    const questionEmbed = buildExamQuestionEmbed(nextQuestion, nextIndex, EXAM_QUESTIONS.length, newScore);
    const answerRow = buildAnswerButtons(channelId, nextIndex, newScore, nextQuestion);
    const abortRow = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId(CANCEL_ID_BUTTON_ID).setLabel('Przerwij egzamin').setStyle(ButtonStyle.Danger)
    );

    await interaction.editReply({ embeds: [candidateEmbed, questionEmbed], components: [answerRow, abortRow] });
    return;
  }

  const total = EXAM_QUESTIONS.length;

  if (isPassing(newScore)) {
    const licenseNumber = generateLicenseNumber();
    const resultEmbed = buildExamResultEmbed({ candidateEmbed, score: newScore, total, passed: true, licenseNumber });
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId(`${EXAM_SEND_PREFIX}:${channelId}`).setLabel('Wyślij').setStyle(ButtonStyle.Success),
      new ButtonBuilder().setCustomId(CANCEL_ID_BUTTON_ID).setLabel('Anuluj').setStyle(ButtonStyle.Danger)
    );

    await interaction.editReply({ embeds: [resultEmbed], components: [row] });
    return;
  }

  const resultEmbed = buildExamResultEmbed({ candidateEmbed, score: newScore, total, passed: false });
  await interaction.editReply({ embeds: [resultEmbed], components: [] });
}

module.exports = { handleExamAnswerButton };
