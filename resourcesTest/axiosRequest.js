"use strict"
const axios = require('axios');

const request = async ({url,method,data,headers}) =>{
    if(typeof data!="string") data = JSON.stringify(data);
    if(method==='get'){
        headers = {}
    }else if(method==='post'){
        headers = {
            ...headers,
            'Content-Type': 'application/json'
        }
    }
    var config = {
        method,
        url,
        headers,
        data
      };
    try {
        let respuesta = await axios(config)
        return respuesta.data
    } catch (error) {
        console.log('error');
        return null
    }
}





module.exports = request;