import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { loginUser } from "../../../_actions/user_action"

function LoginPage(props) {
    const [Email, setEmail] = useState("test")
    const [Password, setPassword] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onEmailHandler = (e) => {
        setEmail(e.target.value)
    }

    const onPasswordHandler = (e) => {
        setPassword(e.target.value)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()

        let body = {
            email: Email,
            password: Password,
        }

        dispatch(loginUser(body)).then((response) => {
            if (response.payload.loginSuccess) {
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
                <label>Password</label>
                <input
                    type="password"
                    value={Password}
                    onChange={onPasswordHandler}
                />
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginPage
