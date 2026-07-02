const { sendAdminLog } = require('../utils/adminLog');
const { VEHICLE_SEND_PREFIX } = require('./constants');

async function handleVehicleSendButton(interaction) {
  const channelId = interaction.customId.slice(VEHICLE_SEND_PREFIX.length + 1);
  const embed = interaction.message.embeds[0];

  try {
    const targetChannel = await interaction.client.channels.fetch(channelId);
    await targetChannel.send({ embeds: [embed] });

    await interaction.update({
      content: `✅ Pojazd został zarejestrowany na kanale <#${channelId}>.`,
      embeds: [embed],
      components: [],
    });

    await sendAdminLog(interaction.client, {
      title: '🚙 Pojazd zarejestrowany',
      description: `**Kto:** <@${interaction.user.id}> (${interaction.user.tag})\n**Kanał:** <#${channelId}>`,
    });
  } catch (error) {
    console.error('Błąd podczas wysyłania rejestracji pojazdu na kanał docelowy:', error);
    await interaction.update({
      content: '❌ Nie udało się wysłać dowodu rejestracyjnego na kanał docelowy. Sprawdź uprawnienia bota.',
      embeds: [embed],
      components: [],
    });
  }
}

module.exports = { handleVehicleSendButton };
