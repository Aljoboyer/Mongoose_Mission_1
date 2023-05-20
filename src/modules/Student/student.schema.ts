import mongoose, { Schema, model } from "mongoose";
import { IStudent, SubjectsMarks } from "./student.interface";


export const studentSchema = new Schema<IStudent>({
   name: {
    type: String
   },
   roll: {
    type: Number
   },
   section:{
    type: String
   },
   relagion:{
    type: String
   },
   class:{
    type: String
   },
   averageNumber: {
      type: Number
   },
   SchoolName:{
      type: String
   },
   subjectsMarks:{
      type: Array<SubjectsMarks>
   }
})

export const Student =  mongoose.model<IStudent>("Students", studentSchema);
