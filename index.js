const express = require("express") //express 모듈을 가져옴
const app = express() // express 앱을 생성
const port = 5000 //port 설정

const bodyParser = require("body-parser")

const config = require("./config/key")

const { User } = require("./models/User")

// url 분석
app.use(bodyParser.urlencoded({ extended: true }))

// json 분석
app.use(bodyParser.json())

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

app.post("/register", (req, res) => {
    // 회원가입 할 떄 필요한 정보들을 client에서 가져오면 데이터베이스에 넣어줌
    const user = new User(req.body)

    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true,
        })
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`) //앱 실행
})
