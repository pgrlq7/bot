const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent],
});

client.once('ready', () => {
    console.log('Bot está online!');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    // Comando /painel
    if (interaction.commandName === 'painel') {
        const painelEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Tenha acesso ao servidor')
            .setDescription('Clique no botão abaixo para ir para o site e ter acesso ao servidor.');

        const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Visitar o Site')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://pgrlq7.github.io/roncaputa/')
            );

        await interaction.reply({
            embeds: [painelEmbed],
            components: [button],
        });
    }

    // Comando /daracesso
    if (interaction.commandName === 'daracesso') {
        const usuario = interaction.options.getUser('usuário');

        // ID do cargo fixo
        const cargoId = '1295524995732213760';
        const cargo = interaction.guild.roles.cache.get(cargoId);

        if (!cargo) {
            return interaction.reply('Não consegui encontrar o cargo com o ID fornecido.');
        }

        const member = await interaction.guild.members.fetch(usuario.id);

        try {
            await member.roles.add(cargo);
            await interaction.reply(`O cargo **${cargo.name}** foi concedido ao usuário **${usuario.tag}** com sucesso!`);
        } catch (error) {
            console.error(error);
            await interaction.reply('Houve um erro ao tentar conceder o cargo.');
        }
    }

    // Comando /limpar
    if (interaction.commandName === 'limpar') {
        const quantidade = interaction.options.getInteger('quantidade');

        if (quantidade < 1 || quantidade > 100) {
            return interaction.reply('Você precisa fornecer um número entre 1 e 100.');
        }

        try {
            const messages = await interaction.channel.messages.fetch({ limit: quantidade });
            await interaction.channel.bulkDelete(messages);
            await interaction.reply(`Apaguei **${messages.size}** mensagens com sucesso!`);
        } catch (error) {
            console.error(error);
            await interaction.reply('Houve um erro ao tentar apagar as mensagens.');
        }
    }
});

client.login(token);
