# Interactions

Please, not that the doc is only in French for the moment

[Accéder à la documentation sur les boutons](#boutons)

## Slashs commands
Les slashs commands sont un système pratique et géré par discord pour créer un système de commande.

### Liens rapides :
- Slashs commands:
  * [Exemples](#exemple-de-groupe-)
  * [Documentation sur les arguments](#documentation-sur-les-arguments-)
  * [Documentation sur les objets](#documentation-sur-les-objets-)
  * [Fonctionnement](#fonctionnement-)


## Documentation sur l'enregistrement des slashs :

### Groupes et sous-commandes :
Les groupes contiennent des slashs commands, comme une sorte de dossier.
Elles permettent de mieux répartir les slashs de manière à les ranger convenablement, et de savoir où chercher pour une commande.

Il y a un maximum de 25 sous-commandes par groupes </br>
Il y a un maximum 100 groupes + slash commands (Par exemple, 20 groupes et 80 slashs commands) </br>
Un groupe ne peut pas avoir le même `name` qu'une slash command, mais un groupe et une sous-commande peuvent.


### Exemple de groupe :
```json
{
  "groups":
    [
      {
        "name": "admin",
        "description": "Commandes d'administration",
        "subcommands": [
          Subcommands ...
        ]
      }
    ]
}
```

Il charge ensuite les subcommands à l'intérieur de chaque catégorie.

### Exemple de sous-commande :
```json
...
"subcommands":[
    {
      "name": "botreport",
      "description": "Permet de faire un signalement sur le bot.",
      "args": [
        {
          "name": "content",
          "description": "contenu du signalement",
          "type": "str",
          "important": true
        }
      ]
    }
]
```
### Commandes :

Pour enregistrer une slash command "normale"/"racine", la syntaxe est plutôt similaire à celle pour les sous-commandes :

* Les slashs s'enregistrent dans "`solo`" et non "`groups`"

* Les slashs commands s'enregistrent de la même facon que les subcommands

* Il n'est pas possible de créer un groupe de sous-commandes avec le nom d'une slash command (exemple : il n'est pas possible de créer une slash `/help` si `help`est le nom d'un groupe de sous-commandes)

### Exemple de commande :
```json
{
  "solo": [
    {
      "name": "random",
      "description": "Donne un nombre aléatoire",
      "args": [
        {
          "name": "minimum",
          "description": "Nombre aléatoire minimum",
          "type": "int",
          "important": true
        },
        {
          "name": "maximum",
          "description": "Nombre aléatoire maximum",
          "type": "int",
          "important": true
        }
      ]
    }
  ]
}


```


Le fichier [`slashs.json`](../interactions/slashs.json) resemble donc à quelque chose comme cela :

```json
{
  "groups": [
    {
      "name": "admin",
      "description": "...",
      "subcommands": [
        {
          "name": "commande_1",
          "description": "Première commande du groupe ",
          "args": []
        },
        {
          "name": "commande_2",
          "description": "Deuxième commande du groupe ",
          "args": []
        }
      ]
    },

    {
      "name": "utilitaire",
      "description": "...",
      "subcommands": [
        {
          "name": "commande_1",
          "description": "première commande du groupe",
          "args": [
            {
              "name": "option",
              "description": "...",
              "type": "str",
              "important": false
            }
          ]
        }
      ]
    }
  ],

  "solo": [
    {
      "name": "random",
      "description": "Donne un nombre aléatoire",
      "args": [
        {
          "name": "minimum",
          "description": "Nombre aléatoire minimum",
          "type": "int",
          "important": true
        },
        {
          "name": "maximum",
          "description": "Nombre aléatoire maximum",
          "type": "int",
          "important": true
        }
      ]
    },
    {
      "name": "8ball",
      "description": "Répond à votre question",
      "args": [
        {
          "name": "question",
          "description": "Question à poser à la bouboule magique",
          "type": "str",
          "important": true
        }
      ]
    }
  ]
}
```
Veuillez noter que `groupe` **et** `solo` peuvent être vide.

----

### Documentation sur les arguments :

###### `name`:
> Nom de l'argument / slash command / sous-commande / groupe. </br>
> Ne peut contenir d'espaces, majuscules et caractères spéciaux </br>
> 32 caractères max, obligatoire </br>

###### `description`:
> Description de l'argument / slash command / sous-commande / groupe. </br>
> Peut contenir tout type de caractères (Minuscules, majuscules, chiffres, caractères spéciaux) </br>
> 100 caractères max, non obligatoire </br>

###### `subcommand`:
> Liste des sous-commandes du groupe </br>
> doit contenir une [commande](#objet-sous-commande) </br>
> doit contenir entre 1 et 25 sous-commandes </br>

###### `args`:
> Liste des arguments d'une sous-commande / slash commande </br>
> doit contenir un [argument](#objet-argument) </br>
> Peut être laissé vide, ne doit dépasser 25 arguments

##### `type`:
> Type de l'argument attendu dans un argument
> Doit être parmi :
> * str (chaine de caractère)
> * int (Nombre* entier)
> * number (Nombre* flottant)
> * user (Utilisateur)
>
> Limité à un seul par argument, obligatoire </br> </br>
> *\* Nombre compris entre [-2^53 ; 2^53]* </br>
> *tous les types proposé par discord ne sont pas encore intégrés et documentés, n'hésitez pas à demander pour voir [votre type](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type) intégré*

---
### Documentation sur les objets :

#### Objet `Argument`:
__Un argument dispose de plusieurs paramètres :__

[name](#name) (string) : Nom de l'argument </br>
[description](#description) (string) : Description de l'argument </br>
[type](#type) (string) : Type de l'argument attendu </br>
important (booléen) : Si l'argument est obligatoire ou non. </br> </br>

#### Objet `(Sous-)Commande`:
[name](#name) (string) : Nom de la (sous-)commande </br>
[description](#description) (string) : Description de la (sous-)commande </br>
[args](#objet-argument) (list[argument]) : Liste des arguments de la (sous-)commande </br> </br>

#### Objet `Groupe`:
[name](#name) (string) : Nom du groupe de commande </br>
[description](#description) (string) : Description du groupe </br>
[args](#objet-sous-commande) (list[commande]) : Liste des commandes du groupe


---
### Fonctionnement :
Au démarrage, le bot va enregistrer les commandes présentes dans [interactions/slashs.json](../interactions/slashs.json) et les envoyer à discord.
Le fichier json permet l'enregistrement des slashs commands de manière simplifiée et lisible.
Le bot "traduira" ce fichier en objet compréhensible par l'API de discord.

Cette procédure a lieu à chaque (re)démarrage.

Si une modification a eu lieu sur une commande, elle peut être jusqu'à une heure pour s'afficher sur tous les serveurs, dû au cache individuel de chaque serveur (= guild) discord qui dure une heure.

---
---
---

## Boutons

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