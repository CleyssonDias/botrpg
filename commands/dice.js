const { SlashCommandBuilder, EmbedBuilder  } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min);
  }

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dice')
		.setDescription('Comando Para Rolagem de dados')
		.addStringOption(option =>
			option.setName('dados')
				.setDescription('Quantidade de dados para rolagem')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('lados')
				.setDescription('Quantidade de lados para rolagem')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('adicional')
				.setDescription('Adiciona algum valor nos dados')
				.setRequired(false))
	,
	async execute(interaction) {

		const dados = interaction.options.getString('dados');
		const lados = interaction.options.getString('lados')
		const a = interaction.options.getString('adicional')
		
		

		let result = []

		for (let i = 0; i < dados; i++) {
			var n = getRandomInt(1, lados);
			result.push(n)
		}

		var soma = 0;
		for(var i = 0; i < result.length; i++) {
   			soma += result[i];
		}

		var s = `[${result.toString()}] = **${soma}**`

		if (a != null) {
			s = `[${result.toString()}] + ${a} = **${soma + Number(a)}**`
			
		}
		
		const exampleEmbed = new EmbedBuilder()
		.setColor(0x0099FF)
		.setTitle(`${dados}d${lados}`)
		.setDescription(s)
		.setTimestamp()
		.setFooter({ text: 'Sorte ou azar?' });

		await interaction.reply({ content: `Veja o Resultados Abaixo:`, embeds: [exampleEmbed] });
        
	},
};