export interface User {
  _id?: string;
  firstname: string;
  lastname: string;
  email: string;
  salt: string;
  hash: string;
}

