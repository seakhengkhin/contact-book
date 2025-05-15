export interface IUser {
    id: number;
    fullName: string;
    email: string;
    password: string;
    lastLoginTime: Date;
    token: string;
}
export class User implements IUser {
    id: number = 0;
    fullName: string = "";
    email: string = "";
    password: string = "";
    lastLoginTime: Date = new Date();
    token: string = "";
}