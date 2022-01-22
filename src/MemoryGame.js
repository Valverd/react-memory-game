import React, { useEffect, useState } from "react";
import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver";
import game from './game/logic';

function MemoryGame(){

    const [gameOver, setGameOver] = useState(false);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        setCards(game.createCards());
    }, []);

    function restart(){
        game.clearCards();
        setCards(game.createCards());
        setGameOver(false);
    };

    function handleFlip(card){
        game.flipCard(card.id, () => {
            setGameOver(true)
        }, () => {
            setCards([...game.cards]);
        });

        setCards([...game.cards]);
    }

    return(
        <div>
            <GameBoard handleFlip={handleFlip} cards={cards}></GameBoard>
            <GameOver show={gameOver} handleRestart={restart}></GameOver>
        </div>
    )

};

export default MemoryGame;