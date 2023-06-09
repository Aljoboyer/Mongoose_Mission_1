import express, {Response, Request} from 'express';
import { Student } from './student.schema';


export const postManyStudent = async (req: Request, res: Response) => {
    const studentObj = await Student.insertMany(req.body)
    // const data = await Student.aggregate([
    // {
    //     $addFields: {subjectsMarks: req.body}
    // },
    //   { $out: "students" },
    // ])

    res.send({inserted: "data inserted"}) 
}

export const studentQueryController = async (req: Request, res: Response) => {
    /* 
        Applying Query here
    */
    const data1 = await Student.find({ roll : {$lte : 50}}).sort({roll: 1})

    /* 
        Applying Aggregation here
    */

    const data2 = await Student.aggregate([
        {$match: {class: '1', section: 'B'}}
    ]).project({name: 1, class: 1})

        /* -----------Adding field to object------- */

    const data3 = await Student.aggregate([
        {$addFields: {
            averageNumber: {
                $floor: { $multiply: [ { $rand: {} }, 100 ] }
            }
        }
      },
    // {
    //     $addFields: {SchoolName: 'Joybangla School'}
    // },
      { $out: "students" },
    ])

    /* -----------Grouping with unique value------- */
    
    const data4 = await Student.aggregate([
        {$group: {_id: {averageNumber : "$averageNumber", name: "$name", class: "$class"}}}
    ])
    
    const data5 = await Student.aggregate([

        // { $group: { _id:  "$section", count: { $sum: 1 } } },

         { $group: { 
        //if we use id as null it will check the whole data and will findout the value
        //  _id:  "null", 
        //if we specify the id, it will check only this specific section
         _id:  "$section", 
        maxNum: {$max: "$averageNumber"},
        minNum: {$min: "$averageNumber"},
        avgNum: {$avg: "$averageNumber"}
        },
        },
        {
        $project:{
            maxNum: 1,
            minNum: 1,
            avgNum: 1,
            numberRange: {$subtract: ["$maxNum", "$minNum"]}
        }
        }
    ])


    const data6 = await Student.aggregate([
        {
            $unwind : "$section"
        },
        {$group: {_id: {class : "$section"}}} 
    ])

    const data7 = await Student.aggregate([
        {
            $unwind : "$subjectsMarks"
        },
        {$group: {_id: "$subjectsMarks"}} 
    ])

    const data = await Student.aggregate([
        {$match: {class: "4"}},
        {
            $lookup: {
                from: 'users',
                localField: 'class', // Replace 'userId' with the appropriate field from the 'Student' collection
                foreignField: 'password', // Replace '_id' with the appropriate field from the 'users' collection
                as: 'personalData' // Optionally, specify the name of the field to store the lookup results
            }
        }
    ])

    res.send(data)
}

