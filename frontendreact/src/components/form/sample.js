import React, { useEffect, useState } from "react";

function ShowWindowWidth() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // creamos una función para actualizar el estado con el clientWidth
    const updateWidth = () => {
      const width = document.body.clientWidth
      console.log(`updateWidth con ${width}`)
      setWidth(width)
    }
    // actualizaremos el width al montar el componente
    updateWidth()
    // nos suscribimos al evento resize de window
    window.addEventListener("resize", updateWidth)

    // devolvemos una función para anular la suscripción al evento
    return () => {
      window.removeEventListener("resize", updateWidth)
    }
  }, []) // este efecto se ejecuta sólo al montarse el componente

  return (
    <div>
      <span>Width es de {width}px</span>
    </div>
  )
}

export default ShowWindowWidth