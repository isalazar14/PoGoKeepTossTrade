### Notes on game master structure and contents
Entry category most easily identified by path "entry.data[categoryKey]" where "categoryKey" is the key of entry.data that is NOT "templateId" (e.g. pokemonFamily, formSettings, pokemonSettings, **etc**)
See official pokeminers game master explorer: https://pokeminers.com/gmexplore/

#### FAMILIES
entry.templateId == "V[NUMBER]_FAMILY_[NAME]"

entry.data.pokemonFamily
 - .familyId == "FAMILY_[FAMILY_NAME]
 - .candyPerXlCandy
 - .megaEvolvablePokemonId

#### FORMS 
- form entries exist for all pokemon and forms (non-forms, normal-form, regionals, costumes, events, etc)
- can be used to enumerate all pokemon without forms, with only normal forms, and with one or more forms
- needed to identify pokemon with underscore in their name (e.g. Ho-oh), using path: data.formSettings.

entry.templateId == "FORMS_V[NUMBER]_POKEMON_[NAME]"

entry.data.formSettings
- .pokemon
- .forms[{}]?
  - [i].form
  - [i].isCostume?

#### POKEMON ENTRIES
entry.templateId == /^V.*_POKEMON_[A-Z]*_(.*)/

entry.data.pokemonSettings
- .familyId
- .pokemonId
- .form?
- .stats.baseAttack
- .stats.baseDefense
- .stats.baseStamina
- .type
- .type2?
- .parentPokemonId?
- .evolutionIds?[string] // not always present even if evo exists
- .evolutionBranch[{}]?
  - [i].evolution
  - [i].form?
  - [i].candyCost
  - [i].noCandyCostViaTrade?
  - [i].temporaryEvolution?
  - [i].temporaryEvolutionEnergyCost?
  - [i].temporaryEvolutionEnergyCostSubsequent?
  - [i].genderRequirement?
  - [i].evolutionItemRequirement
  - [i].lureItemRequirement
  - [i].kmBuddyDistanceRequirement
  - [i].questDisplay?[i].questRequirementTemplateId
- .thirdMove.stardustToUnlock
- .thirdMove.candyToUnlock
- .pokemonClass // LEGENDARY/MYTHICAL
- .tempEvoOverrides[{}]?
  - [j].tempEvoId
  - [j].stats.baseAttack
  - [j].stats.baseDefense
  - [j].stats.baseStamina
  - [j].typeOverride1
  - [j].typeOverride2
- .formChange[{}]?
  - [i].availableForm[string]
  - [i].candyCost
  - [i].stardustCost
- .camera // will be "{}" if not yet released in game

#### BRANCHED EVO CHAINS
entry.data.obEvolutionChainDisplaySettings
- ignore if ~.obChain.length == 1 (e.g. Mewtwo)
- ignore if is trivial form

#### MEGA EVOS
entry.templateId == TEMPORARY_EVOLUTION_V[NUMBER]_POKEMON_[NAME]

entry.data.pokemonFamily.megaEvolvablePokemonId
- temporaryEvolutionSettings[{}]
  - [i].temporaryEvolutionId // "TEMP_EVOLUTION_[TYPE]" => TYPE == MEGA[_X/Y] ||PRIMAL


#### PRIMAL EVOS
entry.data.obPrimalEvoSettings

#### SHADOW POKEMON INFO
entry.data.pokemonSettings
- .shadow?.purificationStardustNeeded
- .shadow?.purificationCandyNeeded
- .evolutionBranch?[i].obPurificationEvolutionCandyCost


#### SPAWN GENDER RATE
entry.templateId == SPAWN_V[NUMBER]_POKEMON_[NAME]"

entry.data.genderSettings
- .pokemon
-	.gender
  - .malePercent
	- .femalePercent

#### CPMs
data.entry.playerLevel.cpMultiplier

#### UPGRADES / POWER-UPS
entry.templateId == "POKEMON_UPGRADE_SETTINGS"
 
entry.data.pokemonUpgrades
- .upgradesPerLevel: 2
- .allowedLevelsAbovePlayer: 10
- .candyCost: [1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,4,4,4,4,4,6,6,8,8,10,10,12,12,15,0,0,0,0,0,0,0,0,0,0,0],
- .stardustCost: [200,200,400,400,600,600,800,800,1000,1000,1300,1300,1600,1600,1900,1900,2200,2200,2500,2500,3000,3000,3500,3500,4000,4000,4500,4500,5000,5000,6000,6000,7000,7000,8000,8000,9000,9000,10000,10000,11000,11000,12000,12000,13000,13000,14000,14000,15000],
- .shadowStardustMultiplier: 1.2,
- .shadowCandyMultiplier: 1.2,
- .purifiedStardustMultiplier: 0.9,
- .purifiedCandyMultiplier: 0.9,
- .maxNormalUpgradeLevel: 50,
- .defaultCpBoostAdditionalLevel: 1,
- .xlCandyMinPlayerLevel: 40,
- .xlCandyCost: [10,10,12,12,15,15,17,17,20,20]

#### FRIENDSHIP TRADING DISCOUNT
- data.entry.friendshipMilestoneSettings.tradingDiscount

#### LUCKY POKEMON STARDUST DISCOUNT
- "templateId": "LUCKY_POKEMON_SETTINGS"
- entry.data.luckyPokemonSettings.powerUpStardustDiscountPercent: 0.5

#### TYPE CHART (STRENGTHS/WEAKENESSES)
entry.templateId == POKEMON_TYPE_[TYPE_NAME]

entry.data.typeEffective
- typeEffective
  - attackScalar: [1.0,0.625,0.625,0.625,1.0,1.0,1.0,0.625,0.625,0.625,1.0,1.6,1.0,1.6,1.0,1.0,1.6,0.625]
    // attackScalar order: [Normal,Fighting,Flying,Poison,Ground,Rock,Bug,Ghost,Steel,Fire,Water,Grass,Electric,Psychic,Ice,Dragon,Dark,Fairy]

#### WEATHER BOOST TYPES
	"templateId": "WEATHER_AFFINITY_CLEAR",
	"weatherAffinities": {
		"weatherCondition": "CLEAR",
		"pokemonType": [
			"POKEMON_TYPE_GRASS",
			"POKEMON_TYPE_GROUND",
			"POKEMON_TYPE_FIRE"
		]

#### WEATHER BOOST DETAILS
	"templateId": "WEATHER_BONUS_SETTINGS",
	"weatherBonusSettings": {
		"cpBaseLevelBonus": 5,
		"guaranteedIndividualValues": 4,
		"stardustBonusMultiplier": 1.25,
		"attackBonusMultiplier": 1.2,
		"raidEncounterCpBaseLevelBonus": 5,
		"raidEncounterGuaranteedIndividualValues": 10
	}

#### PVP SETTINGS, MODIFIERS
"templateId": "COMBAT_SETTINGS",
"combatSettings": {
	"roundDurationSeconds": 270.0,
	"turnDurationSeconds": 0.5,
	"minigameDurationSeconds": 7.0,
	"sameTypeAttackBonusMultiplier": 1.2,
	"fastAttackBonusMultiplier": 1.3,
	"chargeAttackBonusMultiplier": 1.3,
	"defenseBonusMultiplier": 1.0,
	"minigameBonusBaseMultiplier": 0.0001,
	"minigameBonusVariableMultiplier": 1.0,
	"maxEnergy": 100,
	"defenderMinigameMultiplier": 1.0,
	"changePokemonDurationSeconds": 12.0,
	"minigameSubmitScoreDurationSeconds": 6.5,
	"quickSwapCooldownDurationSeconds": 60.0,
	"chargeScoreBase": 0.25,
	"chargeScoreNice": 0.5,
	"chargeScoreGreat": 0.75,
	"chargeScoreExcellent": 1.0,
	"superEffectiveFlyoutDurationTurns": 5,
	"notVeryEffectiveFlyoutDurationTurns": 5,
	"blockedEffectiveFlyoutDurationTurns": 5,
	"normalEffectiveFlyoutDurationTurns": 5,
	"shadowPokemonAttackBonusMultiplier": 1.2,
	"shadowPokemonDefenseBonusMultiplier": 0.8333333,
	"purifiedPokemonAttackMultiplierVsShadow": 1.0
}

#### COMBAT LEAGUES (PVP?)
	"templateId": "COMBAT_LEAGUE_SETTINGS",
	"combatLeagueSettings": {
		"combatLeagueTemplateId": [
			"COMBAT_LEAGUE_DEFAULT_GREAT",
			"COMBAT_LEAGUE_DEFAULT_ULTRA",
			"COMBAT_LEAGUE_DEFAULT_MASTER"
		]
	}
	
	"templateId": "COMBAT_LEAGUE_DEFAULT_[GREAT/ULTRA/MASTER]",
	"combatLeague": {
		"title": "combat_great_league"
		"enabled": true,
		"pokemonCondition": [
			{
				"type": "WITH_POKEMON_CP_LIMIT",
				"withPokemonCpLimit": {
					"maxCp": 1500
				}
			}
		],
		"iconUrl": "https://storage.googleapis.com/prod-public-images/pogo_great_league.png",
		"pokemonCount": 3,
		"bannedPokemon": [
			"DITTO",
			"SHEDINJA"
		],
		"badgeType": "BADGE_GREAT_LEAGUE",
		"leagueType": "STANDARD",
		"allowTempEvos": true
	}

	templateId : "COMBAT_LEAGUE_VS_SEEKER_..."  !! (INCLUDES SPECIAL LEAGUES, LIKE 'element cup' OR 'catch cup')
		data
			evolutionQuestTemplate
			combatCompetitiveSeasonSettings
			combatLeague
				title
				pokemonCondition []
					type
					withPokemonCpLimit
						minCp
						maxCp
					pokemonLevelRange
						maxLevel
					pokemonWhiteList []
						pokemon []
							id []
							forms []
					pokemonBanList []
						pokemon []
							id
							form
					withPokemonType
						pokemonType []
				bannedPokemon []
				leagueType
				allowTempEvos

		Noteworthy specific OBJECTS:
			LIST OF LEGENDARIES
				"templateId": "COMBAT_LEAGUE_VS_SEEKER_MASTER_NO_LEGENDARY"
				data
					combatLeague
						bannedPokemon []
							lists ditto and shedinja, then all legendaries

#### EVOLUTION QUESTS/REQUIREMENTS
- entry.data.evolutionQuestTemplate

	"templateId": "[POKEMON_id]_EVOLUTION_QUEST"
		data: {
      evolutionQuestTemplate: {
			questType
				goals []
					target
      }
    }

#### DETECT BABIES
1. entry.data.pokemonSettings.buddySize == "BUDDY_BABY"
2. if no parentId (first in evo chain) && family != monName (family named )
  - EXCEPT BABIES/FAMILIES with family name == baby name
    - Tyrogue
    - Togepi

#### SPECIAL FORMS
ARCEUS_NORMAL
FEMALE / MALE
A (Mewtwo armoured)