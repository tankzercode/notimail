import { useContext, useEffect, useState } from "react";
import UserContext from "./UserContext";
import { Outlet } from "react-router-dom";
import Acceuil from "../page/acceuil";
import axios from "axios";

export default function AuthMiddleware() {

    const user = useContext(UserContext)
    console.log(user)
    console.log("auth")
    const [isauth, setIsAuth] = useState(false)
    useEffect(() => {

        axios.get(process.env.REACT_APP_BACK + "/users/isAuth", { withCredentials: true }).then((r) => {
            setIsAuth(true)
            user.setSuccess("vous etes connecté")
        }).catch((er) => {
            user.setError("vous etes déconnecté")

        })

    }, [isauth])


    if (isauth) {


        return <Outlet></Outlet>
    }

    else {

        return <Acceuil></Acceuil>
    }


}