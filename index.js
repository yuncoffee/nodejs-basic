const express = require("express") //express 모듈을 가져옴
const app = express() // express 앱을 생성
const port = 5000 //port 설정

const mongoose = require("mongoose") //express 모듈을 가져옴

mongoose
    .connect(
        "mongodb+srv://dbyun:!ehdqja3664@myfirstcluster.yllax.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    )
    .then(() => {
        console.log("MongoDB Connected...")
    })
    .catch((err) => {
        console.log(err)
    })

app.get("/", (req, res) => {
    res.send("안녕하세요") // root에 도착하면 Hello World! 출력
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`) //앱 실행
})
