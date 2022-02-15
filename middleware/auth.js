const { User } = require("../models/User")

let auth = (req, res, next) => {
    // 인증처리를 하는 곳이에요

    // 클라이언트에서 토큰을 가져온다.
    let token = req.cookies["x-auth"]
    // prettier-ignore
    console.log(req.cookies['x-auth'])
    console.log(req.cookies["x-auth"])
    // 토큰을 복호화 한 후 유저를 찾는다.
    User.findByToken(token, (err, user) => {
        if (err) throw err
        if (!user) {
            return res.json({ isAuth: false, error: true })
        }

        req.token = token
        req.user = user
        next()
    })
    // 유저가 있으면 인증 Ok
    // 유저가 없으면 인증 No
}

module.exports = { auth }
