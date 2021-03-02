import React from 'react'

function Input({id,label,type,placeholder}){
    return(
        <div className="col-md-12">
            <label htmlFor={id} className="form-label">{label}</label>
            <input id={id} className="form-control" type={type} placeholder={placeholder} name={id}  />
        </div>
    )
}


export default Input