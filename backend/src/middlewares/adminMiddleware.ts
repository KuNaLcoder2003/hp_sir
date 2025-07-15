import jsonwebtoken from "jsonwebtoken"
import express from "express"

interface TokenVerify {
    email : string,
    role : string
}
export function adminMiddleWare(req : any  , res : express.Response , next : express.NextFunction){
    try {
        const authToken = req.headers.authorization as string;
        if(!authToken || !authToken.startsWith('Bearer ')) {
            res.status(401).json({
                message : 'Invalid access'
            })
            return
        }
        const token = authToken.split('Bearer ')[1]
        const verify = jsonwebtoken.verify(token , "") as TokenVerify
        if(!verify || !(verify.role == 'admin')) {
            res.status(401).json({
                message : 'Invalid'
            })
            return
        } else {
            req.email = verify.email
            req.role = verify.role
            next()
        }

    } catch (error) {
        res.status(500).json({
                message : 'Something went wrong'
            })
            return
    }
}