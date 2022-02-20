import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { loginUser, registerUser } from "../../../_actions/user_action"

function RegisterPage() {
    const [Email, setEmail] = useState("test")
    const [Password, setPassword] = useState("")
    const [Name, setName] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onEmailHandler = (e) => {
        setEmail(e.target.value)
    }

    const onNameHandler = (e) => {
        setName(e.target.value)
    }

    const onPasswordHandler = (e) => {
        setPassword(e.target.value)
    }

    const onConfirmPasswordHandler = (e) => {
        setConfirmPassword(e.target.value)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()

        if (Password !== ConfirmPassword) {
            return alert("비밀번호와 비밀번호 확인은 같아야되요")
        }

        let body = {
            email: Email,
            password: Password,
            name: Name,
        }

        dispatch(registerUser(body)).then((response) => {
            if (response.payload.success) {
                navigate("/") // -1은 이거 나를 빼는건가보다
            } else {
                alert("Error")
            }
        })
    }

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100vh",
            }}
        >
            <form
                style={{ display: "flex", flexDirection: "column" }}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />

                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler} />
                <label>Password</label>
                <input
                    type="password"
                    value={Password}
                    onChange={onPasswordHandler}
                />
                <label>Confirm Password</label>
                <input
                    type="password"
                    value={ConfirmPassword}
                    onChange={onConfirmPasswordHandler}
                />
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default RegisterPage
