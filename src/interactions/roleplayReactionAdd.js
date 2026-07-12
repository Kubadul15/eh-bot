const { EmbedBuilder } = require('discord.js');
const registry = require('../utils/registry');

const CHECK_EMOJI = '✅';

// Nasluchuje na reakcje pod ogloszeniem aktywnej sesji RP (patrz
// /roleplay start) - kiedy liczba unikalnych reakcji ✅ (bez samego bota)
// osiagnie skonfigurowane minimum, sesja jest oznaczana jako rozpoczeta,
// embed ogloszenia jest aktualizowany, a na kanale pojawia sie krotkie
// ogloszenie startu.
async function handleRoleplayReactionAdd(reaction, user) {
  if (user.bot) return;
  if (reaction.emoji.name !== CHECK_EMOJI) return;

  const session = registry.getRoleplaySession();
  if (!session || session.started || !session.messageId) return;
  if (reaction.message.id !== session.messageId) return;

  try {
    if (reaction.partial) await reaction.fetch();
  } catch (error) {
    console.error('Błąd podczas pobierania reakcji sesji RP:', error);
    return;
  }

  // reaction.count obejmuje tez reakcje samego bota (dodana zaraz po
  // ogloszeniu sesji), wiec odejmujemy jeden, zeby dostac liczbe graczy.
  const playerReactions = Math.max(0, reaction.count - 1);
  if (playerReactions < session.minReactions) return;

  const updated = registry.markRoleplaySessionStarted();
  if (!updated) return;

  try {
    const channel = await reaction.client.channels.fetch(updated.channelId);
    const message = await channel.messages.fetch(updated.messageId);
    const startedEmbed = EmbedBuilder.from(message.embeds[0])
      .setColor('#2ecc71')
      .addFields({
        name: '🟢 Status',
        value: `Rozpoczęto! Osiągnięto ${playerReactions}/${updated.minReactions} reakcji.`,
        inline: false,
      });

    await message.edit({ embeds: [startedEmbed] });
    await channel.send(`🎬 Osiągnięto wymaganą liczbę reakcji — sesja RP rozpoczyna się! Cel: **${updated.goal}**`);
  } catch (error) {
    console.error('Błąd podczas aktualizacji ogłoszenia sesji RP po osiągnięciu progu reakcji:', error);
  }
}

module.exports = { handleRoleplayReactionAdd, CHECK_EMOJI };
