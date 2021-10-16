import { Character } from "./character";

export interface FightWithCharacter {
  fightId: number;
  Winner: number;
  Loser: number;
  Date: Date;
  Result: string;
  Location: number;
  weatherNavigation:string;
	//add the following to store more details about each fight 
	locationNavigation:string;
	winner:Character;
	characters:Character[];
	
}
