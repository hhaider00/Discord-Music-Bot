const { SlashCommandBuilder } = require('@discordjs/builders');
const { Interaction } = require("discord.js");
const fs = require("fs");

module.exports =
{ 
    data: new SlashCommandBuilder()
    .setName("qoutes")
    .setDescription("Says a random qoute")
    .addStringOption(option =>
        option.setName("Origin of qoute")
        .setDescription("What do you want a qoute from")
        .setRequired(true)
        .addChoice('Spiderman', 'Qoutes from spiderman')
        .addChoice('Thor', 'Qoutes from thor')
        ),
    async execute(interaction)
    {
        const choice = interaction.options.getString("Origin of qoute");
        await interaction.reply(`Selecting qoute from ${choice}`)
        const random = Math.floor(Math.random() * months.length);

        if(choice == "Spiderman")
        {
            var text = fs.readFileSync("./spiderman.txt", "utf-8");
            var linebyline = text.split("\n")
            var randomqoute = linebyline[random]
            await interaction.editReply(`${randomqoute}`)
        }
        if(choice == "Thor")
        {
            var text = fs.readFileSync("./thor.txt", "utf-8");
            var linebyline = text.split("\n")
            var randomqoute = linebyline[random]
            await interaction.editReply(`${randomqoute}`)
        }

    }

}