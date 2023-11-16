import axios from "axios"
import { useContext, useEffect, useState } from "react"
import ModalAdmin from "../component/ModalAdmin"
import UserContext from "../service/UserContext"
import { useNavigate } from "react-router-dom"

export default function Admin() {

    const [selected, setSelected] = useState([])
    const [list, setList] = useState(null)
    const [open, setOpen] = useState("hidden")
    const navigate = useNavigate()
    const user = useContext(UserContext)
    const [test, setTest] = useState('test5')
    const [filtered, setFilter] = useState(null)
    function show() {
        if (selected[0]) {
            setOpen("visible")

        }
        else {
            user.setError("vous devez selectionner une entreprise à notifier")
        }
    }


    function filtre(e) {
        console.log(e.target.value)
        setFilter(list.filter(el => el.firm_name.includes(e.target.value)))
    }

    useEffect(() => {

        axios.get(process.env.REACT_APP_BACK + "/users/users", { withCredentials: true }).then((r) => {

            setList(r.data)
            setFilter(r.data)
        }).catch((er) => {

            console.log(er)

        })




    }, [])


    useEffect(() => {


        if (list) {

            console.log(list)


        }

    }, [])





    return (
        <>

            <input type="text" onChange={filtre} />

            <br></br>
            <br></br>

            <div style={{ maxWidth: "500px", margin: "auto" }}>
                {filtered !== null &&

                    filtered.map((el, index) => {

                        return <div className="card bg-red" key={index} style={{ marginBottom: "15px", padding: "15px" }}>
                            <div key={index} style={{ display: "flex", justifyContent: "space-between", marginBottom: '15px', alignItems: "center" }}>
                                <p className="text-primary">{el.firm_name}</p>

                                <div key={index} className="form-check form-switch">

                                    {el.has_mail &&

                                        <p className="text-danger" >
                                            Courrier en attente
                                        </p>
                                    }
                                    {el.has_mail === false &&
                                        <input onChange={(e) => {

                                            console.log(e.target.checked)


                                            if (e.target.checked === true) {
                                                setSelected([
                                                    ...selected,
                                                    el
                                                ])
                                                console.log(selected)

                                            }
                                            else {
                                                setSelected(
                                                    selected.filter((a) => {
                                                        if (a._id === el._id) {
                                                            return el
                                                        }
                                                    })
                                                )
                                                console.log(selected)

                                            }

                                        }} style={{ height: "39px", width: "74px" }} className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                    }
                                </div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div style={{ textAlign: "left" }}>
                                    <p className="text-primary">  {el.first_name} {el.last_name}</p>

                                    <p className="text-primary">{el.phone_number}</p>
                                </div>

                                <div>
                                    <ion-icon className="text-primary" onClick={() => { navigate(`/admin/modifier/${el.firm_name}`) }} style={{ fontSize: "35px", marginRight: "15px" }} name="create-outline"></ion-icon>
                                </div>

                            </div>

                        </div>
                    })
                }

                {list === null &&

                    <p>aucune entreprise</p>
                }

            </div>
            <div></div>

            <ModalAdmin selected={selected} open={setOpen} setList={setFilter} visible={open}   ></ModalAdmin>
            <div className="bg-primary" style={{ position: "fixed", width: "100%", bottom: "0", padding: "15px" }}>
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <ion-icon style={{ fontSize: '50px', color: "white" }} onClick={() => { navigate("/ajouter") }} name="add-circle"></ion-icon>
                    <ion-icon style={{ fontSize: '50px', color: "white" }} id="buttonsendmail" onClick={() => { show() }} name="send"></ion-icon>

                </div>

            </div>


        </>
    )
}