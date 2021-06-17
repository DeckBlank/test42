"use strict"
import axios from 'axios';

export const request = async ({url,method,data,headers}) =>{
    if(typeof data!="string") data = JSON.stringify(data);
    var config = {
        method,
        url,
        headers: headers?headers:{ 
          'Content-Type': 'application/json'
        },
        data
      };
    try {
        let respuesta = await axios(config)
        return respuesta.data
    } catch (error) {
        console.log(error);
        return null
    }
}


console.log(request({
    method: 'post',
    url: 'localhost:8080/auth/register',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : {
        "nombre": "josejose",
        "password": "josejose"
    }
}));

