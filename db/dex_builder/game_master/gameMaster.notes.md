noteworthy OBJECTS
COMBAT LEAGUES (PVP?)
	templateId : "COMBAT_LEAGUE_VS_SEEKER_..."
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