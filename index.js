const express = require("express") //express 모듈을 가져옴
const app = express() // express 앱을 생성
const port = 5000 //port 설정

const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const config = require("./config/key")
const { auth } = require("./middleware/auth")
const { User } = require("./models/User")

// url 분석
app.use(bodyParser.urlencoded({ extended: true }))

// json 분석
app.use(bodyParser.json())
app.use(cookieParser())

const mongoose = require("mongoose") //express 모듈을 가져옴

mongoose
    .connect(config.mongoURI)
    .then(() => {
        console.log("MongoDB Connected...")
    })
    .catch((err) => {
        console.log(err)
    })

app.get("/", (req, res) => {
    res.send("안녕하세요, 벌써 봄이네요..") // root에 도착하면 Hello World! 출력
})

app.post("/api/users/register", (req, res) => {
    // 회원가입 할 떄 필요한 정보들을 client에서 가져오면 데이터베이스에 넣어줌
    const user = new User(req.body)

    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true,
        })
    })
})

app.post("/api/users/login", (req, res) => {
    //요청된 이메일을 데이터베이스에서 있는지 찾는다.
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다.",
            })
        }

        // 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는지 확인한다.
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({
                    loginSuccess: false,
                    message: "비밀번호가 틀렸습니다.",
                })
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err)

                // 토큰을 저장한다. 저장을 어따할꺼? 쿠키 ? 로컬 스토리지 ? 세션 ? 장단점이 있다 나중에 알아보는걸로..
                res.cookie("x-auth", user.token)
                    .status(200)
                    .json({ loginSuccess: true, userId: user._id })
            })
            // 비밀번호까지 맞다면 토큰을 생성한다.
        })
    })
})

// 인증 완료 => 유저정보 가져오기
app.get("/api/users/auth", auth, (req, res) => {
    // 여기까지 미들웨어를 통과했다는 말은 Auth = true라는 말
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
        image: req.user.image,
    })
})

app.get("/api/users/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).send({
            success: true,
        })
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`) //앱 실행
})
