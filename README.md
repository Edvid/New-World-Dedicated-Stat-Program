# New-World-Dedicated-Stat-Program

A dedicated program to changing and potentially viewing stats in a nation role play game, better than we could do in google sheets

## How to use the program

The user will download the program and will be able to open a text file via the program which contains all the changes to the stats that has happened. Admins of a game being run will release the canon stats having changed, and the stats the program derives from that file will be the canon state of the game, however players shall feel free to test how the state of their nation may be given a different set of changes.

The program itself will display the stats natively. If a syntax error has been made in the text file, the program will display warnings above the natively displayed stats.

## Structure of the stats

### The Nation

Most of the game's stats reside within an object class known as Nation. Most of these stats within Nations will be single numbers or texts, but some are themselves objects. Those will be:

| Stat                             | Object Class           |
| :------------------------------- | ---------------------: |
| Religion Groups / Culture Groups | Social Behaviour Group Class |
| Noble- / Clergy- / Burghers Loyalty Groups | Object with {Points: num} objects, for every loyalty group of appropriate name |
| Technologies | Object with true/false properties, each for every technology |
| Cultural Advancements | Object with true/false properties, each for every cultural advancement |
| TradeInfluences | Object with number properties, each for every trade zone |
| Climates | Object of Climate class properties, each for every bas eclimate |

### Religions and Cultures

As seen before, nations have groups of some cultures or religions within their borders. But Cultures and Religions (collectively known as Social Behaviours) are a global phenonenon, and unlike the stat of "how many percent of some culture live in _this_ nation", there _are_ actually some properties of the Social Behaviours that are stored globally; The Opinion of other Cultures or Religions. A culture will have a `definingFeatures` stat, and an `Opinions` stat. `Opinions` is am object of `Opinion` objects, each named after the other Culture or Religion they have an opinion on. Religions cannot have opinions on cultures, or vice versa. `Opinion` objects contain a score between -100 and 100. 

### Resource Types

Propably not a stat accessed very often, but it is here the game contains which resource types exist in the game

### trades

This is also a stat that is stored globally, and not within a specific nation. These Objects have `giver`, `reciever`, `resource`, and `amount`. Resource may be budget or food too, and all these trade objects together will be how the reource incoming and outgoings will be calculated for each nation.

### Trade Zones

An object called Trade Zones is also stored at a global level. A number is stored per Trade Zone, and you can think of this as the Trade Zone Wealth

### Global stats

`TimeSpeed` and `TimeDivide` are both stats that aren't objects, and are just in the very top level of the program's stat keeping

Stats

## Update Conventions

When doing trade treaties, you add the name of the treaty as an object in treaties (only the single word names are allowed). Then the resource in question and its amount, as well as the nations invovled. If the treaty involved many trade parts, you can suffix the parts with `<#treatyName>_paragaph<#partNum>` or just `<#treatyName>_<#partNum>`.

### Reminders for stat updaters for special situations

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
