export type PokemonFamily = {
  familyId: string,
  megaEvolvablePokemonId?: string
}

export type FormSettings = {
  pokemon: string,
  forms?: {
    form: string,
    isCostume?: true,
  }[]
}

export type PokemonSettings = {
  pokemonId: string
  type: string
  type2: string
  camera?: { [key: string]: number }
  stats: {
    baseStamina: number
    baseAttack: number
    baseDefense: number
  },
  quickMoves: string[]
  cinematicMoves: string[]
  evolutionIds?: string[]
  parentPokemonId?: string
  familyId: string
  kmBuddyDistance: number
  buddySize: string
  evolutionBranch?: [
    {
      evolution: string
      candyCost: number
      form: string
      noCandyCostViaTrade?: true
      genderRequirement?: true
      obPurificationEvolutionCandyCost: number
      temporaryEvolution: string
      temporaryEvolutionEnergyCost: number
      temporaryEvolutionEnergyCostSubsequent: number
    }
  ],
  form: string
  thirdMove: {
    stardustToUnlock: number
    candyToUnlock: number
  },
  isTransferable?: true,
  isDeployable?: true,
  isTradable?: true,
  shadow?: {
    purificationStardustNeeded: number,
    purificationCandyNeeded: number,
    purifiedChargeMove: string
    shadowChargeMove: string
  },
  eliteCinematicMove: string[]
  tempEvoOverrides?: [
    {
      tempEvoId: string
      stats: {
        baseStamina: number,
        baseAttack: number,
        baseDefense: number
      },
      typeOverride1?: string
      typeOverride2?: string
    }
  ],
  buddyWalkedMegaEnergyAward: number
}

export type AttackScalar = 0.390625 | 0.625 | 1 | 1.6

export type TypeEffective = {
  attackType: string,
  attackScalar: [
    Normal: AttackScalar,
    Fighting: AttackScalar,
    Flying: AttackScalar,
    Poison: AttackScalar,
    Ground: AttackScalar,
    Rock: AttackScalar,
    Bug: AttackScalar,
    Ghost: AttackScalar,
    Steel: AttackScalar,
    Fire: AttackScalar,
    Water: AttackScalar,
    Grass: AttackScalar,
    Electric: AttackScalar,
    Psychic: AttackScalar,
    Ice: AttackScalar,
    Dragon: AttackScalar,
    Dark: AttackScalar,
    Fairy: AttackScalar
  ]
}

export type GameMasterBaseEntry = {
  templateId: string;
  data: { templateId: string }
}

export type GameMasterEntry = GameMasterBaseEntry & {
  data:
  { templateId: string, pokemonFamily: PokemonFamily }
  | { tepmlateId: string, formSettings: FormSettings }
  | { tepmlateId: string, pokemonSettings: PokemonSettings }
  | { tepmlateId: string, [key: string]: any }
}

export type GameMaster = GameMasterEntry[]