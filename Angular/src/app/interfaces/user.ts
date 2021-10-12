//import { Guid } from "guid-typescript";
export interface User {
  //userId: number;

  userId: string;
  userName: string;
  pword: string;
  email: string;
  dob: Date;
  bucks: number;
  Active: boolean;
  LastLogin: Date;
  LoginStreak: number;
  ProfilePic: string;
  RewardCollected: boolean;

  //userId: Guid | null;
  //userName: string;
  //pword: string;
  //email: string;
  //dob: Date;
  //bucks: number;
}
