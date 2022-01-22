import React from 'react';
import CardElement from './CardElement';

export default function GameBoard(props) {
    return (
        <div id="board">
            {props.cards.map((card, i) => {
                return (
                <CardElement handleFlip={props.handleFlip} key={i} card={card}></CardElement>
                )
            })}
        </div>
    );
};
