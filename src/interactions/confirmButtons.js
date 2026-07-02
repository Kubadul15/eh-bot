const config = require('../config');
const { sendAdminLog } = require('../utils/adminLog');

async function handleSendIdButton(interaction) {
  const embed = interaction.message.embeds[0];

  try {
    const targetChannel = await interaction.client.channels.fetch(config.targetChannelId);
    await targetChannel.send({ embeds: [embed] });

    await interaction.update({
      content: `✅ Dowód został wysłany na kanał <#${config.targetChannelId}>.`,
      embeds: [embed],
      components: [],
    });

    await sendAdminLog(interaction.client, {
      title: '🪪 Dowód Osobisty RP wysłany',
      description:
        `**Kto:** <@${interaction.user.id}> (${interaction.user.tag})\n` +
        `**Kanał:** <#${config.targetChannelId}>`,
    });
  } catch (error) {
    console.error('Błąd podczas wysyłania dowodu na kanał docelowy:', error);
    await interaction.update({
      content: '❌ Nie udało się wysłać dowodu na kanał docelowy. Sprawdź konfigurację TARGET_CHANNEL_ID i uprawnienia bota.',
      embeds: [embed],
      components: [],
    });
  }
}

async function handleCancelIdButton(interaction) {
  await interaction.update({
    content: '❌ Anulowano.',
    embeds: [],
    components: [],
  });
}

module.exports = { handleSendIdButton, handleCancelIdButton };
