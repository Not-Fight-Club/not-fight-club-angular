import { Guid } from "guid-typescript";

export interface Character {
  characterId: number,
  name: string,
  level: number | null,
  wins: number | null,
  losses: number | null,
  ties: number | null,
  baseform: string,
  userId: Guid,
  traitId: number,
  weaponId: number
}
