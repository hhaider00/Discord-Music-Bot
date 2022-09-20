const { SlashCommandBuilder } = require('@discordjs/builders');
const { Interaction } = require("discord.js");


module.exports =
{ 
    data: new SlashCommandBuilder()
    .setName("order66")
    .setDescription("execute order 66"),
    async execute(interaction)
    {
        progDoneNot ="#";
        progLeftNot = "-";
        amountDone = 0;



        interaction.reply("Executing Order 66 : ----------")//.then( interaction =>{
            //setTimeout(() => { interaction.editReply("----------") }, 1000);
            setTimeout(() => { interaction.editReply("Executing Order 66 : #---------") }, 1000);
            setTimeout(() => { interaction.editReply("Executing Order 66 : ##--------") }, 1000);
            setTimeout(() => { interaction.editReply("Executing Order 66 : ###-------") }, 1000);
            setTimeout(() => { interaction.editReply("Executing Order 66 : ####------") }, 1000);
            setTimeout(() => { interaction.editReply("Executing Order 66 : #####-----") }, 1000);
            setTimeout(() => { interaction.editReply("Executing Order 66 : ######----") }, 1000);
            setTimeout(() => { interaction.editReply("Executing Order 66 : #######---") }, 1000);
            setTimeout(() => { interaction.editReply("Executing Order 66 : ########--") }, 1000);
            setTimeout(() => { interaction.editReply("Executing Order 66 : #########-") }, 1000);
            setTimeout(() => { interaction.editReply("Executing Order 66 : ##########") }, 1000);
            setTimeout(() => { interaction.editReply("Under this directive, any and all Jedi leadership must be executed for treason against the Republic. Any soldier that does not comply with the order will also be executed for treason.") }, 5000);
        
        
        
    }
}