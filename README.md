# New-World-Dedicated-Stat-Program

A dedicated program to changing and potentially viewing stats in a nation role play game, better than we could do in google sheets

## How to use the program

The user will download the program and will be able to open a text file via the program which contains all the changes admins have done to the nations through the updates. The program will calculate how stats now look after the changes. The program itself will display the stats natively to the program, but it will also save stats to files ready to be copy pasted back into the google sheet stats. If a syntax error has been made in the text file, the program will display warnings above the natively displayed stats.

## Update Conventions

When doing treaties, you shall add a comment above with the name of the treaty. If the nation's stats change due to the treaty, you shall do those first, then if the other nations involved in the treaty has their stats changed because of the nation, you shall switch to those nations and do their stats real quick. You finish by switching back to the nation you were otherwise currently updating. 

This should make it easy for other stat updater to figure out if a treaty has already been accounted for by a simple search in the change commands. 

## Syntax of the 'change commands' text file

The file consist of several Entries, each seperated by a newline. There's a few different kinds of Entries.

1. Comments - their lines start with #. 
2. Update command - This command is just that word. It is _not_ stated after every nation, only once every server wide update.
3. Nation Switch command - This command begins with > and then states the name of a nation
4. Normal Commands - the vast majority of commands are of this type. Their have 3 parts/parameters to them. The paremeters are seperated by either a space or a tabulation, except for the use of either +,- or = on which seperators are not required. First parameter of a command is eihter+,-,=,ADD,SUB, or SET. The Second parameter states a number. The third parameter states a name of a stat 
