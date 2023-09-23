/* Steps
  1. Get non-pokemon data
    families
    - family
    - candy_distance
    - trade_evolve
    - evo_cost_seq_id

    idendity forms to ignore
    - costumes
    - "copy"
    - if Normal is only form
    - Unown
    - Spinda
    - Arceus

    types
    - type

    level data
    - CPMs 
    - upgrade candy costs // omit from db
    - upgrade XL candy // omit from db
    - upgrade stardust cost // omit from db
    - total candy
    - total XL candy
    - total stardust
   
    leagues
    - name
    - maxCP

    consts
    - upgradeShadowStardustMultiplier
    - upgradeShadowCandyMultiplier
    - upgradePurifiedStardustMultiplier
    - upgradePurifiedCandyMultiplier
    - upgradeluckyStardustMultiplier // in "LUCKY_POKEMON_SETTINGS"
    - maxNormalUpgradeLevel
    - defaultCpBoostAdditionalLevel // buddy boost
    - xlCandyMinPlayerLevel // level at which XL candy kicks in
    - shadowPokemonAttackBonusMultiplier
    - shadowPokemonDefenseBonusMultiplier
    - friendshipTradingDiscountLevel2
    - friendshipTradingDiscountLevel3
    - friendshipTradingDiscountLevel4
  
  2A. Scan pokemon forms to identify trivial and non-trivial forms 
    - skip known trivial forms
    - compare remaining forms to non-form pokemon

  2B. Get pokemon data: compare forms, skip trivial forms
    pokemon
    - name 
    - form // 'mega
    - baseAttack
    - baseDefense
    - baseStamina
    - type
    - type2
    - parentPokemonId
    - family
    
    evolution
    - pokemonId
    - evoId
    - candyCost
    - isTradeEvo (noCandyCostViaTrade)
    - requirement

    legendary
    - pokemonId

    mythical
    - pokemonId

    babies
    - pokemonId

  3. Add data not specified in game master
    - purification -> level 25 & +2 for each IV
    - IV Floors // by friendship
    - trade costs // trade type x friendship
*/

// import { GameMaster } from "./types/gm.manual"
import { GameMaster } from "./types/gm.quicktype"
import { getFamilyName, getGameMasterTyped, getTypeName, isFamilyEntry, isFormEntry, isPokemonEntry, isTypeEntry } from "./utils"

const
  gameMasterFilePath = '../gameMaster_2023_09_19.json',
  // gm = require(gameMasterFilePath) as GameMaster,
  gm = getGameMasterTyped(gameMasterFilePath),
  knownUnwantedForms = ["NORMAL", "COPY", "UNOWN", "SPINDA", "ARCEUS", "SILVALLY"],
  dexData = {
    families: [] as string[],
    pokemon: new Map<string, any>(),
    types: [] as string[],
    levels: [],
    forms: new Set(),
    leagues: {},
    consts: {},
  },
  pokemonFormsToSkip = {} as { [key: string]: Set<string> | null },
  gmPokemonEntryIdxs = [] as number[]



function getBaseData(gm: GameMaster) {
  gm.forEach((entry, idx) => {
    if (isFamilyEntry(entry)) {
      const family = getFamilyName(entry.data.pokemonFamily.familyId)
      if (family) dexData.families.push(family)
    }

    else if (isFormEntry(entry)) {
      const { pokemon, forms } = entry.data.formSettings
      if (forms) {
        pokemonFormsToSkip[pokemon] = new Set()

        forms.forEach((f) => {
          const { form } = f
          if (f.isCostume
            || knownUnwantedForms.some(unwanted => form.includes(unwanted))) {
            pokemonFormsToSkip[pokemon]?.add(form)
          }
        })
        if (pokemonFormsToSkip[pokemon]?.size === 1) {
          pokemonFormsToSkip[pokemon] = null
        }
      }
    }

    else if (isTypeEntry(entry)) {
      dexData.types.push(getTypeName(entry.templateId))
    }

    else if (isPokemonEntry(entry)) {
      const { pokemonId: pokemon, form } = entry.data.pokemonSettings
      if (!form) {
        dexData.pokemon.set(pokemon, entry.data.pokemonSettings)
      }
      else {
        if (!pokemonFormsToSkip[pokemon]?.has(form)) {
          gmPokemonEntryIdxs.push(idx)
        }
      }
    }

  })

}

