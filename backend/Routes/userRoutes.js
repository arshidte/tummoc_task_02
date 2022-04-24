import express from "express";
const router = express.Router();
import { authUser, googleLogin, register } from "../Controllers/userControllers.js";

router.post('/register', register)
router.post('/login', authUser)
router.post('/googlelogin', googleLogin)

export default router;