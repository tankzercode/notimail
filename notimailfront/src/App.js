import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Acceuil from './page/acceuil';
import Navbar from './component/NavBar';
import { useContext, useEffect, useState } from 'react';
import UserContext from './service/UserContext';
import AjouterEntreprise from './page/AjouterEntreprise';
import Admin from './page/admin';
import axios from 'axios';
import Entreprise from './page/Entreprise';
import ModifierEntreprise from './page/ModifierEntreprise';
import AuthMiddleware from './service/authMiddleware';
import AdminMiddleware from './service/AdminMiddleware';
function App() {

  const [user, setUser] = useState(null)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    console.log(user)
    axios.get(process.env.REACT_APP_BACK + "/users/isAuth", { withCredentials: true }).then((r) => {
      console.log(r)
      setUser(r.data)
      setSuccess("vous etes connecté")

    }).catch((er) => {

    })


  }, [])

  return (

    <UserContext.Provider value={{ user, setUser, success, setSuccess, error, setError }} >

      <div className="App">

        { user &&
          <Navbar></Navbar>
        }

        {success &&
          <div className='btn btn-success' style={{ left: "10px", top: "170px", position: "absolute", zIndex: "9999" }} onClick={() => { setSuccess(null) }}> {success} <ion-icon style={{color:"white"}} name="close"></ion-icon> </div>
        }

        {error &&
          <div className='btn btn-danger' style={{ left: "10px", top: "170px", position: "absolute", zIndex: "9999" }} onClick={() => { setError(null) }}> {error} <ion-icon style={{color:"white"}} name="close"></ion-icon> </div>
        }
        <Routes>
          <Route path="/" element={<Acceuil />}></Route>


          <Route element={<AuthMiddleware />}>

            {/* admin */}

            <Route element={<AdminMiddleware></AdminMiddleware>}>
              <Route path="/ajouter" element={<AjouterEntreprise />}></Route>
              <Route path="/admin" element={<Admin />}></Route>
              <Route path="/admin/modifier/:param" element={<ModifierEntreprise />}></Route>
            </Route>

            {/* user */}

            <Route path="/entreprise" element={<Entreprise />}></Route>
          </Route>
        </Routes>
      </div>
    </UserContext.Provider>

  );
}

export default App;
