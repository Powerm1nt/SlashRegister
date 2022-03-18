let { groups, solo } = require('../interactions/slashs.json')
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Routes } = require('discord-api-types/v9');
const { token, clientId } = require('../config.json');
const { REST } = require('@discordjs/rest');

function addArgs(command, args) {

    args.forEach( arg=> {

        switch (arg.type) {

            case "str":
                command.addStringOption(opt =>
                    opt.setName(arg.name)
                        .setDescription(arg.description)
                        .setRequired(arg.important));
                break;

            case "int":
                command.addIntegerOption(opt =>
                    opt.setName(arg.name)
                        .setDescription(arg.description)
                        .setRequired(arg.important));
                break;

            case "user":
                command.addUserOption(opt =>
                    opt.setName(arg.name)
                        .setDescription(arg.description)
                        .setRequired(arg.important));
                break;
            case "number":
                command.addNumberOption(opt =>
                    opt.setName(arg.name)
                        .setDescription(arg.description)
                        .setRequired(arg.important));
                break;

            case "option":
                command.addStringOption(opt => {
                    opt.setName(arg.name)
                        .setDescription(arg.description)
                        .setRequired(arg.important)

                    arg.choices.forEach( option =>
                        opt.addChoice(option.display , option.id)
                    )
                    return opt
                });
                break;

            default:
                console.log(`Type ${arg.type} inconnu !`)
                break;
        }

    })

}

const loadSlashCommands = () => {

    // create the functionRelated var, wich create a link from slash command names to their function
    global.functionRelated = {}
    let slashsCommands = []

    // for each command group
    groups.forEach(group => {

        // create the command group
        let commandGroup = new SlashCommandBuilder().setName(group.name).setDescription(group.description);

        // for each subcommand
        group.subcommands.forEach( command => {

            commandGroup.addSubcommand( subCommand => {

                //  add the sub-co to functionRelated:
                functionRelated[`${group.name} ${command.name}`] = command.function

                subCommand.setName(command.name)
                    .setDescription(command.description);


                // add the agrs of the sub-co
                addArgs(subCommand, command.args)

                return subCommand

            })


        })
        slashsCommands.push(commandGroup.toJSON());

    })



    // for "solo" commands outside groups
    solo.forEach(jsonCommand => {

        functionRelated[jsonCommand.name] = jsonCommand.function

        let command = new SlashCommandBuilder().setName(jsonCommand.name).setDescription(jsonCommand.description);

        // add args to commands
        addArgs(command, jsonCommand.args)

        slashsCommands.push(command.toJSON());

    })



    // publish commands to discord
    const rest = new REST({version: '9'}).setToken(token);

    (async () => {
        try {
            await rest.put(
                Routes.applicationCommands(clientId),
                {body: slashsCommands},
            );

        } catch (error) {
            console.error(error);
        }
    })();
}

module.exports = {
    loadSlashCommands,
}