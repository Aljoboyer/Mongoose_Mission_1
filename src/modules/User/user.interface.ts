export interface IUser{
    id: string;
    name: {
        firstName: string;
        lastName: string
    };
    email: string;
    password: string
}