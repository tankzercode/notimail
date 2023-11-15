import axios from "axios"
import { useContext, useEffect } from "react"
import UserContext from "../service/UserContext"

export default function ModalEntreprise(props) {



    const user = useContext(UserContext)
    useEffect(() => {
        console.log(user)


    }, [])

    function send() {

        console.log(user)
        axios.patch(process.env.REACT_APP_BACK + "/users/users/" + user.user.firm_name, {}, { withCredentials: true }).then((r) => {

            user.setSuccess('courrier retiré')
            user.setUser(r.data[0])
            props.open('hidden')

           



        }).catch((er) => {
            console.log(er)
            user.setError('une erreur est survenue')

        })
    }


    return (
        <>
            <div style={{ background: "#1212128c", height: "100vh", position: "fixed", width: "100%", top: "0", visibility: props.visible }}>

                <div style={{ height: "100%" }}>

                    <div style={{ position: "", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div id="ModalEntreprise" style={{ background: "white", borderRadius: "25px", padding: "45px" }}>
                            <p>Confirmez-vous la réception du courrier ?</p>

                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }} >
                                <ion-icon style={{ fontSize: "55px", color: "red" }} className="color-danger" onClick={() => {
                                    props.open("hidden")
                                }} name="close-circle"></ion-icon> <ion-icon onClick={() => { send() }} style={{ fontSize: "55px", color: "green" }} className="color-success" name="chevron-down-circle"></ion-icon>

                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}