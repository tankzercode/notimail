import { Outlet } from "react-router-dom";
import Acceuil from "../page/acceuil";
import { useContext, useEffect, useState } from "react";
import UserContext from "./UserContext";
import Entreprise from "../page/Entreprise";

export default function AdminMiddleware() {
    const user = useContext(UserContext)
    const [is_admin, setIs_admin] = useState(false)

    useEffect(() => {
        if(user.user) {
            if (user.user.is_admin) {
                setIs_admin(true)
            }
        }
  
       


    }, [user])


    if (is_admin) {
        return <Outlet></Outlet>
    }
    else {
        return <Entreprise></Entreprise>
    }



}