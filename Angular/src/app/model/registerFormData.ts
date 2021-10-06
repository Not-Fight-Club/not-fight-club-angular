export class RegisterFormData {
  private email: string;
  private password: string;
  private dob: string;
  private fname: string;
  private lname: string;

  constructor(email: string, password: string, dob: string, fname: string, lname: string) {
    this.email = email;
    this.password = password;
    this.dob = dob;
    this.fname = fname;
    this.lname = lname;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }

  getDob(): string {
    return this.dob;
  }

  getFname(): string {
    return this.fname;
  }

  getLname(): string {
    return this.lname;
  }

}
