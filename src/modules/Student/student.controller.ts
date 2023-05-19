import express, {Response, Request} from 'express';
import { Student } from './student.schema';


export const postManyStudent = async (req: Request, res: Response) => {
    const studentObj = await Student.insertMany(req.body)
    res.send({inserted: "data inserted"})
}

export const studentQueryController = async (req: Request, res: Response) => {
    /* 
        Applying Query here
    */
    // const data = await Student.find({ roll : {$lte : 50}}).sort({roll: 1})

    /* 
        Applying Aggregation here
    */

    // const data = await Student.aggregate([
    //     {$match: {class: '1', section: 'B'}}
    // ]).project({name: 1, class: 1})

        /* -----------Adding field to object------- */

    // const data = await Student.aggregate([
    //     {$addFields: {
    //         averageNumber: {
    //             $floor: { $multiply: [ { $rand: {} }, 100 ] }
    //         }
    //     }
    //   },
    // // {
    // //     $addFields: {SchoolName: 'Joybangla School'}
    // // },
    //   { $out: "students" },
    // ])

    /* -----------Grouping with unique value------- */
    
    // const data = await Student.aggregate([
    //     {$group: {_id: {averageNumber : "$averageNumber", name: "$name", class: "$class"}}}
    // ])
    
    const data = await Student.aggregate([

        { $group: { _id:  "$section", count: { $sum: 1 } } },

    ])
    res.send(data)
}