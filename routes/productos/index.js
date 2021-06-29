import express from 'express'
/* import {Productos}  from '../../utils/productos' */
import {apiProductos}  from '../../persistencia/layersProductos/api'

import {getFakeProducts}  from '../../generador/productos'

export const productos = express.Router()

productos.get('/',async (req,res)=>{
    res.json(await apiProductos.getItems())
})
productos.get('/test',async (req,res)=>{
    let cant = req.query.cant
    res.json(getFakeProducts(cant))
})

productos.get('/:id',async (req,res)=>{
    let id = req.params.id
    res.json(await apiProductos.getItemsById(id))
})

productos.post('/',async (req,res,next)=>{
    let body = req.body
    res.json(await apiProductos.addItem(body))
    req.message = await apiProductos.getItems();
    next()
})

productos.put('/:id',async (req,res,next)=>{
    let body = req.body
    res.json(await apiProductos.putItemById(body));
    req.message = await apiProductos.getItems();
    next()
})

productos.delete('/:id',async (req,res,next)=>{
    let id = req.params.id
    res.json(await apiProductos.deleteItemById(id));
    req.message = await apiProductos.getItems();
    next()
})


