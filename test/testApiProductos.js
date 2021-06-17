const request = require('../resourcesTest/axiosRequest')
const chai = require('chai');
const expect = chai.expect;

describe('axios',()=>{
    let URL = 'http://localhost:8080/api/productos'
    let idCreated = null;
    ///Leemos los productos que ya existen en la db
    it('getProductos',async ()=>{
        let respuesta = await request({
            method: 'get',
            url: URL,
            headers: {},
            data : ''
        })
        console.log(respuesta);
        //evaluamos si nos retorna un objeto
        expect(typeof respuesta).equal("object");
    })
    //Agregamos un nuevo producto y guardamos su ID
    it('addProducto',async ()=>{
        let respuesta = await request({
            method: 'post',
            url: URL,
            headers: { 
              'Content-Type': 'application/json'
            },
            data : {
                title:"sdsd",
                price:12,
                tumbnails : "https://marketing4ecommerce.net/wp-content/uploads/2018/01/Depositphotos_3667865_m-2015-compressor.jpg"
             }
        })
        idCreated = respuesta.id
        console.log(respuesta);
        //evaluamos si nos retorna un objeto
        expect(typeof respuesta).equal("object");
    })
   /// Obtenemos el producto agregado con el ID guardado
    it('getProductoById',async ()=>{
        let respuesta = await request({
            method: 'get',
            url: `${URL}/${idCreated}`,
            headers: {},
            data : ''
        })
        console.log(respuesta);
        //evaluamos si nos retorna un objeto
        expect(typeof respuesta).equal("object");
    })
    /// Actualizamos el producto agregado
    it('updateProductoById',async ()=>{
        let respuesta = await request({
            method: 'put',
            url: `${URL}/${idCreated}`,
            headers: { 
              'Content-Type': 'application/json'
            },
            data : {
                id:3,
                title:"nuevo",
                tumbnails:"https://marketing4ecommerce.net/wp-content/uploads/2018/01/Depositphotos_3667865_m-2015-compressor.jpg",
                price:14444
              }
        })
        console.log(respuesta);
        //evaluamos si nos retorna un objeto
        expect(typeof respuesta).equal("object");
    })
    /// Eliminamos el producto agregado
    it('deleteById',async ()=>{
        let respuesta = await request({
            method: 'delete',
            url: `${URL}/${idCreated}`,
            headers: {},
            data : ''
        })
        console.log(respuesta);
        //evaluamos si nos retorna un objeto
        expect(typeof respuesta).equal("object");
    })
})