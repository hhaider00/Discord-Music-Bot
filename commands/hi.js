const { SlashCommandBuilder } = require("@discordjs/builders");
const { Interaction } = require("discord.js");

module.exports =
{ 
    data: new SlashCommandBuilder()
    .setName("hi")
    .setDescription("When u say hi"),

    async execute(interaction)
    {
        
        
        interaction.reply("SHUT UP");
        
        
    }

};