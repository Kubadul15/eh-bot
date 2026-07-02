const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { EXAM_QUESTIONS } = require('../data/examQuestions');
const { buildExamQuestionEmbed, buildExamResultEmbed, getEmbedFieldValue } = require('../utils/embeds');
const { buildAnswerButtons, isPassing, EXAM_QUESTION_COUNT } = require('../utils/exam');
const { generateLicenseNumber } = require('../utils/idNumber');
const { setFailureCooldown, COOLDOWN_MS } = require('../utils/cooldown');
const { sendAdminLog } = require('../utils/adminLog');
const { EXAM_SEND_PREFIX, CANCEL_ID_BUTTON_ID } = require('./constants');

async function handleExamAnswerButton(interaction) {
  await interaction.deferUpdate();

  const [, channelId, scoreStr, answerIndexStr, questionIndexStr, remainingStr] = interaction.customId.split(':');
  const score = Number(scoreStr);
  const answerIndex = Number(answerIndexStr);
  const questionIndex = Number(questionIndexStr);
  const remaining = remainingStr ? remainingStr.split('-').map(Number) : [];

  const question = EXAM_QUESTIONS[questionIndex];
  const newScore = score + (answerIndex === question.correctIndex ? 1 : 0);
  const position = EXAM_QUESTION_COUNT - 1 - remaining.length;
  const candidateEmbed = interaction.message.embeds[0];

  if (remaining.length > 0) {
    const [nextIndex, ...nextRemaining] = remaining;
    const nextQuestion = EXAM_QUESTIONS[nextIndex];
    const questionEmbed = buildExamQuestionEmbed(nextQuestion, position + 1, EXAM_QUESTION_COUNT, newScore);
    const answerRow = buildAnswerButtons(channelId, newScore, nextIndex, nextRemaining, nextQuestion);
    const abortRow = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId(CANCEL_ID_BUTTON_ID).setLabel('Przerwij egzamin').setStyle(ButtonStyle.Danger)
    );

    await interaction.editReply({ embeds: [candidateEmbed, questionEmbed], components: [answerRow, abortRow] });
    return;
  }

  const total = EXAM_QUESTION_COUNT;
  const passed = isPassing(newScore);
  const category = getEmbedFieldValue(candidateEmbed, 'Kategoria');

  if (passed) {
    const licenseNumber = generateLicenseNumber();
    const resultEmbed = buildExamResultEmbed({ candidateEmbed, score: newScore, total, passed: true, licenseNumber });
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId(`${EXAM_SEND_PREFIX}:${channelId}`).setLabel('Wyślij').setStyle(ButtonStyle.Success),
      new ButtonBuilder().setCustomId(CANCEL_ID_BUTTON_ID).setLabel('Anuluj').setStyle(ButtonStyle.Danger)
    );

    await interaction.editReply({ embeds: [resultEmbed], components: [row] });
  } else {
    setFailureCooldown(interaction.user.id);
    const cooldownMinutes = Math.round(COOLDOWN_MS / 60000);
    const resultEmbed = buildExamResultEmbed({ candidateEmbed, score: newScore, total, passed: false });

    await interaction.editReply({
      content: `Możesz podejść ponownie za ${cooldownMinutes} minut.`,
      embeds: [resultEmbed],
      components: [],
    });
  }

  await sendAdminLog(interaction.client, {
    title: '🚗 Egzamin na Prawo Jazdy RP zakończony',
    description:
      `**Kto:** <@${interaction.user.id}> (${interaction.user.tag})\n` +
      `**Kategoria:** ${category}\n` +
      `**Wynik:** ${newScore}/${total}\n` +
      `**Status:** ${passed ? '✅ Zdany' : '❌ Niezdany'}`,
    color: passed ? undefined : '#e02b2b',
  });
}

module.exports = { handleExamAnswerButton };
