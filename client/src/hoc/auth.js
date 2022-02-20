import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { auth } from "../_actions/user_action"
// import { useNavigate } from "react-router-dom"

export default function Auth(SpecifcComponent, option, adminRoute = null) {
    const navigate = useNavigate()
    function AuthenticationCheck(props) {
        const dispatch = useDispatch()

        useEffect(() => {
            dispatch(auth()).then((response) => {
                console.log(response)

                if (!response.payload.isAuth) {
                    // 로그인 안한 상태
                    if (option) {
                        console.log("왜 안되지..")
                        // props.history.push("./login")
                        navigate("/loginPage")
                    }
                } else {
                    // 로그인한 상태
                    if (adminRoute && !response.payload.isAdmin) {
                        console.log("왜 안되지!")
                        props.history.push("/")
                    } else {
                        if (option === false) {
                            console.log("왜 안되지?")
                            props.history.push("/")
                        }
                    }
                }
            })
        }, [])

        return <SpecifcComponent />
    }

    return AuthenticationCheck()
}
