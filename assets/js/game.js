(() => {
    'use strict'

    /**
 * 2c = Two of clubs
 * 2D = Two of Diaminds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

let   deck          = [];
const types         = ['C', 'D', 'H', 'S']
const specials      = ['A', 'J', 'Q', 'K']
const pedirButton   = document.querySelector('#getButton')
const nuevoButton   = document.querySelector('#newButton')
const detenerButton = document.querySelector('#stopButton')
const playerCard    = document.querySelector('#jugador-carta')
const computerCard  = document.querySelector('#computadora-carta')
let   poinPlayer    = 0;
let   poinComputer  = 0;
const small         = document.querySelectorAll('small');

const crearDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for(let type of types) {
          deck.push(i+type)
        }
    }

    for (let type of types) {
        for (let special of specials) {
            deck.push(special +type )
        }
    }

    deck = _.shuffle(deck) //funcion de la libreria underscore, desordena el arreglo


    return deck;
}
crearDeck()


const pedirCarta = () => {

    //validacion si las cartas llegan a cero
    if(deck.length === 0)
        throw 'No hay cartas en el deck';


    const carta = deck.pop(); //elimina el ultimo elemento del arreglo y lo regresa
    // console.log(deck)
    return carta;
}

const valorCarta = (carta) => {

    const valor = carta.substring(0, carta.length-1) //para cortar la ultima letra

    // let puntos = 0;
    // //validamos que el valor sea un número
    // if(isNaN(valor)){
    //     puntos = (valor === 'A') ? 11 : 10;
    // } else{
    //     puntos = valor*1 // para transformar un valor en string, podemo realizar la multiplicacion por 1
    // }

    return ( isNaN(valor) ) ?
            ( valor === 'A' ) ? 11:10
            :valor * 1;

}

const turnoComputadora = (puntosMinimos) => {

    do{
        const pedir      = pedirCarta();
        poinComputer = poinComputer + valorCarta(pedir)
        console.log(pedir)

        // if( poinPlayer > 21 ){
        //     throw 'perdiste el juego'
        // }

        small[1].innerHTML = `<b>${poinComputer} </b>`
        const newCard    = document.createElement('img');
        newCard.src = `./assets/imgs/${pedir}.png`
        computerCard.append(newCard)

        if(puntosMinimos>21)
            break;

    } while((poinComputer < puntosMinimos) && (puntosMinimos <= 21))

    setTimeout(() => {
        //finish
        if((poinComputer < puntosMinimos) && (puntosMinimos > 21)){
            alert('Computer Win!!');
        }else if((puntosMinimos === poinComputer)){
            alert('There is not winner!');
        } else {
            alert('You win!!');
        }
    }, 100);

}


// Eventos
pedirButton.addEventListener('click', () =>{

    //se crean los elementos dentro del evento por el motivo que se crea una imagen cada vez que se preiona click en el botón
    const pedir      = pedirCarta();
    poinPlayer = poinPlayer + valorCarta(pedir)

    // if( poinPlayer > 21 ){
    //     throw 'perdiste el juego'
    // }

    small[0].innerHTML = `<b>${poinPlayer} </b>`
    const newCard    = document.createElement('img');
    newCard.src = `./assets/imgs/${pedir}.png`
    playerCard.append(newCard)

    if(poinPlayer > 21){

        // we used two method for disable the buttons
        // pedirButton.setAttribute('disabled', 'disabled')
        pedirButton.disabled = true;
        turnoComputadora(poinPlayer)
        detenerButton.disabled = true;

        console.warn('you lost!!')
        // alert('you lost!!')

    } else if(poinPlayer === 21){
        pedirButton.disabled = true;
        pedirButton.disable = true
        console.warn('you win!!')
        // alert('You win!1');

    }

})

// nuevoButton.addEventListener('click', () =>{
//     console.log('this is a test two')
// })

detenerButton.addEventListener('click', () =>{

    detenerButton.disabled = true;
    pedirButton.disabled   = true;
    turnoComputadora(poinPlayer);

})

nuevoButton.addEventListener('click', () =>{

    console.clear()
    deck = [];
    poinComputer = 0;
    poinPlayer   = 0;
    deck         = crearDeck();
    pedirCarta.disabled = false;
    detenerButton.disabled = false;
    small[0].innerHTML = '<b> 0 </b>';
    small[1].innerHTML = '<b> 0 </b>';
    playerCard.innerHTML = '';
    computerCard.innerHTML = '';
    // window.location.reload();

})

})();