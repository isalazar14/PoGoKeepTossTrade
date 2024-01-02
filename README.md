## WORK IN PROGRESS:
- Default branch changes accodring to current area of focus. Feel free to check [main](https://www.github.com/isalazar14/PoGoKeepTossTrade/tree/main) or other feature branches.
- Note that this project was started and progressed for a while without git, so it is not extremely organized (yet).
- Anything called "test" is most likely not a development test, just a proof of concept.

---

# Pokemon Go Keep-Toss-Trade
Decide which pokemon to keep, toss, or trade based on:
- Stat product rankings
- Upgrade cost for battle leagues
- Potential trade results

Especially useful for emptying pokemon bag during/after catching sprees (for example, community days, community hours, Go Fest, etc.)
Also useful for general IV stats/rankings information

---

## Contents
- [Background](#background)
- [The problem](#the-problem)
- [The solution](#the-solution)
- [Analysis details](#analysis-details)

---

## Background
Read this if you're interested in the PvP (player vs player, aka Go Battle League) and you don't know:
- What IVs are
- Why IVs matter for PvP
- How trading can affect a pokemon's IVs and level

Superficially, Pokemon battles are simple. Catch pokemon, power them up, battle. But under the surface, there is a lot more going on.

[Back to Contents](#contents)

#### Base Stats
Every pokemon species has a set of base stats shared by all members of that species (and form). In Pokemon Go, there are three base stats: attack, defense, and stamina. For example, the Bulbasaur family's base stats are:
|           | Base Attack | Base Defense | Base Stamina |
|-----------|-------------|--------------|--------------|
| Bulbasaur | 118         | 111          | 128          |
| Ivysaur   | 151         | 143          | 155          |
| Venusaur  | 198         | 189          | 190          |

All Bulbasaurs have the same base stats as each other. All Ivysaurs have the same base stats as each other. Etc.

[Back to Contents](#contents)

#### IVs
Additionally, every individual pokemon also has _individual_ stats ON TOP of each base stat. These are known as IVs (individual values), and each IV is a random number between 0 and 15 (in the game, these are the bars shown when you appraise a pokemon). That means that for every pokemon species (and form), there are a total of 4096 (16^3) possible versions. The chance of getting a pokemon with one specific IV is less than 0.025%.

IVs are usually expressed in the format "atk-def-sta", so "7-12-5 Bulbasaur" means a Bulbasaur with:
- attack IV = 7
- defense IV = 12
- stamina IV = 5

Two IV sets with special names are "perfect" (15-15-15) and "zero" (0-0-0).

Base stats and IVs are added together to get total stats for each pokemon. For example, the two Venusaurs below have the same BASE stats, but different IVs, so their total stats are different.

<table>
    <thead>
        <tr>
            <th></th>
            <th></th>
            <th colspan="2">Venusaur #1</th>
            <th colspan="2">Venusaur #2</th>
        </tr>
        <tr>
            <th>Stat Type</th>
            <th>Base</th>
            <th>IV #1</th>
            <th>Total #1</th>
            <th>Total #2</th>
            <th>IV #2</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Attack</td>
            <td>198</td>
            <td>13</td>
            <td><strong>211</strong></td>
            <td><strong>205</strong></td>
            <td>7</td>
        </tr>
        <tr>
            <td>Defense</td>
            <td>189</td>
            <td>9</td>
            <td><strong>198</strong></td>
            <td><strong>204</strong></td>
            <td>15</td>
        </tr>
        <tr>
            <td>Stamina</td>
            <td>190</td>
            <td>15</td>
            <td><strong>205</strong></td>
            <td><strong>201</strong></td>
            <td>11</td>
        </tr>
    </tbody>
</table>

Why does it matter? Because of the math the game uses behind the scenes in battles. There's a fair bit of math, but the important thing is that because of IVs, when you compare two pokemon of the same species (and form), one might be better than the other for a specific purpose. So when deciding which pokemon to keep or toss, it matters which one you choose.

[Back to Contents](#contents)

#### CP
To keep things simple, the game combines all the stats into a single number: CP (combat power). It's definitely easier to look at CP than all the underlying stats and IVs, but behind the scenes, the actual CP value is never used! Instead, the game uses 1) the pokemon's total stats (base + IVs) and 2) its level to determine how much damage an attack does. 

That said, when battling WITHOUT a CP limit, higher CP is generally better, so it's easier to compare IVs pokemon. Higher CP is better, so higher IVs are better. For example, at level 40, Venusaur's best and worst CPs are:

|    IVs    |    CP    |
|:---------:|:--------:|
| 15-15-15  |  2720    |
| 0-0-0     |  2343    |

The zero-IV Venusaur is 13% less than the perfect IV Venusaur. In between, it's not always as straight forward, but there's a 

**HOWEVER**, when there is a CP limit (as there is for the Great and Ultra leagues), more IVs are not necessarily better. Thankfully, the Pokemon Go community has worked out a relatively simple way to compare different IVs (for the same species/form).

[Back to Contents](#contents)

#### Stat Product (SP)
It turns out that the stat product (SP) (multiplying attack, defense, stamina stats*) is actually a good overall predictor of how good a pokemon is, AND it gives us a way to rank all the IVs for a given pokemon species/form, from 1 to 4096, **at a specific point** (whether it's a specific level, or under a certain CP).

For the Venusaurs from the example above, the SPs and ranks in the Great League (max CP: 1500) are:

|    IVs    |    CP    |    SP       |   Rank   |
|:---------:|:--------:|:-----------:|:--------:|
| 13-9-15   |   1479   | 1744488     | 2786     |
| 7-15-11   |   1481   | **1791001** | **721**      |

For both of these Venusaurs, if they were powered up one more time, they would go over CP 1500, so this configuration is the highest they can reach in the Great League.

Notice that the second Venusaur has less total IVs (33) than first Venusaur (36), BUT it has a higher SP, and the rank is MUCH better (lower rank is better).

There are other factors that affect how good a pokemon will perform in battle, but SP rank is the best overall predictor.

*It's a bit more complicated than this, but that's the gist.

[Back to Contents](#contents)

#### Trading
Trading adds another layer of complexity when deciding a pokemon's fate.

When you trade in Pokemon GO, the pokemon will get new IVs. This means that if your pokemon's IVs are not good for your purposes, they might still be good to keep for trading, since it might get better IVs after trading. However, the possible outcomes are affected by the friendship level of your trading partner: the better the friendship, the higher the IVs after trading.

| Friendship Level | IV floor |
| :-: | :-: |
| Not friends | 0 |
| Good | 1 |
| Great | 2 |
| Ultra | 3 |
| Best | 5 |
| Lucky | 12 |

The IV floor is the guaranteed minimum for each IV. This floor means that when trading, the total number of possible outcomes is almost always less than the 4096 that are possible for caught pokemon. Unfortunately, the very top ranking IVs usually are not possible, because top ranking IVs usually have a very low attack IV, but you can still get decently ranking IVs!

Furthermore, the trainer level of the two players also plays a role. You can trade with players of any trainer level, but if a pokemon's levels is higher than the receiving player's trainer level + 2, that pokemon's level will be reduced to the receiving player's trainer level + 2. Half levels are also rounded down to the nearest whole level.

| Player | Player level | Pokemon level pre-trade | Pokemon level post-trade |
| :-: | :-: | :-: | :-: |
P1 | 30 | 35 | 22 (owned by P2)|
P2 | 20 | 27.5 | 27 (owned by P1) |

- P1's pokemon went from level 35 to level 22 because P2 is at trainer level 20, and the rule is trainer level + 2. (If it had been at level 21 to start, it would stay at 21 after trading, because it was already less than the receiving player's trainer level + 2)
- P2's pokemon went from level 27.5 to 27 because the receiving player's (P1) level is higher than the pokemon's level, which does not bring the pokemon's level up, BUT the half level is rounded down.

This means that a pokemon whose level is too high for you can still be valuable for trading with lower-level players. (Though I'm not sure how often this happens)

[Back to Contents](#contents)

---

## The Problem

In a word: time.

There have been many sites/apps that provide SP rank lists, but they generally have one major flaw: you can only look things up one at a time, or a few at a time at best. This makes it time consuming and impractical when you have many pokemon of the same species, and you just want to quickly make room in your bag (especially during timed events). Most sites also don't give you information about the possible trade outcomes.

Another problem that many people overlook (or perhaps ignore, or don't care about), is the real-world time it takes to accrue the in-game resources (candy and stardust) required to power up pokemon to their full potential in a given league. High ranking IVs are great, but what if you care more about the cost of powering up, because you don't want to spend too much time farming stardust? You might be willing to accept a lower ranked IV that costs less.


## The solution
This app aims to streamline the process of clearing out space in your pokemon bag by allowing you to analyse your bag in batches rather than one by one, and to provide information about the cost of power-ups, for anyone who is more worried about stardust than rankings.


## Analysis Details
For each [pokeform] AND (optionally) [evolutions] / family**, any/all of the following analyses:
** "Family" includes prevolutions and evolutions

### Basic Stats
|										| Level *	|  CP/HP *	| Upgrade costs *
|							---:	|	:---:		|		:---:		|	:---:
| Current Level			|					| 		✔️		|				
| @ Key levels *		|					| 		✔️		|		✔️	
| @ League CP Caps *|	 	✔️		| 		✔️		|		✔️	

**Basic Stats Notes:**
- CP / HP: If IV not provided, CP/HP shown as range for given level/s.
- Key levels: 30, 40, 41, 50, 51 OR user selection
- Upgrade costs: dust cost, candy cost, XL candy cost
- Leagues chosen by user, from: Great, Ultra, Master, Premier, & any other active specialty cups

### PVP Rank Stats
Basic Stats plus max level (*) & rankings for battle leagues
|										| Level *|	Rank	|  StatProd	|	 SP %		| Atk	*	| Def *
|							---:	|	:---:	|	:---:	|		:---:		|	:---:		|	:---:	|	:---:
| Current Level	*		|		✔️	|		✔️	| 	✔️		|		✔️		|		✔️	|	✔️
| @ Key levels *		|		✔️	|		✔️	| 	✔️		|		✔️		|		✔️	|	✔️
| @ League CP Caps	|		✔️	|		✔️	| 	✔️		|		✔️		|		✔️	|	✔️

**Rank Stats Notes:**
- Current-level league rank stats optional.
- Key levels: 30, 40, 41, 50, 51 OR user selection
- Atk / Def: Internal stats used for PVP, not visible in-game. Optional in analysis
- Leagues chosen by user, from: Great, Ultra, Master, Premier, & any other active specialty cups
- Max level for battle leages with no CP cap is always highest level player is willing to consider

#### PVP Rank Stats vs Cost (batch analysis only)
Further analysis to show cost distribution, and identify rank stats of cost-effective candidates, for each battle league of interest @ each evolution stage
|                       |  stage/evo | Rank | SP % | Dust Cost | Candy Cost
|                 -:	  |	:-:        |	:-:	|	:-:	  |	:-: | :-:
| **BEST SP** rank      |	    ✔️    |	✔️  |	✔️  |	✔️  |	✔️
| **LEAST DUST** cost   |	    ✔️    |	✔️  |	✔️  |	✔️  |	✔️
| **LEAST CANDY** cost  |	    ✔️    |	✔️  |	✔️  |	✔️  |	✔️


### Trade Results
get counts, probabilities, and summary stats for each friendship(*) level (optionally accounting for trade partner level):

#### Counts
1) Total outcomes
2) Filtered outcomes
3) P(filtered*)

#### Summary statistics
1) Range <sub>all</sub>  /  Range <sub>filtered</sub>
2) Distribution <sub>all</sub>  /  Distribution <sub>filtered</sub>
3) P(filtered)

get each summary stat for:
1) Pokemon level *
2) CP/HP
3) SP %
4) Rank
5) Dust cost
6) Candy cost
7) XL Candy cost

**Trade Stats Notes:**
- Friendship levels: Best, Ultra, Great, Good, New
- Filtered: Pool of outcomes meeting criteria/threshold. Optional.
	Possible criteria: 
    1) CP <= CP limit
    2) SP % > threshold
    3) rank > threshold
    4) dust cost < threshold
    5) candy cost < threshold
    6) XL candy cost < threshold
		Criteria optional, and user configurable
- P(filtered): Probability (0% - 100%) of getting an outcome that meets the specified criteria
- Pokemon levels may change depending on trade partner's level
