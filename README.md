# New-World-Dedicated-Stat-Program

A dedicated program to changing viewing stats in a nation role play game, better than any spreadsheet program could do.

## How to use the program

The user visit the [github.io page](https://edvid.github.io/New-World-Dedicated-Stat-Program/) for this program, and the stats for the game will be shown. This page holds the cannon current stats of the game, and Admins of the game will be updating the current canon state of the game periodically. 

However, if anyone wish to see the consequences of some stat changes they have in mind, they are welcome to upload a .txt or .ccf file. This will update the state of the game just for the user, and it will reset after a reload of the page.

## Updater's Guide to CCF files (Command Change format)

When updating nations' stats, this will be done by reading through their posts and judging which stat changes will happen to them this turn. The following is a guide to the most important stat changes. 

It all works with a special format dubbed 'Command change format' or ccf for the file name. It allows adding, subtracting, setting values of stats, and navigating around the gameStats many objects that keep the stats (it's not all just stats in each nation).

***Examples:***

**I: selecting**

When beginning to update a nation, you must state which nation the following stats will affect. Stating which nation (or other object) will be known as "selecting". To Select a nation, the `>` symbol should be used.

Selecting a Nation called Poland would be 
`> Poland`

or if something else is already selected, you may want to deselect everything first. Deselecting can be done with `<`, or deselecting everything can be done at once with `<...`. To make absolutely sure updaters select a nation right when they begin their document, we ask of them to do as following:
`<... > Poland`.

**II: adding**

adding or subtracting values from a stat can be done in two ways. The explicit and implicit way.
You can explicidly state what value you wish to change a stat by, by the following line:
`+2 administrativeefficiency`

or with [synonyms](https://edvid.github.io/New-World-Dedicated-Stat-Program/Synonyms.js) implemented in the program:

`+ 2 adm`

_(notice here that a space after +, - or = is optional. A space is mandatory if the words ADD, SUB, or SET are used)_

The implicit way lets an updater forget the exact value a stat should change for each decent post. The Admins running the game can choose some values they deem to be default for each RPable stat, which updaters can change stats by using the `*` symbol. A game in which a decent post gives 0.5 administrative efficiency, the above `+ 2 adm` would be 4 decent posts. An updater seeing 4 decent posts could then do the equivalent as above by the following line:

`+ *4 adm`

The same principles apply to subtracting.

**II: moving values**


moving 10 noble loyalty points from the governments' name to self interests, would be done by subtracting at one place, and adding another. This could look like the following:

`-10 noble loyalty.ajuran sultanate`\
`+10 noble loyalty.self interests`

A convenient shorthand is also available for moving stats

`move noble loyalty.ajuran sultanate > noble loyalty.self interests, 10`

Or made shorter with selections

`> noble loyalty`\
`move ajuran sultanate > self interests, 10`\
`<`

**III: setting a stat to something specific**

setting the value of a stat is also possible. This is most useful for hiring of troops and players not listing how many more they recruit, just how many they will have now.

setting light cavalry to 500 using synonyms would be done like the following.

`=500 l cav`

Another great example for when the setting of a stat is necessary would be for the `atWar` stat. It can only have the following values. "false", "defensive" and "offensive". Does a nation wage war on another, a stat updater may:

`=offensive atWar`

***IV: Paying back Debt***

In order to make paying back debt easier, there is a special command that automatically accounts for interest. You only need to give the amount the nation actually paid and the program will do the rest by itself. The command is the following:

`pay debt [amount]`

***V: Trade Deals***

A neat shorthand for creating trades goes as follows:

`trade tradename, from > to, num resourceType`\
which you would otherwise have to do the hard way:\
`<... > Trades`\
`+> tradename`\
`> tradename`\
`= from giver`\
`= to receiver`\
`= resourceType resource`\
`= num amount`\
`<... > backToWhatEverYouHadSelectedBefore`\

Don't mind that complicated mess. I'll be giving examples:

Let's consider a treaty called "Treaty of Llivia". It involved spain selling .5 iron to France, and France paying 35 budget to Spain every turn in exchange.
That means that this treaty mentions the exchange of 2 things. Those will be stored as 2 trades in the game stats.

`trade TreatyOfLlivia1, Spain > France, 0.5 Iron`\
`trade TreatyOfLlivia2, France > Spain, 35 Budget`

***VII: SocialBehaviour and SocialBehaviourGroups***

Cultures and Religions have been dubbed Social Behaviours collectively. Creating a Religion works the same way as creating a Culture, just that you have to select the correct object to create said social behaviour under.

Social Behaviours exists globally, and can have opinions on one another. The Catholics have an opinion on Muslims generally/averagely, and that opinion cross national borders. To create e.g. a Religion, you'd need to select Religions within the game stats.

`<... > Religions`

Then you add the name of said religion

`+> Catholic`

If there are any opinions you know the Catholics should have of other religions. That is done by creating an object within the Religion's Opinions object, and setting a score. Let's first select the Catholic opinion

`> Catholic > Opinions`

Then onto creating Protestant and Muslim object within this, and set their scores

`+> Protestant`\
`= -75 Protestant.Score`\
`+> Muslim`\
`= -50 Muslim.Score`

SocialBehaviourGroups exists too, and one of these would be the ReligionGroups. They store the information of how many of each religion reside within each nation, so this stat exists on the nation object. Every nation has a corresponding socialBehaviourGroup to every socialBehavour existing globally, but they will all be set to 0 by default.

Let's first select a random nation

`<... > Nations > Italy`

Then its ReligionGroups

`> ReligionGroups`

In here we may set the points of the Religions this nation has. By default, all nations are 100% pagan to begin with, so we must first clear that

`= 0 Pagan.Points`

Now we can begin setting points of the others

`= 95 Catholic.Points`
`= 95 Protestant.Points`

If everything is done correctly, you should be able to see a pie chart with only a sliver for protestants, and a table showing the opinion of the catholics towards the protestants in their nation having a displeased smiley.

***Note:***

The guide above is the first to make real use of selections around the gameStats. Religions, Cultures, ReligionGroups, CultureGroups are not the only objects within the gameStats. You can read more about the entire structure of the gameStats down at Structure.

***VII: Deletion and renaming of objects***

Deletion happens in the game when a treaty is terminated, a social behaviour dies out within a nation, or a nation falls.

Deletion has a very opposite syntax to that of creation; `<-`. It looks like a mix of deselect and subtract. The name following this one will be deleted from the object that is currently selected.

E.g. If the treaty of Llivia is terminated, one could remove the trade instances from the list of trades in the game's stats. The following selects the trades object and deletes the two instances of the treaty of Llivia and then reselects France once again (assuming this was learned while updating France)

`<... > trades`
`<- TreatyOfLlivia1`
`<- TreatyOfLlivia2`
`< > France`

Any object can be deleted from the game. Be in trades, nations, cultures, culturegroups within nations etc.

When e.g. a nation needs to be renamed for whatever reason, where government name (dynasty) change wouldn't suffice, we have the option to create a nation from copied stats of another. This is conjunction with deletion can work as renaming of a nation, however it shall be noted that the newly renamed nation would move to the bottom of the list to select from, and all nations below the old posision of the nation in the list would move one number up in the list too.

Making a new nation from copied stats may also be used when splitting nations (although you should then remember to deal with a split population, land size etc.). 

Making a new nation (France) with copied stats from another (Gaul) would work like the following:

`<... > Nations`
`+> France = Gaul`

Then we would delete the old Gaul nation from the game

`<- Gaul`

## Reminders for stat updaters for special situations

### Nation creation

When creating a new nation you must remember the following

+ Create an appropriately named culture in Cultures
+ Set said culture to be 100 of the points in Nations>"nationname">CultureGroups
+ IF religion(s) specified
  + Make sure the religion(s) is created in Religion first
    + If not so, create it
  + Set the pagan religion value of the nation to whichever percentage is the right one, unless 0, in which case you can delete the pagan religion
  + Create the religion(s) in Nations>"nationname">ReligionGroups
  + Set the points value of the religion(s)
  + Set the culture represented at government level to the culture created earlier
  + Set the religion represented at government to the _one_ religion that best represents the entire nation (majority or only one)
  + Set flag if any are specified

### Nation splitting / Renaming / Deletion

When a nation's name changes, or is removed from the game for whatever reason, rememeber the following

+ check with all trades the old nation was involved in, if changes should happen there too. Deletion or change in the involved nations is an option.

## Structure

The gameStats is structured as follows:

+ Nations
  + . . . All number nation stats . . .
  + ReligionGroups
  + CultureGroups
  + Technologies
  + CulturalAdvancements
  + NobleLoyaltyGroups
    + . . . All loyalty group names . . . (the value stored here is the percentage of nobility that devote their loyalty to this group name)
  + ClergyLoyaltyGroups
    + . . . All loyalty group names . . . (the value stored here is the percentage of clergy that devote their loyalty to this group name)
  + BurghersLoyaltyGroups
    + . . . All loyalty group names . . . (the value stored here is the percentage of burghers that devote their loyalty to this group name)
  + SocietalClasses
    + High
    + Medium
    + Lower
  + Workforces
    + Artisan
    + clergy
    + Nobility
    + Burghers
  + TradeInfluences
    + . . . All zone names . . .
      + TradingPoints
  + Climates
    + . . . All climate names . . .
      + Pixels (the Nation's pixels in this climate)
      + ClimateScore (change only if you absolutely know what you're doing)
+ Religions
+ Cultures
+ Trades
+ TradeZones
  + . . . All zone names . . . (the value stored here is the Wealth)

## Syntax of the 'change commands' text file

The file consist of several `Entries`, each seperated by a `newline` aka `return symbol`. There's a few different kinds of `Entries`.

1. Comments - their lines start with #. Multiline commenting is also possible with `"""` if thats the only thing on that line, all the way down to the next `"""`. It must also be the only thing on the line. 
2. Time Sync command - This command comes in two forms. Either it is just "sync", and it will time sync every nation server wide at once, or, if you need a particular nation to be time synced without syncing the rest, you can use the word "sync" with a "<" tagged along. That is, both "sync<" and "<sync" are acceptable Syntaxes. Make sure it is a Nation you selected last. Another object type, be it within a nation or not, wont do.
3. Select and deselect commands - This command comes in either a `>` or `<` form, named select and deselect respectfively. A deselect all is also possible with `<...`. The select (`>`) command should always be followed by some object. The structure of the program is explained above, and examples will come below.

4. Create command - This command has the `+>` syntax. It looks like a mix of add and select. You can think of it as adding the ability to switch to this stat, if it becomes hard to remember. The word following here should be typed with causion as it takes the input raw, and creates a stat with that name within whichever object you have selected. Synonyms may not work correctly on this stat if its not spelled case-insensitively.

5. Normal Commands - The vast majority of commands are of this type. They have 3 parts/parameters to them. The paremeters are seperated by either a space or a tabulation, except for the use of either `+`,`-` or `=` on which seperators are not required. First parameter of a command is eihter`+`, `-`, `=`, `ADD`, `SUB`, or `SET`; known as an **operator**. The Second parameter states a number, or in the case of setting, any text value; known as a **value**. The third parameter states a name of a stat; known as **stat_name_**. The stats can be changed by this command, either by selecting the right path of objects first, or by the dot syntax. That means that<br>
`> Nations > France`<br>
`+2 admeff`<br>
is just as valid as<br>
`+2 Nations.France.admEff` .<br> 
It does however mean that the current selection after the dot syntax remains the same as before, and you are still at the top level of all game stats, without any nation selected.
Values that can be read as numbers will always be interpreted as such. Values that have a percentage sign following the rest of the value which could be read as a number, will be read as a number 100 times smaller

### Summary

Templates:
`#Just a comment`
`sync` or the not so global `sync<`
`> Nations > Ireland` to select Ireland or `< > France` to select france if you within another nation just before. Use `<...` as freely as you wish.
`+0.5 admEfficiency`, or for other objects, it might be slightly more 

## Example of command change file

Below is an example of the commands used in praxis. Here we create two nations, Denmark and Sweden, and change some of their stats. We will be changing stats that are objects and navigate all over the place, not just to nations. We will be showing how to add a whole new instance of an object in an array if needed (the bog for the Danish Climate), and we will be creating Sweden as a copy of Denmark. Comments will be accompanying most stat change lines.

![Example Image](/docs/assets/images/exampleImage.png)

The Color coding you see here are from a tmLanguage and tmTheme vscode extension that I have also uploaded to this repo. Move the two folders within the ccfextensions folder into your vscode extensions; `%USERPROFILE%/.vscode/extensions`, do not copy the cfffextensions folder itself into this. You can use `ctrl+K` then `ctrl+T` to change theme.

## How to debug

If you wanna make absolutely sure you have written stat changes correctly before sharing with staff, you can test if the stuff runs by saving your text as a file that you can upload to the website. The uploading would add what you wrote onto what is already canon in the game, but only for you, and only until you reload the page. Here you can test if the program changes the stats the right way, if it crashes or if it brings up pop up alerts in the middle of your screen.

### Keep an eye out for subtle errors

Some errors are easy to spot. Sometimes the nation sheet for a nation doesn't even load, or sometimes an alert is right in your face. But to double check you may also consider

+ Scrolling down and double checking if the values you've written in changes, show up with the expected value in the right cells, and that all tables generate without the sheet being cut short.
+ Opening your browsers debuggin tool via f12 or ctrl+shift+I and navigating to the console tab, to look out for any red messages that relate to your written changes.

Does everything seem to be fine, you can savely share your changes with whoever has the github rights to put them in and let it be canon.
