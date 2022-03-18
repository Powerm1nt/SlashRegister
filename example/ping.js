const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = async (client, interaction) => {

    let row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setLabel('a random button')
                .setStyle('PRIMARY')
                .setCustomId(`{"id":"ping"}`),
        );

    interaction.reply({ content: "We don't really care of latency here", components: [row]});
}