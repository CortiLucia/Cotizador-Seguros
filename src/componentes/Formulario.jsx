import { useState } from "react";
import { Link } from "react-router-dom";

let propiedades = [];
let ubicaciones = [];

async function cargarDatos() {
  try {
    const response = await fetch("https://654691f2fe036a2fa955d926.mockapi.io/propiedades");
    propiedades = await response.json();
  } catch (error) {
    console.error(error);
  }
  try {
    const response = await fetch("https://654691f2fe036a2fa955d926.mockapi.io/ubicaciones");
    ubicaciones = await response.json();
  } catch (error) {}
}

await cargarDatos();

const Formulario = () => {
  const [metrosCuadrados, setMetrosCuadrados] = useState("");
  const [propiedad, setPropiedad] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [resultado, setResultado] = useState(0);

  function CotizarSeguro(ev) {
    ev.preventDefault();
    const valorMetroCuadrado = 42.69;
    const prop = propiedades.find((p) => p.value == propiedad);
    const ubic = ubicaciones.find((u) => u.value == ubicacion);
    let resultado =
      valorMetroCuadrado * prop.factor * ubic.factor * metrosCuadrados;
    setResultado(resultado);
  }

  const guardarCotizacion = () => {
    const cotizacionesAnteriores =
      JSON.parse(localStorage.getItem("cotizaciones")) || [];
    const cotizacionActual = {
      metrosCuadrados: metrosCuadrados,
      propiedad: propiedad,
      ubicacion: ubicacion,
      resultado: resultado,
      fechaCotizacion: new Date().toLocaleString(),
    };
    cotizacionesAnteriores.push(cotizacionActual);
    localStorage.setItem(
      "cotizaciones",
      JSON.stringify(cotizacionesAnteriores)
    );
  };

  return (
    <form action="" onSubmit={CotizarSeguro}>
      <h1>Completa los datos solicitados</h1>
      <div className="columns">
        <div>
          <label>Tipo de Propiedad</label>
          <select
            onChange={(ev) => setPropiedad(ev.target.value)}
            value={propiedad}
            required
          >
            <option key="-1" value="0">...</option>
            {propiedades.map((propiedad, index) => (
              <option key={index} value={propiedad.value}>
                {propiedad.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Ubicacion</label>
          <select
            onChange={(ev) => setUbicacion(ev.target.value)}
            value={ubicacion}
            required
          >
            <option key="-1" value="0">...</option>
            {ubicaciones.map((ubicacion, index) => (
              <option key={index} value={ubicacion.value}>
                {ubicacion.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Metros Cuadrados</label>
          <input
            type="number"
            id="metros2"
            onChange={(ev) => setMetrosCuadrados(ev.target.value)}
            value={metrosCuadrados}
            required
          />
        </div>
        <div>
          <button type="submit" className="button button-cotizar">
            Cotizar
          </button>
        </div>
        <div>
          <p className="resultado">
            Precio estimado: ${" "}
            <span id="valorPoliza">{resultado.toFixed(2)}</span>
          </p>
          <div className="buttons">
            <div>
              <button
                type="button"
                onClick={guardarCotizacion}
                className="button button-guardar"
              >
                Guardar Cotizacion💾
              </button>
            </div>
            <div>
              <Link to="/cotizacion/historial">
                <button className="button button-historial">Historial📋</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Formulario;
