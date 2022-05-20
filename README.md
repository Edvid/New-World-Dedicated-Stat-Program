# New-World-Dedicated-Stat-Program

A dedicated program to changing and potentially viewing stats in a nation role play game, better than we could do in google sheets

## How to use the program

The user visit a website that hosts the program and the stats for the game will be hosted on there. These are the cannon current stats of the game. Admins of the game will be updating the current canon state of the game periodically. However, if anyone wish to see the consequences of some stat changes they have in mind, they are welcome to upload a .txt or .ccf file. This will update the state of the game just for the user, and it will reset after a reload of the page.

## Updater's Guide to CCF files (Command Change format)

When updating nations' stats, this will be done by reading through their posts and judging which stat changes will happen to them this turn. The follwing is a guide to the most important stat changes. How to do the rest you should be able to extrapolate.

It all works with a special format dubbed 'Command change format' or ccf for the file name. It allows adding, subtracting, setting values of stats, and navigating around the gameStats many objects that keep the stats (it's not all just stats in nation).

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
`<...`\
Except you get to keep the selection you had initially.

But don't mind that complicated mess. I'll be giving examples:

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

`+> Protestant`
`= -75 Protestant.Score`
`+> Muslim`
`= -50 Muslim.Score`

SocialBehaviourGroups exists too, and one of these would be the ReligionGroups. They store the information of how many of reach religion reside within each nation, so this stat exists on the nation object. 

Let's first select a random nation

`<... > Nations > Italy`

Then its ReligionGroups

`> ReligionGroups`

In here we may set the Religions this nation has. By default, all nations are 100% pagan to begin with, so we must first clear that update

`= 0 Pagan.Points`

Now we can begin creating the religions within this nation and set their points too

`+> Catholic`
`= 95 Catholic.Points`


`+> Protestant`
`= 95 Protestant.Points`

If everything is done correctly, you should be able to see a pie chart with only a sliver for protestants, and a table showing the opinion of the catholics towards the protestants in their nation having a displeased smiley.

***Note:***

The guide above is the first to make real use of selections around the gameStats. Religions, Cultures, ReligionGroups, CultureGroups are not the only objects within the gameStats. You can read more about the entire structure of the gameStats down at Structure.

***VII: Deletion***

Deletion happens in the game when a treaty is terminated, or a nation falls. Basic Updaters are trusted with the ability ot delete treaties, but entire nations will be the job of the Advanced Updaters.

Deletion has a very opposite syntax to that of creation; `<-`. It looks like a mix of deselect and subtract. The name following this one will be deleted from the object that is currently selected.

E.g. If the treaty of Llivia is terminated, one could remove the trade instances from the list of trades in the game's stats. The following selects the trades object and deletes the two instances of the treaty of Llivia and then reselects France once again (assuming this was learned while updating France)

`<... > trades`
`<- TreatyOfLlivia1`
`<- TreatyOfLlivia2`
`< > France`

Any object can be deleted from the game. Be in trades, nations, cultures, culturegroups within nations etc.

## Reminders for stat updaters for special situations

### Nation creation

When creating a new nation you must remember the following

+ Create an appropriately named culture in Cultures
+ Set said culture to be 100 of the points in Nations>"nationname">CultureGroups
+ IF religion(s) specified
  + Make sure the religion(s) is creaeted in Religion first
    + If not so, create it
  + Set the pagan religion value of the nation to whichever percentage is the right one (propably 0 if not specified otherwise)
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

Polar Desert.ClimateScore = 0
Taiga/Tundra.ClimateScore = 0.25
Montane Forest.ClimateScore = 0.6
Medditereanian.ClimateScore = 0.85
Arid.ClimateScore = 0.65
Steppe.ClimateScore = 0.75
Moderate.ClimateScore = 1
Sub-Tropical.ClimateScore = 0.75
Tropical.ClimateScore = 0.6
Savanna.ClimateScore = 0.65
Desert.ClimateScore = 0.05
Coastal Desert.ClimateScore = 0.35

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

## How to debug

If you wanna make absolutely sure you ahve written stat changes correctly before sharing with staff, you can test if the stuff runs by saving your text as a file that you can upload to the website. The uploading would add what you wrote onto what is already canon in the game, but only for you, and only until you reload the page. Here you can test if the program changes the stats the right way, if it crashes or if it brings up pop up alerts in the middle of your screen.

### Keep an eye out for subtle errors

Some errors are easy to spot. Sometimes the nation sheet for a nation doesn't even load, or sometimes an alert is right in your face. But to double check you may also consider

+ Scrolling down and double checking if the values you've written in changes, show up with the expected value in the right cells.
+ Opening your browsers debuggin tool via f12 or ctrl+shift+I and navigating to the console tab, to look out for any red messages that relate to your written changes.

Does everything seem to be fine, you can savely share your changes with whoever has the github rights to put them in and let it be canon.
