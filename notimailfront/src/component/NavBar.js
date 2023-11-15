import { Link, useNavigate } from "react-router-dom";

import UserContext from "../service/UserContext";
import { useContext } from "react";
import Logo from "./Logo";

export default function Navbar() {

    const user = useContext(UserContext)

    const navigate = useNavigate()
    console.log(user)
    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px", marginBottom: "25px" }}>

                <Logo></Logo>


                <div>
                    {user.user && user.user.is_admin === false &&

                        <p> {user.user.firm_name} </p>

                    }

                    {user.user && user.user.is_admin === true &&

                        <p> Admin </p>

                    }
                    <button className="btn btn-danger" onClick={() => {
                        user.setUser(null)

                        user.setSuccess("vous avez été déconnecté avec succès")
                        navigate("/")
                    }} > déconnecter </button>

                </div>


            </div>
        </>
    )
}