import { postManyStudent } from "./student.controller";

const router = require("express").Router();

router.post('/manyStudentPost', postManyStudent)

export default router