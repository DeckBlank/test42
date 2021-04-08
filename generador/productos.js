
import faker from 'faker'

faker.locale = 'es'

export const getFakeProducts = (cant=10)=>{
    let respuesta = []

    for (let index = 0; index < cant; index++) {
        respuesta.push({
            id : faker.datatype.number(),
            title : faker.commerce.productName(),
            tumbnails : faker.internet.avatar(),
            price : faker.commerce.price(),
            stock : faker.datatype.number(),
        })
        
    }
    return respuesta;
}