import jsonwebtoken from "jsonwebtoken"
import express from "express"

interface TokenVerify {
    email: string,
    role: string
}
export function studentMiddleWare(req: any, res: express.Response, next: express.NextFunction) {
    try {
        const authToken = req.headers.authorization as string;
        if (!authToken || !authToken.startsWith('Bearer ')) {
            res.status(401).json({
                message: 'Invalid access'
            })
            return
        }
        const token = authToken.split('Bearer ')[1]
        const verify = jsonwebtoken.verify(token, "ihqe802ue9") as TokenVerify
        if (!verify) {
            res.status(401).json({
                message: 'Invalid'
            })
            return
        } else {
            req.email = verify.email
            next()
        }

    } catch (error) {
        console.log('Middleware error : ', error)
        res.status(500).json({
            message: 'Something went wrong'
        })
        return
    }
}