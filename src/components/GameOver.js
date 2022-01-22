import React from "react";
import { Fragment } from "react/cjs/react.production.min";

export default function GameOver(props) {

    //fiz um if ternário pra caso true, retorne o game over

    return (
        props.show ?
            <div id="gameOver">
                <div>
                    Parabéns, você completou o jogo!
                </div>

                <p id="finalMovements"></p>


                <button id="restart" onClick={props.handleRestart}>Jogue Novamente</button>
            </div>
             : <Fragment></Fragment> //o fragment é uma div vazia que não serve pra nada.


    );
};