# Interactions

[Buttons documentation](#boutons) (not translated yet)

## Slashs commands

Slashs commands are a easy, usefull & discord-managed way to create command system.

### Summary:
- Slashs commands:
  * [Exemples](#group-sample-)
  * [Documentation on args](#args-documentation-)
  * [Documentation on objects](#objects-documentation-)
  * [How it works ?](#fonctionnement-)


## Registering slashs :

* All slashs must be registered in `slashs.json` file with the bellow format
* The loader does NOT alter guilds commands
* You CAN'T create role/user-restricted slashs
* There is a maximum of 25 sub-commands per groups </br>
* There is a total maximum of 100 groups + slash commands 
(Ex: 20 groups & 80 slashs)
* A group can't have the `name` of a slash command, but a group and a sub-command or a slash an a sub-command can.



### Root commands :
Command (or root slashs) are the more basic command type.

* Root slashs are registered in "`solo`" 

* You can't create a group with the same `name` as a group.


### Groups & Subcommands :
Groups contains slashs command, like a folder. It allows you to have tidy slashs !
User know what is the base/root command name.

### Group sample :
```json
{
  "groups":
    [
      {
        "name": "admin",
        "description": "Admin commands",
        "subcommands": [
          Subcommands ...
        ]
      }
    ]
}
```
The loader will now load subcommand inside `subcommands`

### Subcommands sample :
```json
...
"subcommands":[
    {
      "name": "options",
      "description": "Edit options",
      "args": [
        {
          "name": "option",
          "description": "the name of the option",
          "type": "str",
          "important": true
        }
      ]
    }
]
```

### Root command sample :
```json
{
  "solo": [
    {
      "name": "random",
      "description": "Send random number",
      "args": [
        {
          "name": "minimum",
          "description": "The minimum obtenable number",
          "type": "int",
          "min": 0
          "important": true
        },
        {
          "name": "maximum",
          "description": "The maximum obtenable number",
          "type": "int",
          "important": true
        }
      ]
    }
  ]
}


```


So, the file `slashs.json` can look something like this:

```json
{
  "groups": [
    {
      "name": "admin",
      "description": "...",
      "subcommands": [
        {
          "name": "command_1",
          "description": "First command ",
          "args": [],
		      "function":"./admin_cmd2.js"
        },
        {
          "name": "command_2",
          "description": "Second command",
          "args": [],
		      "function":"./admin_cmd2.js"
        }
      ]
    },

    {
      "name": "tools",
      "description": "...",
      "subcommands": [
        {
          "name": "command_1",
          "description": "first command of this group",
          "args": [
            {
              "name": "option",
              "description": "...",
              "type": "str",
              "important": false
            }
          ],
          "function":"./cmd1_tools.js"
        }
      ]
    }
  ],

  "solo": [
    {
      "name": "random",
      "description": "Send random number",
      "args": [
        {
          "name": "minimum",
          "description": "The minimum obtenable number",
          "type": "int",
          "min": 0
          "important": true
        },
        {
          "name": "maximum",
          "description": "The maximum obtenable number",
          "type": "int",
          "important": true
        }
      ],
      "function":"./random.js"
    },
    {
      "name": "8ball",
      "description": "Answser your question",
      "args": [
        {
          "name": "question",
          "description": "The question to ask",
          "type": "str",
          "important": true
        }
      ],
      "function":"./8ball.js"
    }
  ]
}
```

----

### Args documentation :

###### `name`:
> Arg / root command / subcommand / group name. </br>
> Only lowercase letters or numbers</br>
> 32 chars max, required</br>

###### `description`:
> Arg / root command / subcommand / group description. </br>
> Can contain every character</br>
> 100 chars max, required </br>

###### `subcommand`:
> Subcommand list </br>
> Must contain list of [command](#object-subcommand) object </br>
> **Must** contain between 1 & 25 subcommands </br>

###### `args`:
> Args list of a subcommand / root command </br>
> Must contain list of [argument](#object-argument) </br>
> Can be an empty list, can contain up to 25 args

##### `type`:
> Desired type of argument
> Must be either :
> * str (string)
> * int (Integer*)
> * number (floating number*)
> * user (guild user)
> * channel (guild channel or category)
> * role (guild role)
> * mentionable ( guild role, user, channel, category)
>  * bool (Boolean option)
>  * option ( list of options)
>
> Only one type per args, required 
> *\* Number between [-2^53  ;  2^53]* 
> *Attachments are the only type not integrated yet. It will be with DJS V13*

---
### Objects documentation :

#### Object `Arg`:

* [`name`](#name) (string) : The name of the arg 
* [`description`](#description) (string) : Description of the arg
* [ `type`](#type) (string) : Type of the arg</br>
* `important` (bool) : If the argument is required or not.
> Optional args:
* `channels` (list[string]) : the selectable channels types between `text` ,`voice`, `category`, `news`, `store`, `news_thread`, `public_thread`, `private_tread` and `stage`. Can contain multiple channel types
* `min`and `max` (int) : the min or the max value for float/integers. must be a number between  [-2^53  ;  2^53]


#### Object `(sub)command`:
* [`name`](#name) (string) : Name of the (sub)command
* [`description`](#description) (string) : Description of the (sub)command
* [`args`](#object-arg) (list[arg]) : list of the (sub)command's args 
* `function` (string): path to the file that must be executed when the command is triggered </br>

#### Object `Group`:
* [`name`](#name) (string) : Name of the group </br>
* [`description`](#description) (string) : Description of the group </br>
* [`args`](#object-subcommand) (list[command]) : List of subcommands of this group

---

## Boutons

NOT TRANSLATED YET

L'utilisation des boutons est un moyen simple et efficace de replacer l'utilisation des réactions.

Les boutons peuvent être envoyés de plusieurs moyens à plusieurs moments. La gestion des boutons ne fait que relier un ID à une fonction, simplement.

### Enregistrement un bouton:

l'enregistrement d'un bouton est très simple, il resemble à ceci :

```json
{
  "id": "file"
}
```

Sur le papier, cela peut sembler une bonne idée, cependant il est assez commun de stocker des informations (tels que des IDs) dans l'argument custom_id d'un bouton.

C'est pour cela que "l'id" du bouton est en fait un élément du dictionnaire présent dans custom_id d'un bouton.

#### Exemple :
imaginons `reaction_role` comme l'id d'un bouton qui vise à ajouter un role, comme un bot reaction-role.

Le fichier `buttons.json` a le contenu suivant :
```json
{
  "reaction_role": "../interactions/buttons/reaction_role.js"
}
```

cependant, voici ce qui serait à envoyer à discord :
```js
new MessageButton()
	.setCustomId('{ "id":"reaction_role", "roleId": "123456789123456789" }')
	.setLabel('Ajouter le role Rouge')
	.setStyle('PRIMARY')
```

En clair, le bot ne récupérera pas directement le `customId`, mais l'élément `id` du dictionnaire présent dans `customId`, afin de permettre d'enregistrer des éléments dans customId (ici, le role à ajouter à l'utilisateur)

### Fonctionnement `buttons.json`:

#### `id`:
> Chaine de caractère </br>
> Au moins 1 caractère, obligatoire </br>
> Ne doit correspondre qu'à la valeur de `id` dans le `customId`du bouton </br>

#### `file`:
> Chaine de caractère, emplacement d'un fichier </br>
> Au moins un caractère, obligatoire </br>

### Fonctionnement du `customId`:
> CustomId doit être un dictionnaire serialisé/transformé en chaine de caractère. </br>
> Doit au moins contenir l'argument "id", mais peut contenir également d'autres arguments </br>
> Ne doit dépasser 100 caractères</br>
---
### Fonctionnement des boutons :
Lorsqu'un bouton sera cliqué, le bot vérifiera si l'`id` est présent dans `buttons.json`, et exécutera la fonction associée dans le cas échéant.
