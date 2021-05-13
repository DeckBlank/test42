process.on('message',msj=>{
    console.log(msj);
    let ramdomsNumbers = [];
    for (let index = 0; index < msj; index++) {
        ramdomsNumbers.push(Math.floor(Math.random() * (1000 - 1) ) + 1000);
    }
    process.send(ramdomsNumbers)
})
    