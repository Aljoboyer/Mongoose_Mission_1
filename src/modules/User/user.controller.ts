import express, {Response, Request} from 'express';
import { User } from './user.schema';

export const createUserController = async (req: Request, res: Response) => {
    const userObj = new User(req.body)
    await userObj.save()
    res.send({inserted: "data inserted"})
}

export const getUserByIdController = async (req: Request, res: Response) => {
    const {id} = req.params
   const userById =  await User.find({id: id}, {name: 1})
    res.send(userById)
}