const { Events } = require('discord.js');
const db = require('../db')
module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(`Error executing ${interaction.commandName}`);
			console.error(error);
		}

		const filter = i => i.customId === 'primary';

const collector = interaction.channel.createMessageComponentCollector({ filter, time: 300000 });

collector.on('collect', async i => {
	const d = await db.get("dado.mestre")
	await i.reply({ content: `Resultado do mestre: ${d}` });
});

collector.on('end', collected => console.log(`Collected ${collected.size} items`));
			
	},
};