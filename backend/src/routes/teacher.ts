import express from "express"
import { PrismaClient } from "../../generated/prisma";
const prisma = new PrismaClient()
import multer from "multer"
import crypto from "crypto"
import { uploadOnCloud } from "../functions/cloudinary";
import { generateToken } from "../functions/generateToken";
import bcrypt from "bcrypt"
import { sendMail } from "../functions/mail";
import { sha256 } from "crypto-hash";
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const teacher_router = express.Router();
const salts = 10;

interface NewBatch {
    batch_name: string,
    duration: number
}


function toHash(string: string): number {

    let hash: number = 0;

    if (string.length == 0) return hash;

    for (let i = 0; i < string.length; i++) {
        let char = string.charCodeAt(i);
        hash = ((hash << 5) + hash) + char;
        hash = hash & hash;
    }

    return Math.abs(hash)
}

teacher_router.get('/student/:batchid/:subjectId', async (req: any, res: express.Response) => {
    const batchId = req.params.batchid
    const subjectId = req.params.subjectId
    try {
        const students = await prisma.studentSubjects.findMany({
            where: {
                batchId: Number(batchId),
                subjectId: Number(subjectId)
            }
        })
        const ids = students.map((student) => {
            return student.studentEmail
        })
        const students_array = await prisma.student.findMany({
            where: {
                email: {
                    in: ids
                }
            }
        })
        res.status(200).json({
            students: students_array
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
})

teacher_router.post('/signin', async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, teacherCode } = req.body.adminCred;
        if (!email || !password) {
            res.status(400).json({
                message: 'Bad requests'
            })
            return
        }
        const teacher = await prisma.teacher.findFirst({
            where: {
                email: email
            }
        })

        if (!teacher) {
            res.status(404).json({
                message: 'Account not found'
            })
            return
        }

        const matched = bcrypt.compareSync(password, teacher.password)

        if (!matched) {
            res.status(401).json({
                message: 'Wrong password'
            })
        }

        const token = generateToken(email, "admin")
        if (!token) {
            res.status(402).json({
                message: 'Error logging in'
            })
            return
        }
        res.status(200).json({
            token: token,
            message: 'SignedIn',
            role: "admin",
            user: `${teacher.first_name} ${teacher.last_name}`
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
})

teacher_router.post('/signup', async (req: express.Request, res: express.Response) => {
    try {
        const { first_name, last_name, email, password } = req.body.teacherCred
        if (!first_name || !last_name || !email || !password) {
            res.status(400).json({
                message: 'Bad request'
            })
            return
        }
        const teacher = await prisma.teacher.findFirst({
            where: {
                email: email
            }
        })
        if (teacher) {
            res.status(402).json({
                message: 'Account already exixts'
            })
            return
        }
        const hashedPassword = bcrypt.hashSync(password, salts)
        if (!hashedPassword) {
            res.status(403).json({
                message: 'Error creating account'
            })
            return
        }
        // const teacher_code = await sha256(`${email} ${first_name}`)
        // if (!teacher_code) {
        //     res.status(400).json({
        //         message: 'Error creating account'
        //     })
        //     return
        // }
        const teacher_code = toHash(`${email} ${first_name}`)

        const new_teacher = await prisma.teacher.create({
            data: {
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: hashedPassword,
                teacher_code: `${teacher_code}`
            }
        })
        if (!new_teacher) {
            res.status(403).json({
                message: 'Error creating account'
            })
            return
        }
        const mail = await sendMail('kunalindia59@gmail.com', ['himanshprnm@gmail.com'], 'Teacher Login Details', `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Welcome Onboard</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        font-family: 'Segoe UI', Arial, sans-serif;
        background-color: #f7f9fc;
        color: #333;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        background: #ffffff;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      }
      .header {
        background: linear-gradient(135deg, #ff9800, #f44336);
        padding: 20px;
        text-align: center;
        color: #fff;
      }
      .header img {
        width: 120px;
        border-radius: 50%;
        margin-bottom: 15px;
      }
      .header h1 {
        margin: 0;
        font-size: 24px;
        font-weight: bold;
      }
      .content {
        padding: 30px 25px;
        line-height: 1.6;
      }
      .content h2 {
        color: #222;
        margin-bottom: 10px;
      }
      .details {
        background: #f1f5ff;
        border-left: 4px solid #3f51b5;
        padding: 15px;
        border-radius: 8px;
        margin: 20px 0;
      }
      .details p {
        margin: 8px 0;
        font-size: 15px;
      }
      .btn {
        display: inline-block;
        margin-top: 20px;
        padding: 12px 24px;
        background: #3f51b5;
        color: #fff !important;
        text-decoration: none;
        font-weight: bold;
        border-radius: 8px;
        transition: background 0.3s ease;
      }
      .btn:hover {
        background: #283593;
      }
      .footer {
        background: #f7f9fc;
        text-align: center;
        padding: 15px;
        font-size: 13px;
        color: #666;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <!-- HEADER -->
      <div class="header">
        <img src="cid:hp_sir" alt="Welcome Image" />
        <h1>Welcome to the Teaching Community!</h1>
      </div>

      <!-- CONTENT -->
      <div class="content">
        <h2>We’re excited to have you onboard 🎉</h2>
        <p>
          Congratulations on beginning this amazing journey of empowering young minds.  
          Your dedication and passion for teaching will inspire students to achieve their dreams.  
          Remember, every great achievement begins with a teacher like you.
        </p>

        <!-- LOGIN DETAILS -->
        <div class="details">
          <p><strong>Teacher Code:</strong> ${new_teacher.teacher_code}</p>
          <p><strong>Username:</strong> ${new_teacher.email}</p>
        </div>

        <p>
          Use the details above to log in and start your teaching journey with us.  
          We believe in you, and together we’ll make a lasting impact. 🌟
        </p>

        <a href="https://your-login-page.com" class="btn">Login Now</a>
      </div>

      <!-- FOOTER -->
      <div class="footer">
        <p>© 2025 Your Organization Name. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `)
        if (!mail) {
            res.status(403).json({
                message: 'Unable to send mail , please contact admin for your generated teacher code'
            })
        }
        res.status(200).json({
            message: 'Successfully created',
            valid: true
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
})

teacher_router.post('/admit_students', async (req: any, res: express.Response) => {
    try {
        const ids = req.body.ids as number[]
        if (ids.length == 0) {
            res.status(400).json({
                message: 'Bad request'
            })
            return
        }

        const admittedStudents = await prisma.student.updateMany({
            where: {
                id: {
                    in: ids
                }
            },
            data: {
                permitted: true
            }
        })
        if (!admittedStudents || admittedStudents.count == 0) {
            res.status(402).json({
                message: 'Error permitting students'
            })
            return
        }
        res.status(200).json({
            message: 'Students permitted',
            valid: true
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
})

teacher_router.delete('/student/:studentId', async (req: any, res: express.Response) => {
    try {
        const id = req.params.studentId
        if (!id) {
            res.status(402).json({
                message: 'Bad Request'
            })
            return
        }
        const student_deleted = await prisma.student.delete({
            where: { id: Number(id) }
        })
        if (!student_deleted) {
            res.status(403).json({
                message: 'Error deleting studnet'
            })
        }
        res.status(200).json({
            valid: true,
            message: 'Student deleted'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
})

teacher_router.get('/courses', async (req: express.Request, res: express.Response) => {
    try {
        const courses = await prisma.batch.findMany()
        if (!courses) {
            res.status(404).json({
                message: 'No courses yet'
            })
            return
        }
        const ids = courses.map(obj => {
            return obj.id
        })
        const subjects = await prisma.subjects.findMany({
            where: {
                batchId: {
                    in: ids
                }
            }
        })
        res.status(200).json({
            courses: courses,
            subjects: subjects
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
})
teacher_router.get('/course/:courseId', async (req: express.Request, res: express.Response) => {
    const courseId = req.params.courseId
    try {
        const course = await prisma.batch.findFirst({
            where: { id: Number(courseId) }
        })
        if (!course) {
            res.status(404).json({
                message: 'No course found'
            })
            return
        }
        const subjects = await prisma.subjects.findMany({
            where: { batchId: course.id }
        })
        const ids = subjects.map((obj) => {
            return obj.id
        })
        // const content = await prisma.content.findMany({
        //     where: {
        //         subjectId: {
        //             in: ids
        //         }
        //     }
        // })
        const folders = await prisma.folder.findMany({
            where: {
                subject_id: {
                    in: ids
                }
            }
        })
        res.status(200).json({
            batch_name: course.batch_name,
            folders,
            subjects
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
})

teacher_router.post('/createFolder/:subjectId/:batchId', async (req: any, res: express.Response) => {
    try {
        const { folder_name } = req.body.folder_deatils;
        const batchId = req.params.batchId;
        const subjectId = req.params.subjectId

        if (!batchId || !subjectId) {
            res.status(400).json({
                message: 'Bad request'
            })
            return
        }
        const batch = await prisma.batch.findFirst({
            where: {
                id: Number(batchId)
            }
        })
        if (!batch) {
            res.status(402).json({
                message: 'Batch does not exists'
            })
            return
        }

        const subject = await prisma.subjects.findFirst({
            where: {
                id: Number(subjectId)
            }
        })

        if (!subject) {
            res.status(402).json({
                message: 'Subject does not exists'
            })
            return
        }

        if (!folder_name) {
            res.status(402).json({
                message: 'Can not create a foder with empty name'
            })
            return
        }

        const new_folder = await prisma.folder.create({
            data: {
                folder_name: folder_name,
                batch_id: Number(batchId),
                subject_id: Number(subjectId)
            }
        })
        if (!new_folder) {
            res.status(402).json({
                message: 'Unable to create folder'
            })
            return
        }
        res.status(200).json({
            valid: true,
            message: 'Successfully created folder'
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
})

teacher_router.post('/batch', async (req: express.Request, res: express.Response) => {
    const { batch_name, duration } = req.body.batch as NewBatch
    try {
        const new_batch = await prisma.batch.create({
            data: {
                batch_name: batch_name,
                duration: duration
            }
        })
        if (!new_batch) {
            res.status(400).json({
                message: 'Unable to create a new batch'
            })
        }
        res.status(200).json({
            message: 'New batch created',
            valid: true
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
})

teacher_router.post("/subject/:batchId", async (req: express.Request, res: express.Response) => {
    try {
        const batchId = req.params.batchId
        const subject_name = req.body.subject
        if (!batchId) {
            res.status(400).json({
                message: 'Bad request'
            })
            return
        }
        const batch = await prisma.batch.findFirst({
            where: { id: Number(batchId) }
        })
        if (!batch) {
            res.status(404).json({
                message: 'No batch exists',
            })
            return
        }
        const new_subject = await prisma.subjects.create({
            data: {
                subject_name: subject_name,
                batchId: Number(batchId)
            }
        })
        if (!new_subject) {
            res.status(400).json({
                message: 'Error creating a new subject'
            })
            return
        }
        res.status(200).json({
            message: 'Subject created',
            valid: true,
            subject: new_subject
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
})

teacher_router.post('/content/:subjectId/:folderId', upload.single('content'), async (req: express.Request, res: express.Response) => {
    const subjectId = req.params.subjectId
    const folderId = req.params.folderId;
    const { content_name, type } = req.body
    const file = req.file as Express.Multer.File
    try {
        if (!subjectId || !folderId) {
            res.status(400).json({
                message: 'Bad request'
            })
            return
        }
        if (!content_name || !type || !file) {
            res.status(400).json({
                message: 'Missing feilds'
            })
            return
        }
        const subject = await prisma.subjects.findFirst({
            where: { id: Number(subjectId) }
        })
        if (!subject) {
            res.status(404).json({
                message: 'No subject found'
            })
            return
        }
        const buffer = Buffer.from(file.buffer)
        const result = await uploadOnCloud(buffer, "class_content", "raw")
        if (!result.valid) {
            res.status(400).json({
                message: 'Error uploading content'
            })
            return
        }
        const new_content = await prisma.content.create({
            data: {
                content_name: content_name,
                type: type,
                content_url: result.url,
                subjectId: Number(subjectId),
                uploaded_on: new Date(),
                folder_id: Number(folderId)
            }
        })
        if (!new_content) {
            res.status(400).json({
                message: 'Error creating a new content'
            })
            return
        }
        res.status(200).json({
            message: 'Succesfully uploaded!',
            new_content,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
})
export default teacher_router