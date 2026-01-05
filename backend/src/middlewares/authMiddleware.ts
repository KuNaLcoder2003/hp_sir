import express from "express"
function authMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        console.log(1);
        const code = req.headers.authorization;
        if (!code) {
            console.log(2);
            res.status(401).json({
                message: "You do not have permission for this action",
                valid: false
            })
            return
        }

        if (code == 'DYRTN_BY_HP_SIR_6/120_ABHAYASA') {
            console.log(3);
            next();

        } else {
            console.log(4);
            res.status(401).json({
                message: "You do not have permission for this action",
                valid: false
            })
            return
        }
        console.log(5);
    } catch (error) {
        console.log(6);
        res.status(500).json({
            message: "Something went wrong",
            valid: false
        })
        return
    }
}

export default authMiddleware;