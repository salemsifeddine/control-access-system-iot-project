/* eslint-disable no-unreachable */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/first */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import { createContext,useContext, useState,useEffect } from "react";
import jwt_decode from 'jwt-decode'
const Authcontext = createContext()
import {useNavigate } from 'react-router-dom'
import $ from 'jquery';

export default Authcontext;


export const Authprovider=({children})=>{
   



    var status=100
   
    let history = useNavigate();
  
    async function adduser(e) {
        e.preventDefault();

        let response = fetch("http://127.0.0.1:8000/edit",
            {
                method: 'POST',
                headers: {
                    'Content-type': "application/json"
                },
                body: JSON.stringify({ 
                'fullname': e.target.fullname.value, 
                "user_id":e.target.user_id.value, 
                "user_phone":e.target.user_phone.value, 
                "subscription_delay":e.target.user_subscription_delay.value, 
                "access_code":e.target.user_access_code.value, 
                 
                })
            }
        ).then(response => response.json()).then((data) => {

                console.log(data)
            if (status === 200) {

                console.log(data)
               
            } else {
                console.log("response bad!")
            }

        });



    }

    const test = (e)=>{
        e.preventDefault();
        console.log("ss")

    }



    let contextData = {
        adduser : adduser,
        test:test
        
    }



    return (
        <Authcontext.Provider value={contextData}>
            {children}
        </Authcontext.Provider>
        )
}