import React, { useState, useEffect } from 'react';

export const TrafficLight = () => {

    // Estados:

    // Estado para controlar el color de los círculos
    const [circleColor, setCircleColor] = useState({
        red: 'rounded-circle p-4 m-2 bg-secondary',
        yellow: 'rounded-circle p-4 m-2 bg-secondary',
        green: 'rounded-circle p-4 m-2 bg-secondary',
        purple: 'rounded-circle p-4 m-2 bg-secondary'
    });
    const [timerClickStatus, setTimerClickStatus] = useState(false);
    const [purpleDivVisible, setPurpleDivVisible] = useState(false);

    //-----------
    // Funciones:

    // Función para manejar el clic en los círculos
    const circleClick = (color) => {
        setCircleColor(() => ({
            red: color === 'red' ? 'rounded-circle p-4 m-2 bg-danger lightOnRed' : 'rounded-circle p-4 m-2 bg-secondary',
            yellow: color === 'yellow' ? 'rounded-circle p-4 m-2 bg-warning lightOnYellow' : 'rounded-circle p-4 m-2 bg-secondary',
            green: color === 'green' ? 'rounded-circle p-4 m-2 bg-success lightOnGreen' : 'rounded-circle p-4 m-2 bg-secondary',
            purple: color === 'purple' ? 'rounded-circle p-4 m-2 bg-purple lightOnPurple' : 'rounded-circle p-4 m-2 bg-secondary'
        }));
    };

    // Función para manejar el clic en el botón Morado
    const purpleClick = () => {
        setPurpleDivVisible(!purpleDivVisible);
        if (!purpleDivVisible) {
            circleClick('purple');
        }
    };

    // Función para manejar el clic en el botón Timer
    const timerClick = () => {
        setTimerClickStatus(!timerClickStatus);
    };

    //-----------

    // Temporizador

    useEffect(() => {
        let interval;
        if (timerClickStatus) {
            let i = 0;
            const timerColor = ['red', 'yellow', 'green'];
            circleClick(timerColor[i]);
            interval = setInterval(() => {
                i = (i + 1) % timerColor.length;
                circleClick(timerColor[i]);
            }, 10000);
        }

        return () => clearInterval(interval);

    }, [timerClickStatus]);

    //-------------

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-auto bg-dark text-white rounded-4 d-flex flex-column align-items-center p-3">
                    <div className={circleColor.red} onClick={() => circleClick('red')}></div>
                    <div className={circleColor.yellow} onClick={() => circleClick('yellow')}></div>
                    <div className={circleColor.green} onClick={() => circleClick('green')}></div>
                    {purpleDivVisible && <div className={circleColor.purple} onClick={() => circleClick('purple')}></div>}
                </div>
            </div>
            <div className="row justify-content-center mt-3">
                <div className="col-auto justify-content-center text-center">
                    <div className="col m-2">
                        <button className="btn btn-info" onClick={purpleClick}>Morado</button>
                    </div>
                    <div className="col">
                        <button className="btn btn-warning" onClick={timerClick}>{!timerClickStatus ? 'Encender temporizador' : 'Apagar temporizador'}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};