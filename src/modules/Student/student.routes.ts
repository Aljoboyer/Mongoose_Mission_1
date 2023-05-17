import { postManyStudent, studentQueryController } from "./student.controller";

const router = require("express").Router();

router.post('/manyStudentPost', postManyStudent)
router.get('/studentQuery', studentQueryController)

export default router