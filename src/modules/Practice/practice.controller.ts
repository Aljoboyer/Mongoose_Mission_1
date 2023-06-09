import express, {Response, Request} from 'express';
import { PracticeCollection } from './practice.schema';


export const postManyPracticeData = async (req: Request, res: Response) => {
    await PracticeCollection.insertMany(req.body)

    res.send({inserted: "Practice data inserted"}) 
}

export const PracticeQueryController = async (req: Request, res: Response) => {

    // ---------Task 1: Find all users who are located in New York-----------//
    const user0 = await PracticeCollection.find({"address.city": "New York"})

    // ---------Task 2: Find the user(s) with the email "johndoe@example.com" and retrieve their favorite movie.-----------//
    const user1 = await PracticeCollection.find({email: "johndoe@example.com"}, {"favorites.movie": 1})

    // ---------Task 3: Find all users with "pizza" as their favorite food and sort them according to age.-----------//
    const user2 = await PracticeCollection.find({"favorites.food": "pizza"}).sort({age: -1})

    // ---------Task 4: Find all users over 30 whose favorite color is "green".-----------//
    const user3 = await PracticeCollection.find({age: {$gt: 30}, "favorites.color": "green"})

    // ---------Task 5: Count the number of users whose favorite movie is "The Shawshank Redemption."-----------//
    const user4 = await PracticeCollection.find({"favorites.movie": "The Shawshank Redemption"}).count()

    // ---------Task 6: Update the zipcode of the user with the email "johndoe@example.com" to "10002"."-----------//
    const user5 = await PracticeCollection.updateOne(  { email: 'johndoe@example.com' },
    { $set: { "address.zipcode": "10002"} })

    res.send( user5)
}

export const PracticeAggregationController = async (req: Request, res: Response) => {
      // ---------Task 8: Group users by their favorite movie and retrieve the average age in each movie group.-----------//
    const data0 = await PracticeCollection.aggregate([
        { $group: { 
             _id:  "$favorites.movie",
        }
        },
        {
            $project : {name: 1}
        }
    ])

    const data1 = await PracticeCollection.aggregate([
        //-------------Geting first document specific field while doing group---------------//
        // { $group: { 
        //   _id: "$favorites.movie",
        //   name: { $first: "$name" },
        //   age: {$first: "$age"},
        //   favorites: {$first: "$favorites"},
        // }},
        // { $project: { _id: 0, name: 1, age: 1, favorites: 1 } } 

        //-------------Geting all filed while doing group---------------//

        {
            $group: { 
              _id: "$favorites.movie",
              data: { $first: "$$ROOT" }
            }
          },
          {
            $replaceRoot: { newRoot: "$data" }
          },
          {
            $project: { data: 0 }
          }
    ]);

    //---------Task 9: Calculate the average age of users with a favorite " pizza " food.------------//
    const data2 = await PracticeCollection.aggregate([
        { $match: {"favorites.food" : "pizza"} },
        { $group: { _id: null, averageAge: { $avg: "$age"},   count: { $sum: 1 } } } 
    ]);

    //---------Task 10:Group users by their favorite color and retrieve the count of users in each color group.------------//
    const data3 = await PracticeCollection.aggregate([
        { $group: {
            _id: "$favorites.color",
            count: { $sum: 1 }
        } } 
    ]);

    //---------Task 11:Find the user(s) with the highest age.------------//
    const data4 = await PracticeCollection.aggregate([
        {
          $sort: { age: -1 } // Sort documents by score in descending order
        },
        {
          $limit: 1 // Retrieve only the first document (highest score)
        },
        {
          $project: { _id: 0, UserName: "$name", age: 1, } // Project only the student name and score fields
        }
      ]);

    //---------Task 12: Find the most common favorite food among all users.------------//
    const data5 = await PracticeCollection.aggregate([
            {
                $group: {
                    _id: '$favorites.food',
                    totalNumber: { $sum: 1 },
                }
            },
            {
              $sort: { totalNumber: -1 }
            },
            {
              $limit: 1
            },
        ]);
    const data6 = await PracticeCollection.find({"favorites.food" : data5[0]?._id})

    //---------Task 13: Calculate the total count of friends across all users.------------//
    const data7 = await PracticeCollection.aggregate([
      {
        $unwind : "$friends"
      },
      
    ]);

      //---------Task 13: Find the user(s) with the longest name.------------//
      const data8 = await PracticeCollection.aggregate([  
        {
          $project: {
            stringLength: { $strLenCP: "$name" },
            name: 1
          }
        },
        {
          $sort: { stringLength: -1 } // Sort documents by score in descending order
        },
        {
          $limit: 1 // Retrieve only the first document (highest score)
        },
      ]);

      //---------Task 14: Calculate each state's total number of users in the address field.------------//
      const data9 = await PracticeCollection.aggregate([  
        {
          $group: {
            _id: "$address.state",
            count: {$sum: 1}
          }
        }
      ]);

      //---------Task 14: Find the user(s) with the highest number of friends.------------//
      const data10 = await PracticeCollection.aggregate([  

      ]);
    res.send(data10)
}
