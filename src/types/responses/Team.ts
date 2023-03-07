export interface TeamFromResponse {
  _id: string;
  color: string;
  gc: number;
  gf: number;
  hisGF: number[];
  hisGC: number[];
  historico: PossibleResultsFromResponse[];
  nombre: string;
  pe: number;
  pg: number;
  pj: number;
  pp: number;
  vs: string[];
}

export type PossibleResultsFromResponse = "p" | "g" | "e";
