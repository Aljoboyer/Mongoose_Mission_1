import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";


export const userSchema = new Schema<IUser>({
    id: {
        type: String
    },
    name:{
        firstName: {
            type: String
        },
        lastName: {
            type: String
        }
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
})

export const User = model<IUser>('User', userSchema)