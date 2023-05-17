import { createUserController, getUserByIdController } from "./user.controller";
const router = require("express").Router();

router.get('/createUser', createUserController)
router.get('/getUserById/:id', getUserByIdController)

export default router