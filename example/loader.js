let { groups, solo } = require('../interactions/slashs.json')
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Routes } = require('discord-api-types/v9');
const { token, clientId } = require('../config.json');
const { REST } = require('@discordjs/rest');

function addNumberOpt(opt, arg) {

    opt.setName(arg.name)
        .setDescription(arg.description)
        .setRequired(arg.important);

    if (typeof arg.min === 'number'){
        opt.setMinValue(arg.min);
    }

    if (typeof arg.max === 'number'){
        opt.setMaxValue(arg.max);
    }

    return opt;

}

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
                command.addIntegerOption(opt => {

                    return addNumberOpt(opt, arg);
                })

                break;

            case "user":
                command.addUserOption(opt =>
                    opt.setName(arg.name)
                        .setDescription(arg.description)
                        .setRequired(arg.important));
                break;

            case "role":
                command.addRoleOption(opt =>
                    opt.setName(arg.name)
                        .setDescription(arg.description)
                        .setRequired(arg.important));
                break;

            case "channel":
                command.addChannelOption(opt => {

                    opt.setName(arg.name)
                        .setDescription(arg.description)
                        .setRequired(arg.important);

                    if (arg.accepted_types) {

                        let accepted = []

                        // Missing index 1 (DM), 3 (GROUP_DM) are missing beceause you can't select a dm or a dm group with slashs
                        // Missing index 6 (GUILD_STORE) because store channels have been removed from every guild, and can't be created anymore.
                        // Missing index ]6;10[ because of discord API (no channels type related to 7, 8 & 9)
                        let list = ["text",
                            "null",
                            "voice",
                            "null",
                            "category",
                            "news",
                            "store",
                            "null",
                            "null",
                            "null",
                            "news_thread",
                            "public_thread",
                            "private_tread",
                            "stage"];

                        arg.accepted_types.forEach( type => {
                            accepted.push(list.indexOf(type));
                        });
                        opt.addChannelTypes(accepted);
                    }
                    return opt;
                });
                break;

            case "mentionable":
                command.addMentionableOption(opt =>
                    opt.setName(arg.name)
                        .setDescription(arg.description)
                        .setRequired(arg.important));
                break;


            case "number":

                command.addNumberOption(opt => {
                    return addNumberOpt(opt, arg);
                })

                break;

            case "bool":

                command.addBooleanOption(opt =>
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
                console.log(`Unknown type ${arg.type}  !`)
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