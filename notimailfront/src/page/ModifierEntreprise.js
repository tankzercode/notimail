import { useContext, useEffect, useState } from "react"
import UserContext from "../service/UserContext"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

export default function ModifierEntreprise(props) {

    const navigate = useNavigate()
    const user = useContext(UserContext)
    let { param } = useParams()
    const [firm_name, setfirm_name] = useState(null)
    const [first_name, setfirst_name] = useState(null)
    const [last_name, setlast_name] = useState(null)
    const [email, setemail] = useState(null)
    const [phone_number, setphone_number] = useState(null)
    const [code, setCode] = useState(null)




    useEffect(() => {
        axios.get(process.env.REACT_APP_BACK + "/users/" + param, { withCredentials: true }).then((r) => {
            console.log(r);
            setfirm_name(r.data.firm_name)
            setfirst_name(r.data.first_name)
            setlast_name(r.data.last_name)
            setemail(r.data.email)
            setphone_number(r.data.phone_number)

        }).catch((er) => {
            user.setError('une erreur est survenue')
        })
    }, [])

    function deleteUser() {
        axios.delete(process.env.REACT_APP_BACK + "/users/" + param, { withCredentials: true }).then((r) => {
            user.setSuccess("profil supprimé avec success")

            navigate("/admin")
        }).catch((er) => {
            user.setError("une erreur est survenue")
        })
    }

    function sendData() {

        if (code === null) {
            user.setError("Vous devez saisir un nouveau mot de passe")
            document.querySelector('#password').style.border = "1px solid red"
            console.log(document.querySelector('#password'))
        } else {
            axios.put(process.env.REACT_APP_BACK + "/users/" + param, { firm_name, first_name, last_name, email, phone_number, code }, { withCredentials: true }).then((r) => {
                user.setSuccess("profil modifié avec success")
            }).catch((er) => {
                user.setError("une erreur est survenue")
            })
            console.log(document.querySelector("#password"))

            document.querySelector("#password").style.border = "1px solid grey"

        }

    }

    return (
        <>
            <div>
                <div onClick={() => {
                    navigate("/admin")
                }}>retour</div>


                <div style={{ maxWidth: "500px", margin: "auto", textAlign: "left" }}>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">firm_name</label>
                        <input type="email" onChange={(e) => setfirm_name(e.target.value)} placeholder={firm_name} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">first_name</label>
                        <input type="email" onChange={(e) => { setfirst_name(e.target.value) }} className="form-control" placeholder={first_name} id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">last_name</label>
                        <input type="email" onChange={(e) => { setlast_name(e.target.value) }} className="form-control" placeholder={last_name} id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" onChange={(e) => { setemail(e.target.value) }} className="form-control" placeholder={email} id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">phone_number</label>
                        <input type="email" onChange={(e) => { setphone_number(e.target.value) }} className="form-control" placeholder={phone_number} id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" id="password" onChange={(e) => { setCode(e.target.value) }} placeholder="********" className="form-control" />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-around" }}>

                        <button onClick={() => {
                            deleteUser()
                        }} className="btn btn-danger">Supprimer</button>
                        <button onClick={() => {
                            sendData()
                        }} className="btn btn-success">Modifier</button>
                    </div>

                </div>

            </div>
        </>
    )
}