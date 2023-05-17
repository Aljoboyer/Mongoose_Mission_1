import connectDB from "./Connection/DBConnect"
import express, {Response, Request} from 'express';
import cors from 'cors'
import { User } from "./modules/User/user.schema";
const app = express()
const port = 3000
require('dotenv').config();

connectDB()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


//Importing rout 

import UserRoute from './modules/User/user.routes'
import StudentRoute from './modules/Student/student.routes'


app.use("/user", UserRoute);
app.use("/student", StudentRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

