import { useContext, useState } from "react"
import UserContext from "../service/UserContext"
import ModalEntreprise from "../component/ModalEntreprise"

export default function Entreprise(props) {
    const [open, setOpen] = useState("hidden")

    const user = useContext(UserContext)


    return (
        <>

            <div>

                {user.user &&
                    <div>
                        {user.user.has_mail === false &&

                            <div>

                                <ion-icon className="text-primary color" style={{ fontSize: '100px' }} name="mail"></ion-icon>

                                <p className="text-primary">Aucun courrier en attente</p>

                                <button className="btn btn-primary" disabled>Réceptionner</button>

                            </div>
                        }
                        {user.user.has_mail === true &&

                            <div>

                                <ion-icon className="text-primary color" style={{ fontSize: '100px' }} name="mail-unread"></ion-icon>
                                <p className="text-primary">Vous avez du courrier en attente</p>

                                <button className="btn btn-primary" onClick={() => { setOpen("visible") }} >Réceptionner</button>

                            </div>
                        }


                            <ModalEntreprise  id="ModalEntreprise" user={user.user}  visible={open} open={setOpen}></ModalEntreprise>

                        



                    </div>
                }

            </div>


        </>
    )


}