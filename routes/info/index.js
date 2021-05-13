import express from 'express'

export const info = express.Router();

info.get('/',(req,res)=>{
    let data = `
    <div>
        <div><span><b>Argumentos de entrada: </b></span>${process.argv}</div>
        <div><span><b>Nombre de la plataforma: </b></span>${process.platform}</div>
        <div><span><b>Version de node: </b></span>${process.version}</div>
        <div><span><b>Uso Memoria: </b></span>${JSON.stringify(process.memoryUsage())}</div>
        <div><span><b>Path de ejecucion: </b></span>${process.argv[1]}</div>
        <div><span><b>Process id: </b></span>${process.pid}</div>
        <div><span><b>Carpeta: </b></span>${process.cwd()}</div>
    </div>
    `
    res.send(data)
})