//aqui iniciamos o game com a lógica, trazendo a orientação a objetos.
//fizemos todas as funções das cartas que serão adicionadas. la no outro script estão as criações dos elementos.
//sempre que o objeto foi criado, usamos o this como referência dele mesmo
//ex: o cards está dentro do objeto game tbm, assim como todas outras funções dentro dele, usamos o this para representá-las dentro do próprio objeto.


let game = {

    lockMode: false,
    firstCard: null,
    secondCard: null,


    setCard: function (id) {

        let card = this.cards.filter(card => card.id === id)[0];
        console.log(card)

        if (card.flipped || this.lockMode) {
            return false;
        }

        if (!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        } else {
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }

    },



    checkMatch: function () {

        if (!this.firstCard || !this.secondCard) {
            return false;
        }

        return this.firstCard.icon === this.secondCard.icon
    },



    clearCards: function () {
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },



    unflipCards: function () {
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },



    checkGameOver: function () {
        return this.cards.filter(card => !card.flipped).length === 0;
    },



    techs: [
        'bootstrap',
        'css',
        'electron',
        'firebase',
        'html',
        'javascript',
        'jquery',
        'mongo',
        'node',
        'react'
    ],

    cards: null,



    createCards: function () {

        this.cards = [];

        this.techs.forEach((tech) => {
            this.cards.push(this.createPair(tech));
        })

        this.cards = this.cards.flatMap(pair => pair);
        //em map, quando coloco pair=>pair, eu só estou passando como parâmetro cada elemento desse array.
        //então quando eu uso flatMap, eu desmembro o array dentro do array, sendo pair=>pair, será cada elemento do array dividido 
        this.shuffleCards();
        return this.cards;
    },



    createPair: function (tech) {

        return [
            {
                id: this.createId(tech),
                icon: tech,
                flipped: false,
            },

            {
                id: this.createId(tech),
                icon: tech,
                flipped: false,
            }
        ]
    },



    createId: function (tech) {
        return tech + parseInt(Math.random() * 1000);
    },



    shuffleCards: function () {
        let currentIndex = this.cards.length;
        let randomIndex = 0;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];
            //aqui está trocando a posição das cartas, começando pela última até chegar na primeira. com o -- eu nunca pego a carta repetida.
            /*ex: [cards[10], cards[19]] = [cards[19], cards[10]]
                  [cards[7], cards[18]] = [cards[18], cards[7]]
                  [cards[15], cards[17]] = [cards[17], cards[15]]
            */
        }

    },

    flipCard: function(cardID, gameOverCallback, noMatchCallback){
        if (this.setCard(cardID)) {
            if (this.secondCard) {
                if (this.checkMatch()) {
                    this.clearCards();
                    if(this.checkGameOver()){
                        gameOverCallback();
                    }
                } else {
                    setTimeout(() => {
                        //no match
                        this.unflipCards();
                        noMatchCallback();
                    }, 1000)
                }
            }
        }

    }
}

export default game;