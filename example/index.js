const { loadSlashCommands } = require("./utils/loader");
const { config } = require("config.js")

const client = new Client();

// register slashs commands
loadSlashCommands();

client.on('interactionCreate', interaction => {

    if (interaction.isCommand()) {

        //NOTE: functionRelated is a global variable, in loader.js

        // get the full command name (Ex: `/help ping` instead of just `/help`)
        let commandName = [interaction.commandName, interaction.options._subcommand].filter(Boolean).join(" ");

        if ( Object.keys(functionRelated).includes(commandName)) {

            let commandFunction = require(functionRelated[commandName])

            commandFunction(client, interaction)
    }

    // select menu & buttons are +/- the same, so they can work with the same register & system
    else if (interaction.isButton() || interaction.isSelectMenu()) {

            // get the "id" in customId. if not a string-dict, the error will be catched.
            let buttonId
            try {
                buttonId = JSON.parse(interaction.customId)["id"];
            } catch {
                return console.log(`Erreur: Could not serialize this id : ${interaction.customId}`);
            }

            if (!Object.keys(buttons).includes(buttonId)) {

                console.log(`Unknown/unregisted id ${buttonId} in buttons.json`)

            } else {

                let buttonFunction = require(buttons[buttonId])

                buttonFunction(client, interaction)

            }

        }

    }
});


client.login(config.token);