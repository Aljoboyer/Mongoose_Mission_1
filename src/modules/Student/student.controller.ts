import express, {Response, Request} from 'express';
import { Student } from './student.schema';


export const postManyStudent = async (req: Request, res: Response) => {
    console.log('Hitted')
    const studentObj = await Student.insertMany(req.body)
    res.send({inserted: "data inserted"})
}
