import express from 'express'

export const info = express.Router();

info.get('/',(req,res)=>{

    let data = {
        pid:process.pid
    }
    res.send(data)
})