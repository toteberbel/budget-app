import React, { useState } from 'react';
import Error from './Error';
import shortid from 'shortid';
import PropTypes from "prop-types";


const Formulario = ({guardarGasto, guardarCrearGasto}) => {

    const [nombre, guardarNombre] = useState("");
    const [cantidad, guardarCantidad] = useState(0);
    const [error, guardarError] = useState(false);

    //Cuando el usuario agrega un gasto
    const agregarGasto = e => {
        e.preventDefault();

        //Validar
        if (nombre.trim() === "" || cantidad < 1 || isNaN(cantidad)) {
            guardarError(true);
            return;
        }

        guardarError(false);

        //Construir el objeto del gasto (nombre y monto)
        const gasto = {
            nombre: nombre,
            cantidad: cantidad,
            id: shortid.generate()
            // cuando la llave y el valor son iguales tambien podemos hacerlo asi =>
            // nombre,
            // cantidad,
        };
        //Pasar el gasto al componente principal
        guardarGasto(gasto);
        guardarCrearGasto(true)

        //Reseteamos el fomr
        guardarNombre("");
        guardarCantidad(0);
    }

    return (
        <form
        onSubmit={agregarGasto}
        >
            <h2>Agregá tus gastos aquí</h2>
            {error
                ? <Error
                mensaje="Ambos campos son obligatorios "
                />
                : null
            }
            <div className="campo">
                <label>Nombre del gasto: </label>
                <input
                    type="text"
                    className="u-full-width"
                    placeholder="Ej transporte"
                    value={nombre}
                    onChange={e => guardarNombre(e.target.value)}
                />
            </div>

             <div className="campo">
                <label>Monto: </label>
                <input
                    type="number"
                    className="u-full-width"
                    placeholder="Ej 400"
                    value={cantidad}
                    onChange = {
                        e => guardarCantidad(parseInt(e.target.value, 10))
                    }

                />
            </div>

            <input
                type="submit"
                className="button-primary u-full-width"
                value="Agregar Gasto"
                // onClick={agregarNuevoGasto}
            />
            </form>

     );
}
Formulario.propTypes = {
    guardarGasto: PropTypes.func.isRequired,
    guardarCrearGasto: PropTypes.func.isRequired
    }
export default Formulario;