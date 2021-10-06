import { Guid } from "guid-typescript";
export interface UserR {

  userId: Guid | null;
  userName: string;
  pword: string;
  email: string;
  dob: Date;
  bucks: number;
}
