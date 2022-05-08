# New-World-Dedicated-Stat-Program

A dedicated program to changing and potentially viewing stats in a nation role play game, better than we could do in google sheets

## How to use the program

The user visit a website that hosts the program and the stats for the game will be hosted on there. These are the cannon current stats of the game. Admins of the game will be updating the current canon state of the game periodically. However, if anyone wish to see the consequences of some stat changes they have in mind, they are welcome to upload a .txt or .ccf file. This will update the state of the game just for the user, and it will reset after a reload of the page.

## Updater's Guide to CCF files (Command Change format)

### Basics

When updating nations' stats, this will be done by reading through their posts and judging which stat changes will happen to them this turn. The Basic Updater will write down the changes in a speical format.


***Examples:***

**I: selecting**

When beginning to update a nation, you must state which nation the following stats will affect. Stating which nation (or other object) will be known as "selecting". To Select a nation, the `>` symbol should be used.

Selecting a Nation called Poland would be 
`> Poland`

or if something else is already selected, you may want to deselect everything first. Deselecting can be done with `<` or everything can be deselected at once with `<...`. To make absolutely sure Basic Updaters select a nation right when they begin their document, we ask of them to do as following:
`<... > Poland`.


**I: adding**

adding 2 to administrative efficiency can be done with the line:
`+2 administrativeefficiency`

or with synonyms implemented in the program:

`+ 2 adm`

_(notice here that a space after +, - or = is optional. A space is mandatory if the words ADD, SUB, or SET are used)_

**II: moving (and subtracting)**

moving 10 noble loyalty points from the governments' name to self interests could look like the following
`-10 noble loyalty.ajuran sultanate`\
`+10 noble loyalty.self interests`

**III: setting a stat to something specific**

setting the value of a stat is also possible. This is most useful for hiring of troops and players not listing how many more they recruit, just how many they will have now.

setting light cavalry to 500 using synonyms would be done like the following.

`=500 l cav`

Another great example for when the setting of a stat is necessary would be for the `atWar` stat. It can only have the following values. "false", "defensive" and "offensive". Does a nation wage war on another, a stat updater may:

`="offensive" atWar`

***IV: Paying back Debt***

In order to make paying back debt easier, there is a special command that automatically accounts for interest. You only need to give the amount the nation actually paid and the program will do the rest by itself. The command is the following:

`pay debt [amount]`

***V: Trade Deals***

Doing Trade Deals is something we also betrust the Basic Updater to do.

A neat shorthand for creating trades goes as follows:

`trade tradename, from > to, num resourceType`\
which is equivalent to:\
`<... > Trades`\
`+> tradename`\
`> tradename`\
`= from giver`\
`= to receiver`\
`= resourceType resource`\
`= num amount`\
`<... `\
Except you get to keep the selection you had initially.

But don't mind that complicated mess. I'll be giving examples:

Let's consider a treaty called "Treaty of Llivia". It involved spain selling .5 iron to France, and France paying 35 budget to Spain every turn in exchange.
That means that this treaty mentions the exchange of 2 things. Those will be stored as 2 trades in the game stats.

`trade TreatyOfLlivia1, Spain > France, 0.5 Iron`\
`trade TreatyOfLlivia2, France > Spain, 35 Budget`

***VI: Deletion***

Deletion happens in the game when a treaty is terminated, or a nation falls. Basic Updaters are trusted with the ability ot delete treaties, but entire nations will be the job of the Advanced Updaters.

Deletion has a very opposite syntax to that of creation; `<-`. It looks like a mix of deselect and subtract. The name following this one will be deleted from the object that is currently selected.

E.g. If the treaty of Llivia is terminated, one could remove the trade instances from the list of trades in the game's stats. The following selects the trades object and deletes the two instances of the treaty of Llivia and then reselects France once again (assuming this was learned while updating France)

`<... > trades`
`<- TreatyOfLlivia1`
`<- TreatyOfLlivia2`
`< > France`
### Advanced

Advances Updaters will be responsible for much more complex updating tasks. This includes creation of Nations, creating of new culutres and religions, stat synchronizing. The exact syntax and use will be explained in the syntax section. It covers everything possible with the command change format files.

## Reminders for stat updaters for special situations

If a nation is split or renamed, check with trades if updates should happen there too.

When creating a new nation, remember to specify its culture and primary culture accordingly. Religion will be pagan by default and can therefore be ignored.

## Syntax of the 'change commands' text file

The file consist of several `Entries`, each seperated by a `newline` aka `return symbol`. There's a few different kinds of `Entries`.

1. Comments - their lines start with #. Multiline commenting is also possible with `###` if thats the only thing on that line, all the way down to `# END` (case insensitive, but the single whitespace is necessary). It must also be the only thing on the line. 
2. Time Sync command - This command comes in two forms. Either it is just "sync", and it will time sync every nation server wide at once, or, if you need a particular nation to be time synced without syncing the rest, you can use the word "sync" with a "<" tagged along. That is, both "sync<" and "<sync" are acceptable Syntaxes. Make sure it is a Nation you selected last. Another object type, be it within a nation or not, wont do.
3. Select and deselect commands - This command comes in either a `>` or `<` form, named select and deselect respectfively. A deselect all is also possible with `<...`. The select (`>`) command should always be followed by some object. The structure of the program is explained above, and examples will come below.

4. Create command - This command has the `+>` syntax. It looks like a mix of add and select. You can think of it as adding the ability to switch to this stat, if it becomes hard to remember. The word following here should be typed with causion as it takes the input raw, and creates a stat with that name within whichever object you have selected. Synonyms may not work correctly on this stat if its not spelled case-insensitively.

5. Normal Commands - The vast majority of commands are of this type. They have 3 parts/parameters to them. The paremeters are seperated by either a space or a tabulation, except for the use of either `+`,`-` or `=` on which seperators are not required. First parameter of a command is eihter`+`, `-`, `=`, `ADD`, `SUB`, or `SET`; known as an **operator**. The Second parameter states a number, or in the case of setting, any text value; known as a **value**. The third parameter states a name of a stat; known as **stat_name_**. The stats can be changed by this command, either by selecting the right path of objects first, or by the dot syntax. That means that<br>
`> Nations > France`<br>
`+2 admeff`<br>
is just as valid as<br>
`+2 Nations.France.admEff` .<br> 
It does however mean that the current selection after the dot syntax remains the same as before, and you are still at the top level of all game stats, without any nation selected.
Values that can be read as numbers will always be interpreted as such. Values that have a percentage sign following the rest of the value which could be read as a number, will be read as a number 100 times smaller.

### Summary

Templates:
`#Just a comment`
`sync` or the not so global `sync<`
`> Nations > Ireland` to select Ireland or `< > France` to select france if you within another nation just before. Use `<...` as freely as you wish.
`+0.5 admEfficiency`, or for other objects, it might be slightly more 

## Example of command change file

Below is an example of the commands used in praxis. Here we create two nations, Denmark and Sweden, and change some of their stats. We will be changing stats that are objects and navigate all over the place, not just to nations. We will be showing how to add a whole new instance of an object in an array if needed (the bog for the Danish Climate), and we will be creating Sweden as a copy of Denmark. Comments will be accompanying most stat change lines.

<pre># Select The Nations Array
> Nations
# Create syntax. In this case Create Nation
+> Denmark
# Deselect all
<...
# Select Cultures Array
> Cultures
# Create syntax again. In this case Create new Culture
+> Danish
# Create German culture too
+> German
# Deselect Cultures
<
# Also Select Religions and make the religions in the game and how they relate to eachother
<... > Religions
+> Catholic
+> Protestantism
> Protestantism > Opinions
+> Catholic
="Skeptical"Catholic.Score
# Select Nations And then Denmark and then CultureGroups in Denmark
<... > Nations > Denmark > CultureGroups
# Create syntax once again. Stats within aren't as strictly enforced in format
# programmatically. This is done only via convention between updaters.
# Make sure you spell everything corectly.
+> Danish
# Set "Points" (percentage) of People in Denmark being Danish
> Danish
=95Points
# Same for German. Though using dot syntax. This way you can temporarily select
# and change a stat within an object or sub-object without it having selected that
# for the next stat change line
<
+> German
=3German.Points
# For the sake of demonstration, I will select German anyways
> German
+2Points
< <
="Danish"CulRep
="Protestantism"RelRep

> ReligionGroups
-100Pagan.Points
+> Protestantism
+100Protestantism.Points
< > Climates
###
Set pixel counts within Climates of Denmark. The following Climates are
precreated at nation creation, but the game allows for more specific
climates to be created during the game:

Polar Desert. ClimateScore = 0
Taiga/Tundra. ClimateScore = 0.25
Montane Forest. ClimateScore = 0.6
Medditereanian. ClimateScore = 0.85
Arid. ClimateScore = 0.65
Steppe. ClimateScore = 0.75
Moderate. ClimateScore = 1
Sub-Tropical. ClimateScore = 0.75
Tropical. ClimateScore = 0.6
Savanna. ClimateScore = 0.65
Desert. ClimateScore = 0.05
Coastal Desert ClimateScore = 0.35

# END

=1950Moderate.Pixels
# Example of specific climate. It is local to only the Nation of Denmark and
# its ClimateScore is not shared across other nations
+> Bog
=0.6Bog.ClimateScore
=50Bog.Pixels


#Feel free to abuse the Deselect all as much as you want to make your life easier
<...
> Nations
# Create Syntax but it copies all stats from Denmark.
# This is purely for demonstration purposes.
# It might be a much more useful feature if nations with similar
# stats, religions and cultures; or if the game has a template nation to build
# new nations from
+> Sweden = Denmark
> Sweden
# Sweden has Majority Swedish Culture, not Danish
=5CultureGroups.Danish.Points
=0CultureGroups.German.Points
<... > Cultures
+> Swedish
# Witness the construction of a culture having an opinion on another!
> Swedish > Opinions
+> Danish
> Danish
="Skeptical"Score
<... > Nations > Sweden > CultureGroups
+> Swedish
=95Swedish.Points
<
="Swedish"CulRep
# Sweden has Mountains, and is also generally bigger
> Climates
+1400Moderate.Pixels
+600Mountainous.Pixels

# Time sync everything
sync</pre>

Better color coding is possible inside the program itself, if you upload this string as a file and open `Open change command list debug terminal`.
