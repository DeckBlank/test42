import React from "react"
import { useParams } from "react-router-dom";
const Error = () => {
  const { tipo } = useParams();
  let href = ''
  switch (tipo) {
    case 'inicio':
      href = '/login'
      break;
    case 'registro':
      href = '/register'
      break;
  }
  return (
    //Fragment
      <>
        {/* Mensaje cuando llegue a página incorrecta */}
        <p>Tuviste un error{href? <span>en el {tipo}, regresar al <a href={href}>{tipo}</a> </span> :''}.</p>
      </>
    )
}
export default Error