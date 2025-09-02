import jsonwebtoken from "jsonwebtoken"
const secret = "ihqe802ue9"

export function generateToken(email: string, role: string) {
    const token = jsonwebtoken.sign({ email: email, role: role }, secret)
    return token
}

export function generateTokensForDoubt() {

    return
}