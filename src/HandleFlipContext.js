import React, {useState, createContext} from "react";
import game from "./game/logic";

export const HandleFlipContext = createContext();

export function HandleFlipProvider(props){

    const [gameOver, setGameOver] = useState(false);
    const [cards, setCards] = useState([]);

    function handleFlip(card){

        game.flipCard(card.id, () => {
            setGameOver(true)
        }, () => {
            setCards([...game.cards]);
        });

        setCards([...game.cards]);
    };

    return(
        <HandleFlipContext.Provider value={[cards, setCards], [gameOver, setGameOver], handleFlip}>
            {props.children}
        </HandleFlipContext.Provider>
    )

};

//eu estava tentando adicionar o context api para em vez de passar de pai para filho o handleflip, eu uso de forma global.