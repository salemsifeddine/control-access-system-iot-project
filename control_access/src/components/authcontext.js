/* eslint-disable no-unreachable */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/first */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import { createContext, useState,useEffect } from "react";
import jwt_decode from 'jwt-decode'
const Authcontext = createContext()
import {useNavigate } from 'react-router-dom'
import swal from 'sweetalert'

export default Authcontext;


export const Authprovider=({children})=>{
   



    var status=100
    const [AuthToken,setAuthToken] = useState(()=>{
        localStorage.getItem('AuthToken')? JSON.parse(localStorage.getItem('AuthToken')) : null
    
    } )
        const [user,setUser] =  useState(()=>{
            localStorage.getItem('AuthToken')? jwt_decode(localStorage.getItem('AuthToken')) : null
        }
        )
    let history = useNavigate();
  
    async function loginuser(e) {
        e.preventDefault();

        let response = fetch("http://127.0.0.1:8000/api/token/",
            {
                method: 'POST',
                headers: {
                    'Content-type': "application/json"
                },
                body: JSON.stringify({ 'username': e.target.username.value, 'password': e.target.password.value })
            }
        ).then(response => {
            
            status = response.status
            return response.json();
            }

        
        ).then((data) => {

            if (status === 200) {

                setAuthToken(data);
                setUser(jwt_decode(data.access));
                
                localStorage.setItem("AuthToken", JSON.stringify(data));
                history('/home');
            } else {
                logout();
            }

        });



    }

    let logout =()=>{
        localStorage.removeItem("AuthToken");
        setAuthToken(null);
        setUser(null);
        history('/login')
    }

    let updateToken = async ()=>{
        let response = fetch("http://127.0.0.1:8000/api/token/refresh",
        {
            method: 'POST',
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify({ 'refresh':AuthToken.refresh })
        }
    ).then(response => response.json()).then((data) => {


        if (data) {

            setAuthToken(data);
            setUser(jwt_decode(data.access));
            
            localStorage.setItem("AuthToken", JSON.stringify(data));
            history('/home');
        } else {
            logout()
        }

    });
    }


    let contextData = {
        
        loginuser : loginuser,
        user:user,
        logout:logout
    }



    return (
        <Authcontext.Provider value={contextData}>
            {children}
        </Authcontext.Provider>
        )

}