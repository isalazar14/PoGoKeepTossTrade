# Pokemon Go Keep-Toss-Trade 
**AKA PoGo Bag Manager**

Decide what to keep, toss, or trade based on:
  - Stat product rankings
  - Upgrade cost for battle leages
  - Potential trade results
 
Especially useful for emptying pokemon bag during/after catching sprees (for example, community days, community hours, Go Fest, etc.)
Also useful for general IV stats/rankings information

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
CP / HP: If IV not provided, CP/HP shown as range for given level/s.
Key levels: 30, 40, 41, 50, 51 OR user selection
Upgrade costs: dust cost, candy cost, XL candy cost
Leagues chosen by user, from: Great, Ultra, Master, Premier, & any other active specialty cups
### PVP Rank Stats
Basic Stats plus max level (*) & rankings for battle leagues
|										| Level *|	Rank	|  StatProd	|	 SP %		| Atk	*	| Def *
|							---:	|	:---:	|	:---:	|		:---:		|	:---:		|	:---:	|	:---:
| Current Level	*		|		✔️	|		✔️	| 	✔️		|		✔️		|		✔️	|	✔️
| @ Key levels *		|		✔️	|		✔️	| 	✔️		|		✔️		|		✔️	|	✔️
| @ League CP Caps	|		✔️	|		✔️	| 	✔️		|		✔️		|		✔️	|	✔️

**Rank Stats Notes:**
Current-level league rank stats optional.
Key levels: 30, 40, 41, 50, 51 OR user selection
Atk / Def: Internal stats used for PVP, not visible in-game. Optional in analysis
Leagues chosen by user, from: Great, Ultra, Master, Premier, & any other active specialty cups
Max level for battle leages with no CP cap is always highest level player is willing to consider

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
Friendship levels: Best, Ultra, Great, Good, New
Filtered: Pool of outcomes meeting criteria/threshold. Optional.
	Possible criteria: 
    1) CP <= CP limit
    2) SP % > threshold
    3) rank > threshold
    4) dust cost < threshold
    5) candy cost < threshold
    6) XL candy cost < threshold
		Criteria optional, and user configurable
P(filtered): Probability (0% - 100%) of getting an outcome that meets the specified criteria
Pokemon levels may change depending on trade partner's level
