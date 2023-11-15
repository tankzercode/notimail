import { Outlet } from "react-router-dom";
import Acceuil from "../page/acceuil";
import { useContext } from "react";
import UserContext from "./UserContext";
import Entreprise from "../page/Entreprise";

export default function AdminMiddleware() {
    const user = useContext(UserContext)

    if (user.user.is_admin) {
        return <Outlet></Outlet>
    }
    else {
        return <Entreprise></Entreprise>
    }

}