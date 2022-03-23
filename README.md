# New-World-Dedicated-Stat-Program

A dedicated program to changing and potentially viewing stats in a nation role play game, better than we could do in google sheets

## How to use the program

The user will download the program and will be able to open a text file via the program which contains all the changes admins have done to the nations through the updates. The program will calculate how stats now look after the changes. The program itself will display the stats natively to the program, but it will also save stats to files ready to be copy pasted back into the google sheet stats. If a syntax error has been made in the text file, the program will display warnings above the natively displayed stats.

## Update Conventions

When doing treaties, you shall add a comment above with the name of the treaty. If the nation's stats change due to the treaty, you shall do those first, then if the other nations involved in the treaty has their stats changed because of the nation, you shall switch to those nations and do their stats real quick. You finish by switching back to the nation you were otherwise currently updating. 

This should make it easy for other stat updater to figure out if a treaty has already been accounted for by a simple search in the change commands.

### Reminders for stat updaters for special situations

If a nation is split or renamed, check with trades if updates should happen there too

When Creating a new nation, Remember to specify its culture and primary culture accordingly.

## Updating the sheet state in this program

As we still rely on Google Sheets for the stat keeping, and not all stat updaters are required to use this program for their updating. The state of the sheet this program can reach with the change commands, might get out of sync with the actual state of the game.

For this reason, we must always copy the state of the sheets as they are currently, into this program before running our change commands. **It is highly imporant to make sure no other stat updaters are chaning stats in the time between having it copied, and putting it back into google sheets after the change commands have done their magic.**

- When Copying stat sheets, it should be put in a file called **sheetState.txt**
- The formulas must be visible during copying of the sheets. This can be done by either:
  - `ctrl + ~` or
  - opening the "more options" under the `ctrl+f` menu, and pressing "Also search within formulae".

  The copying can be easily done by selecting the first row of the sheet (if the advanced search menu is still open, keep it so) and pressing `ctrl+a`
- different sheets shall be seperated by exactly 3 newlines in this file you copy to

Once this **sheetState.txt** is set up, you can run the SheetStateConverter.ps1 file in powershell.
Go to explorer, and then under File, find Powershell. A cmd-like window, but blue is now open. You can type `.\sheetStateConverter.ps1` here or just start typing the name of the sheetStateConverter and press `TAB` to autocomplete. Does it select the wrong thing, you can keep pressing `TAB`. Press `ENTER` at the end to execute the file. A fresh **sheetState.js** should have been made.

## Syntax of the 'change commands' text file

The file consist of several Entries, each seperated by a newline. There's a few different kinds of Entries.

1. Comments - their lines start with #. 
2. Time Sync command - This command comes in two forms. Either it is just "sync", and it will time sync every nation server wide at once, or, if you need a particular nation to be time synced without syncing the rest, you can use the word "sync" with a "<" tagged along. That is, both "sync<" and "<sync" are acceptable Syntaxes.
3. Nation Switch command - This command begins with > and then states the name of a nation
4. Sheet Restriction Command - This command restricts all commands below to only ever be performed on stats on a particular sheet specified. `@sheet name` to enter search exclusively in that sheet,
`@<` to exit.
5. Normal Commands - "the vast majority of commands are of this type. Their have 3 parts/parameters to them. The paremeters are seperated by either a space or a tabulation, except for the use of either +,- or = on which seperators are not required. First parameter of a command is eihter+,-,=,ADD,SUB, or SET; known as an operator. The Second parameter states a number. The third parameter states a name of a stat. The setting of a particular stat allows for the stat to be set to any arbitrary string. Strings with spaces in them must have qoutes surrounding the string to set it to. F.x. `="20% Catholisism 80% Protestant" religion` would set the stat `religion` to `20% Catholisism 80% Protestant`. Moreover, for all stat specified in percentage, the number following the operator must also be in percentage form; if the stat is not in percent form, you may not use percentage form.

### Summary

Templates:
`#Just a comment`
`sync` or the not so global `sync<`
`>Ireland`
`@Trade Influence Americas And Africa` and to escape `@<`
most commands will be like:
`+0.5 adm. efficiency`
`-5% clergy loyalty`
`="20% Catholisism 80% Protestant" religion`
