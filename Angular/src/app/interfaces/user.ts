import { Guid } from "guid-typescript";

//import { Guid } from "guid-typescript";
export interface User {
  userId: Guid | null;
  userName: string;
  pword: string;
  email: string;
  dob: Date;
  bucks: number;
  active: boolean;
  lastLogin: Date;
  loginStreak: number;
  profilePic: string;
  rewardCollected: boolean;

  //userId: Guid | null;
  //userName: string;
  //pword: string;
  //email: string;
  //dob: Date;
  //bucks: number;
}
