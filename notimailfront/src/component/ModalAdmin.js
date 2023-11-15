import { useContext, useEffect } from "react";
import UserContext from "../service/UserContext";
import axios from "axios";



export default function ModalAdmin(props) {
    const user = useContext(UserContext)

    console.log(props)
    // useEffect(() => {

    //     if (document.querySelector("#ModalAdmin")) {
    //         window.addEventListener('click', function (e) {
    //             if (document.querySelector('#ModalAdmin').contains(e.target) || document.querySelector("#buttonsendmail") !== e.target) {

    //             } else {

    //                 props.open("hidden")


    //             }
    //         });
    //     }


    // }, [])

    function send() {


        //send notif

        console.log(user)

        axios.patch(process.env.REACT_APP_BACK + "/users", props.selected, {withCredentials:true}).then((r) => {
            user.setSuccess('mail envoyé')
            console.log(r)

            props.open('hidden')

            axios.get(process.env.REACT_APP_BACK + "/users/users", { withCredentials: true }).then((r) => {

                props.setList(r.data)

            }).catch((er) => {

                console.log(er)

            })
        }).catch((er) => {

            user.setError('une erreur est survenue')

        })




    }


    return (
        <>
            <div style={{ background: "#1212128c", height: "100vh", position: "fixed", width: "100%", top: "0", visibility: props.visible, zIndex: "9999" }}>

                <div style={{ height: "100%" }}>

                    <div style={{ position: "", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div id="ModalAdmin" style={{ background: "white", borderRadius: "25px", padding: "45px" }}>
                            <p>Vous vous apprétez à envoyer à notifier :</p>

                            {props.selected.map((el, index) => {
                                return <p key={index}>
                                    {el.firm_name}
                                </p>
                            })}

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