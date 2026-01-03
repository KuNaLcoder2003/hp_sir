import express from "express"
function authMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const code = req.headers.authorization;
        if (!code) {
            res.status(401).json({
                message: "You donot have permission for this action",
                valid: false
            })
            return
        }
        if (code == 'DYRTN_BY_HP_SIR_6/120_ABHAYASA') {
            next();
        } else {
            res.status(401).json({
                message: "You donot have permission for this action",
                valid: false
            })
            return
        }
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            valid: false
        })
        return
    }
}

export default authMiddleware;