import { Role } from "./role";

export interface User {
  _id?: string;
  username: string;
  password: string;
  phoneNumber: string;
  address: string;
  gender: string;
  fullname: string;
  roleID: Role;
  imageUrl: string;
}
