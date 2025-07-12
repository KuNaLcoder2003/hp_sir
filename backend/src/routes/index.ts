import express from "express"
import teacher_router from "./teacher";

const router = express.Router();

router.use("/teacher" , teacher_router)

export default router