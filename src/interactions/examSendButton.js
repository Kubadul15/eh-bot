const { EXAM_SEND_PREFIX } = require('./constants');

async function handleExamSendButton(interaction) {
  const channelId = interaction.customId.slice(EXAM_SEND_PREFIX.length + 1);
  const embed = interaction.message.embeds[0];

  try {
    const targetChannel = await interaction.client.channels.fetch(channelId);
    await targetChannel.send({ embeds: [embed] });

    await interaction.update({
      content: `✅ Prawo jazdy zostało wysłane na kanał <#${channelId}>.`,
      embeds: [embed],
      components: [],
    });
  } catch (error) {
    console.error('Błąd podczas wysyłania prawa jazdy na kanał docelowy:', error);
    await interaction.update({
      content: '❌ Nie udało się wysłać prawa jazdy na kanał docelowy. Sprawdź uprawnienia bota na tym kanale.',
      embeds: [embed],
      components: [],
    });
  }
}

module.exports = { handleExamSendButton };
