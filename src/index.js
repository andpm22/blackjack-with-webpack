import {saludar} from './js/funciones.js'
import './styles.css';
const nombre = 'Jugador!!!';
saludar(nombre);

const modulo = (() => {
    'use strict'
    //Referencias HTML
    const btnIniciar = document.querySelector('.btn-iniciar'),
          btnPedir = document.querySelector('.btn-pedir'),
          btnDetener = document.querySelector('.btn-detener')
          
    const divCartasJugadores = document.querySelectorAll('.divCartas'), 
          domPuntosSmalls = document.querySelectorAll('small')

    //Referencias JS
    let deck = [];
    const tipos = ['C','D','H','S'], 
          especiales = ['A','J','Q','K'];
    let puntosJugadores = [];

    // Funcion que inicia el juego:
    const primerPaso = () =>{
        btnDetener.disabled = true;
        btnPedir.disabled = true;
    }
    primerPaso();
    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();
        puntosJugadores =[];
        for(let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }
        domPuntosSmalls.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = '');
        btnDetener.disabled = false;
        btnPedir.disabled = false;
    }   

    //Aca lo que hago es recorrer dos arreglos, para asi luego concatenar los dos arreglos en el arreglo deck
    const crearDeck = () => {
        deck = [];
        for(let i = 2; i <= 10; i++){
            for(let tipo of tipos)  {
                deck.push(i + tipo);
            }  
        } 

        for(let tipo of tipos){
                for(let especial of especiales){
                    deck.push(especial + tipo);
                }  
            } 
    //Aqui con la libreria de underscore hago que mi arreglo sea aleatorio, metodo shuffle me ayuda con esta peticion

        return _.shuffle(deck);
    }


    //Funcion que me permite tomar una carta
    const pedirCarta = () => {
        if (deck.length === 0) {
            alert('No hay cartas disponibles en el deck');
        }
        return deck.pop()
    }

    //Aqui lo que hago es darle el valor a la carta
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)   ? 
                (valor === 'A') ? 11 : 10 
                : valor * 1);

    }
    // 0 Primer Jugar - ultimo = computadora
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        domPuntosSmalls[turno].innerText = puntosJugadores[turno]
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {
        //Creo la carta
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/img/${carta}.png`
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
    }

    const determinarGanador = () => {
        const [puntosJugador, puntosComputadora] = puntosJugadores;
        setTimeout(() => {
            if( puntosComputadora === puntosJugador ) {
                alert('Empate!!!');
            } else if ( puntosJugador > 21 ) {
                alert('Computadora gana')
            } else if( puntosComputadora > 21 ) {
                alert('Jugador Gana');
            } else {
                alert('Computadora Gana')
            }
        }, 100 );
    }

    //Turno de la Computadora
    const turnoComputadora = (puntosJugador) => {
        let puntosComputadora = 0;
        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1)
            crearCarta(carta, puntosJugadores.length - 1)
        } while ((puntosComputadora < puntosJugador) && (puntosJugador <= 21));
        determinarGanador();
    }

    //Eventos
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta(), puntosJugador = acumularPuntos(carta, 0);
        crearCarta(carta, 0);

        if (puntosJugador > 21){
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);

        } else if (puntosJugador === 21){
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }

    });

    btnDetener.addEventListener('click', () => {
        setTimeout(() => { 
            if(domPuntosSmalls[0].innerText === 0){
                alert('Almenos tienes que tener una carta en juego para detenerte');
            } else {
                btnPedir.disabled = true;
                btnDetener.disabled = true;
                turnoComputadora(puntosJugadores[0])
            }
        });    
        } , 100);

    btnIniciar.addEventListener('click', () => {
        inicializarJuego();

    });


})();



