### Notes on game master structure and contents

FAMILIES
	"templateId": "V[POKEMON-4-digit-id]_FAMILY_[POKEMON-name-id]",
		"data": {
			"templateId": "V0001_FAMILY_BULBASAUR",
			"pokemonFamily": {
				"familyId": "FAMILY_BULBASAUR",
				"candyPerXlCandy": 100,
				"megaEvolvablePokemonId": "VENUSAUR"
			}
		}


FORMS // list of available forms for each pokemon; only value info is isCostume data for full pokemon entries (e.g. bulbasaur fall 2019)
	"templateId": "FORMS_V[4-digit-id]_POKEMON_[name-id]"
	data
		formSettings
			pokemon: [NAME_ID]
			forms []
				form: [NAME_ID]_[FORM]
				isCostume

POKEMON ENTRIES // full data for each pokemon form
	"templateId": "V[POKEMON-4-digit-id]_POKEMON_[POKEMON-name-id]"
	data
		formSettings
			pokemon: [NAME_ID]
			forms []
				form: [NAME_ID]_[FORM]
				isCostume

	"templateId": "V0001_POKEMON_BULBASAUR",
	"data": {
		"templateId": "V0001_POKEMON_BULBASAUR",
		"pokemonSettings": {
			"pokemonId": "BULBASAUR",
			"type": "POKEMON_TYPE_GRASS",
			"type2": "POKEMON_TYPE_POISON",
			"stats": {
				"baseStamina": 128,
				"baseAttack": 118,
				"baseDefense": 111
			},
			"quickMoves": [
				"VINE_WHIP_FAST",
				"TACKLE_FAST"
			],
			"cinematicMoves": [
				"SLUDGE_BOMB",
				"SEED_BOMB",
				"POWER_WHIP"
			],
			"evolutionIds": [
				"IVYSAUR"
			],
			"evolutionPips": 1,
			"rarity": "POKEMON_RARITY_LEGENDARY", // ONLY LEGENDARY/MYTHICAL POKEMON
			"parentPokemonId": "PIDGEY",
			"familyId": "FAMILY_BULBASAUR",
			"candyToEvolve": 25,
			"kmBuddyDistance": 3,
			"evolutionBranch": [
				{
					"evolution": "IVYSAUR",
					"candyCost": 25,
					"form": "IVYSAUR_NORMAL",
					"obPurificationEvolutionCandyCost": 22
					"genderRequirement": "FEMALE",
					"evolutionItemRequirement": "ITEM_SUN_STONE",
					"lureItemRequirement": "ITEM_TROY_DISK_MAGNETIC",
					"kmBuddyDistanceRequirement": 10,
					"mustBeBuddy": true,
					"onlyDaytime": true,
					"priority": 100,
					"questDisplay": [
						{
							"questRequirementTemplateId": "ESPEON_EVOLUTION_QUEST"
						}
					]
				},
				{
					"temporaryEvolution": "TEMP_EVOLUTION_MEGA",
					"temporaryEvolutionEnergyCost": 100,
					"temporaryEvolutionEnergyCostSubsequent": 20
				}
			],
			"buddyScale": 19,
			"thirdMove": {
				"stardustToUnlock": 10000,
				"candyToUnlock": 25
			},
			"isTransferable": true,
			"isDeployable": true,
			"isTradable": true,
			"shadow": {
				"purificationStardustNeeded": 3000,
				"purificationCandyNeeded": 3,
				"purifiedChargeMove": "RETURN",
				"shadowChargeMove": "FRUSTRATION"
			},
			"buddyGroupNumber": 2,
			"buddyWalkedMegaEnergyAward": 15,
			"eliteQuickMove": [
			"WING_ATTACK_FAST",
			"GUST_FAST"
		],
		"eliteCinematicMove": [
			"AIR_CUTTER"
		],
		"tempEvoOverrides": [
			{
				"tempEvoId": "TEMP_EVOLUTION_MEGA",
				"stats": {
					"baseStamina": 195,
					"baseAttack": 280,
					"baseDefense": 175
				},
				"averageHeightM": 2.2,
				"averageWeightKg": 50.5,
				"typeOverride1": "POKEMON_TYPE_NORMAL",
				"typeOverride2": "POKEMON_TYPE_FLYING",
				"camera": {
					"cylinderRadiusM": 2.5,
					"cylinderHeightM": 1.65,
					"cylinderGroundM": 1.2
				},
				"modelScaleV2": 0.97,
				"modelHeight": 2.18,
				"buddyOffsetMale": [
					20.0,
					-27.48,
					-30.0
				],
				"buddyOffsetFemale": [
					20.0,
					-27.48,
					-30.0
				]
			}
		],
		"buddyWalkedMegaEnergyAward": 5,
		"formChange": [
			{
				"availableForm": [
					"FURFROU_DEBUTANTE",
					"FURFROU_MATRON",
					"FURFROU_DANDY"
				],
				"candyCost": 25,
				"stardustCost": 10000
			}
		]
		}
	}

MEGA EVOS
	templateId": "TEMPORARY_EVOLUTION_V0006_POKEMON_CHARIZARD",
	"temporaryEvolutionSettings": {
		"pokemonId": "CHARIZARD",
		"temporaryEvolutions": [
			{
				"temporaryEvolutionId": "TEMP_EVOLUTION_MEGA_X",
				"assetBundleValue": 51
			},
			{
				"temporaryEvolutionId": "TEMP_EVOLUTION_MEGA_Y",
				"assetBundleValue": 52
			}
		]

SPAWN GENDER RATE
	"templateId": "SPAWN_V0819_POKEMON_SKWOVET",
	"genderSettings": {
		"pokemon": "SKWOVET",
		"gender": {
			"malePercent": 0.5,
			"femalePercent": 0.5
		}
noteworthy OBJECTS
USER LEVEL REQUIREMENTS FOR SPECIAL CATEGORIES
	templateId": "POKEDEX_CATEGORIES_SETTINGS",
	"obPokedexCategoriesSettings": {
		"featureEnabled": true,
		"obSpecialCategories": [
			{
				"obPokedexCategory": "COSTUME",
				"obCategoryObtainedUnlockRequirement": 1
			},
			{
				"obPokedexCategory": "LUCKY",
				"obCategoryObtainedUnlockRequirement": 10
			},
			{
				"obPokedexCategory": "SHINY",
				"obCategoryObtainedUnlockRequirement": 15
			},
			{
				"obPokedexCategory": "SHINY_THREE_STAR",
				"obCategoryObtainedUnlockRequirement": 50
			},
			{
				"obPokedexCategory": "THREE_STAR",
				"obCategoryObtainedUnlockRequirement": 10
			},
			{
				"obPokedexCategory": "FOUR_STAR",
				"obCategoryObtainedUnlockRequirement": 20
			},
			{
				"obPokedexCategory": "SHADOW",
				"obCategoryObtainedUnlockRequirement": 10
			},
			{
				"obPokedexCategory": "PURIFIED",
				"obCategoryObtainedUnlockRequirement": 10
			}
		]
	}
GENERAL UPGRADE REQUIREMENTS
	"templateId": "POKEMON_UPGRADE_SETTINGS",
	"pokemonUpgrades": {
		"upgradesPerLevel": 2,
		"allowedLevelsAbovePlayer": 10,
		"candyCost": [1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,4,4,4,4,4,6,6,8,8,10,10,12,12,15,0,0,0,0,0,0,0,0,0,0,0],
		"stardustCost": [200,200,400,400,600,600,800,800,1000,1000,1300,1300,1600,1600,1900,1900,2200,2200,2500,2500,3000,3000,3500,3500,4000,4000,4500,4500,5000,5000,6000,6000,7000,7000,8000,8000,9000,9000,10000,10000,11000,11000,12000,12000,13000,13000,14000,14000,15000],
		"shadowStardustMultiplier": 1.2,
		"shadowCandyMultiplier": 1.2,
		"purifiedStardustMultiplier": 0.9,
		"purifiedCandyMultiplier": 0.9,
		"maxNormalUpgradeLevel": 50,
		"defaultCpBoostAdditionalLevel": 1,
		"xlCandyMinPlayerLevel": 40,
		"xlCandyCost": [10,10,12,12,15,15,17,17,20,20]
	}
}

TYPE CHART (STRENGTHS/WEAKENESSES)
	"templateId": "POKEMON_TYPE_[TYPE]",
	"typeEffective": {
		"attackScalar": [1.0,0.625,0.625,0.625,1.0,1.0,1.0,0.625,0.625,0.625,1.0,1.6,1.0,1.6,1.0,1.0,1.6,0.625],
		"attackType": "POKEMON_TYPE_[TYPE]"
	[TYPE] -> replace with any type
	attackScalar order: [Normal,Fighting,Flying,Poison,Ground,Rock,Bug,Ghost,Steel,Fire,Water,Grass,Electric,Psychic,Ice,Dragon,Dark,Fairy]

WEATHER BOOST TYPES
	"templateId": "WEATHER_AFFINITY_CLEAR",
	"weatherAffinities": {
		"weatherCondition": "CLEAR",
		"pokemonType": [
			"POKEMON_TYPE_GRASS",
			"POKEMON_TYPE_GROUND",
			"POKEMON_TYPE_FIRE"
		]

WEATHER BOOST DETAILS
	"templateId": "WEATHER_BONUS_SETTINGS",
	"weatherBonusSettings": {
		"cpBaseLevelBonus": 5,
		"guaranteedIndividualValues": 4,
		"stardustBonusMultiplier": 1.25,
		"attackBonusMultiplier": 1.2,
		"raidEncounterCpBaseLevelBonus": 5,
		"raidEncounterGuaranteedIndividualValues": 10
	}

PVP SETTINGS, MODIFIERS
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

COMBAT LEAGUES (PVP?)
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

SPECIAL EVOLUTION QUESTS/REQUIREMENTS
	"templateId": "[POKEMON_id]_EVOLUTION_QUEST"
		data
			questType
				goals []
					target


??? UNKNOWN MODIFIERS (BUT LOOKS LIKE RELATED TO POKEMON HOME)
	"templateId": "ENERGY_COSTS_POKEMON_CLASS_LEGENDARY",
	"pokemonHomeEnergyCosts": {
		"pokemonClass": "POKEMON_CLASS_LEGENDARY",
		"base": 1000,
		"shiny": 9000,
		"cp1001To2000": 300,
		"cp2001ToInf": 500
	}

	"templateId": "ENERGY_COSTS_POKEMON_CLASS_MYTHIC",
	"pokemonHomeEnergyCosts": {
		"pokemonClass": "POKEMON_CLASS_MYTHIC",
		"base": 2000,
		"shiny": 8000,
		"cp1001To2000": 500,
		"cp2001ToInf": 700
	}

	"templateId": "ENERGY_COSTS_POKEMON_CLASS_NORMAL",
	"pokemonHomeEnergyCosts": {
		"base": 10,
		"shiny": 1990,
		"cp1001To2000": 100,
		"cp2001ToInf": 300
	}


DETECT BABIES
buddySize: "BUDDY_BABY"
if no parentId (first in evo chain) && family != monName (family named )
BABIES/FAMILIES with family name == baby name
tyrogue
togepi

DETECT FORM NAME
/^V.*_POKEMON_[A-Z]*_(.*)/
Pokemon with "_" in name (can't use _ as name-form separator (e.g. bulbasaur_normal))
MR_MIME
HO_OH
MIME_JR
MR_RIME
PORYGON_z

SPECIAL FORMS
ARCEUS_NORMAL
FEMALE / MALE