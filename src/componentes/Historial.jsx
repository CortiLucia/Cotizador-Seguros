import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Historial() {
  const [historialCotizaciones, setHistorialCotizaciones] = useState([]);

  useEffect(() => {
    const cargarHistorial = () => {
      const historialGuardado =
        JSON.parse(localStorage.getItem("cotizaciones")) || [];
      setHistorialCotizaciones(historialGuardado);
    };

    cargarHistorial();
  }, []);

  const handleEliminarCotizacion = (fechaCotizacion) => {
    const nuevoHistorial = historialCotizaciones.filter(
      (cotizacion) => cotizacion.fechaCotizacion !== fechaCotizacion
    );

    setHistorialCotizaciones(nuevoHistorial);

    localStorage.setItem("cotizaciones", JSON.stringify(nuevoHistorial));
  };

  const retornoTablaHTML = (fila) => {
    return (
      <tr key={fila.fechaCotizacion}>
        <td>{fila.fechaCotizacion}</td>
        <td>{fila.propiedad}</td>
        <td>{fila.ubicacion}</td>
        <td>{fila.metrosCuadrados}</td>
        <td>$ {fila.resultado.toFixed(2)}</td>
        <td>
        <button
          className="button button-eliminar"
          onClick={() => handleEliminarCotizacion(fila.fechaCotizacion)}
        >
          <i className="fa-regular fa-trash-can"></i>
        </button>
        </td>
      </tr>
    );
  };

  return (
    <>
      <div className="tabla">
        <h2>Historial de Cotizaciones</h2>
        {historialCotizaciones.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Fecha de cotización</th>
                <th>Propiedad</th>
                <th>Ubicación</th>
                <th>Metros cuadrados</th>
                <th>Póliza mensual</th>
              </tr>
            </thead>
            <tbody>
              {historialCotizaciones.map((fila) => retornoTablaHTML(fila))}
            </tbody>
          </table>
        ) : (
          <p>No hay cotizaciones en el historial.</p>
        )}
        <div className="volver">
          <Link to="/cotizacion">
            <button className="button-volver">
              <i className="fa-solid fa-arrow-left"></i> Volver
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Historial;