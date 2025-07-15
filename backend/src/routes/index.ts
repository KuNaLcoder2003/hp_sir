import express from "express"
import teacher_router from "./teacher";
import student_router from "./students";

const router = express.Router();

router.use("/teacher" , teacher_router)
router.use("/student" , student_router)

export default router