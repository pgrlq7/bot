const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [
    new SlashCommandBuilder().setName('painel').setDescription('Cria um painel com um botão de link!'),
    new SlashCommandBuilder().setName('daracesso').setDescription('Concede um cargo a um usuário')
        .addUserOption(option => 
            option.setName('usuário')
                .setDescription('Usuário para quem o cargo será concedido')
                .setRequired(true)
        ),
    new SlashCommandBuilder().setName('limpar').setDescription('Limpa um número de mensagens do canal.')
        .addIntegerOption(option =>
            option.setName('quantidade')
                .setDescription('Quantidade de mensagens a serem apagadas')
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(100)
        )
];

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
    try {
        console.log('Iniciando o registro de comandos de barra (slash)...');

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log('Comandos registrados com sucesso!');
    } catch (error) {
        console.error(error);
    }
})();
