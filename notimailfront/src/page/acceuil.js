

import { useContext, useEffect, useState } from 'react'
import Logo from '../component/Logo'
import axios from 'axios'
import UserContext from '../service/UserContext'
import { useFetcher, useNavigate } from 'react-router-dom'


export default function Acceuil(props) {

    const user = useContext(UserContext)
    const navigate = useNavigate()
    const [list, setList] = useState()
    const [firm_name, setfirm_name] = useState(null)
    const [code, setCode] = useState(null)

    useEffect(() => {
        axios.get(process.env.REACT_APP_BACK + '/users/all').then((e) => {
            setList(e.data)
        }).catch((er) => {
            console.log(er);
        })

    }, [])



    function send() {

        console.log(code)
        axios.post(process.env.REACT_APP_BACK + "/users/login", { firm_name, code }, { withCredentials: true }).then((r) => {

            console.log(r)
            user.setUser(r.data.user)
            user.setSuccess("Vous etes connecté")

            if (r.data.user.is_admin === true) {
                navigate("/admin")
            } else {

                navigate("/entreprise")


            }


        }).catch((er) => {

            console.log(er)

            user.setError("Password / pseudo invalide")
        })
    }

    return (<>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "80vh", minHeight: "500px" }}>
            <div>
                <Logo width="400" height="400"></Logo>
                <br></br>
                <br></br>
                <div style={{ maxWidth: "400px", margin: "auto" }}>


                    <div className="input-group mb-3">


                        <select onClick={(e) => { setfirm_name(e.target.value) }} class="form-select" aria-label="Default select example">
                            <option selected>Sélectionner votre entreprise</option>
                            {list &&

                                <>
                                    {list.map((el) => {

                                        return (
                                            <option value={el.firm_name}>{el.firm_name}</option>
                                        )
                                    })}
                                </>
                            }
                        </select>

                    </div>
                    <div className="input-group mb-3">
                        <input type="password" onChange={(e) => setCode(e.target.value)} className="form-control" placeholder="code" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    <button onClick={() => {
                        send()
                    }} className='btn btn-primary' > se connecter</button>

                </div>
            </div>
        </div>


    </>)
}