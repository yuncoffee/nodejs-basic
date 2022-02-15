const mongoose = require("mongoose")

const bcrypt = require("bcrypt")
const saltRounds = 10
const jwt = require("jsonwebtoken")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
    },
    email: {
        type: String,
        trim: true, //스페이스바 없애주는거
        unique: 1,
    },
    password: {
        type: String,
        maxlength: 100, // 50자일 때 에러가 났었다
    },
    role: {
        type: Number,
        default: 0,
    },
    image: String,
    token: {
        type: String,
    },
    toeknExp: {
        type: Number,
    },
})

userSchema.pre("save", function (next) {
    let user = this

    // 비밀번호 암호화 시키기
    if (user.isModified("password")) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) return next(err) // 에러발생 시 에러처리
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) return next(err) // 에러발생 시 에러처리
                // Store hash in your password DB.
                user.password = hash // 에러없이 도착했다면 password를 hash로 바꾸는 거
                next()
            })
        })
    } else {
        next()
    }
})

// 비밀번호 체크하는? 비교하는? 메소드
userSchema.methods.comparePassword = function (plainPassword, cb) {
    // plainPassword와 암호화 된 비밀번호 체크하기!
    // plainPassword를 암호화 하기
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return cb(err)
        cb(null, isMatch)
    })
}

// 토큰 생성하는 메소드
userSchema.methods.generateToken = function (cb) {
    let user = this
    console.log(user)
    // jsonwebtoken을 이용해서 token 생성
    let token = jwt.sign(user._id.toHexString(), "secretToken") // user._id + "secretToken" = token
    // 두개가 합쳐져서 userId를 찾을 수 이씀

    user.token = token
    user.save(function (err, user) {
        if (err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function (token, cb) {
    let user = this

    jwt.verify(token, "secretToken", function (err, decoded) {
        // 유저 아이디를 이용해서 유저를 찾은 다음
        // 클라어인트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
        user.findOne({ _id: decoded, token: token }, function (err, user) {
            if (err) return cb(err)
            cb(null, user)
        })
    })
}

const User = mongoose.model("User", userSchema)

module.exports = { User }
