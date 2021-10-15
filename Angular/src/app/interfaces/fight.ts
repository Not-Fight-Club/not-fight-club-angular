import { Data } from "@angular/router";
import { Character } from "./character";
import { Fighter } from "./fighter";

export interface Fight {
  fightId: number;
 
  endDate: Date;
  startDate: Date;
  Result: string;
  CreatorId:number
  Location: number;
  locationNavigation: string;
  weatherNavigation: string;
  publicFight: boolean;
  Weather: number;
}

export interface Battle extends Fight {
  fighterOne: Fighter| null;
  fighterTwo: Fighter | null;
  characterOne: Character | null;
  characterTwo: Character | null;
}
