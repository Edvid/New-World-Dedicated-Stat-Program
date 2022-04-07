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
| Noble- / Clergy- / Burghers Loyalty Groups | Array of {to: "name", Points: num} objects |
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
`+0.5 admEfficiency`, or for other objects, it might be slightly more complicated
## Example of command change file

...not written yet