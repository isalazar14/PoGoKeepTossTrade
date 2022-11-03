// prettier-ignore
type PokeIv = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;
type PokeIvSet = [iv_id: number, atkIV: PokeIv, defIV: PokeIv, staIV: PokeIv];
type PokeCpmSet = [level: number, cpm: number];
type PokeFormBaseStatsSet = [
  p_id: number,
  f_id: number,
  baseAtk: number,
  baseDef: number,
  baseSta: number
];