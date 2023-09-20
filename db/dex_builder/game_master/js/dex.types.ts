export type Pokedex = Map<number, Pokemon>

export type Family = {
  // name;
  num: number;
  summary: {};
  members: Map<number, Pokemon>;
}

export class Pokemon {
  name?: string
  famId?: number
  fam?: string
  forms: Map<number, PokeForm>;
  
  constructor() {
    this.forms = new Map<number, PokeForm>()
  }
}

// export type Pokemon = {
//   // pokemonId;
//   // num: number;
//   name?: string
//   famId: number
//   fam?: string
//   forms: Map<number, PokeForm>;
// }

type EvoChainObject = {
  pId: number
  name?: string
  fId: number
  form?: string
  reqs?: EvoRequirement[]
}

type EvoRequirement = {
  criteria: string,
  value: any[]
}

// export type PokeForm = {
export class PokeForm {
  // pokemonId;
  form?: string | null;
  // data;

  // 1) stats
  atk?: number;
  def?: number;
  sta?: number;
  // 2) evolutions, parent?

  parent?: EvoChainObject;
  evos?: EvoChainObject[];
  hasTradeEvoDiscount?: boolean;
  evoRequirements?: EvoRequirement[];

  // 3) types
  types?: [number, number?]
  typeNames?: [ElementType,ElementType?]
  // 4) candy / dust costs
  //   a) evolution (regular/shadow/purified)
  //   b) purfication


  /* TODO: determine / extract SPECIAL FEATURES */
  isBaby?: boolean;
  isLegendary?: boolean;
  isMythical?: boolean;
  hasShadow?: boolean;
  //data.pokemonSettings.shadow?
  // isMega / hasMega // implement in app logic
  // data.pokemonSettings.evolutionBranch[?].temporaryEvolution: "TEMP_EVOLUTION_MEGA"
}


export type ElementType =
"BUG"|
"DARK"|
"DRAGON"|
"ELECTRIC"|
"FAIRY"|
"FIGHTING"|
"FIRE"|
"FLYING"|
"GHOST"|
"GRASS"|
"GROUND"|
"ICE"|
"NORMAL"|
"POISON"|
"PSYCHIC"|
"ROCK"|
"STEEL"|
"WATER"

