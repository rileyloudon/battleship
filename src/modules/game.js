import playerFactory from '../factories/player';
import gameboardFactory from '../factories/gameboard';
import placeHumanShips from './place-ships';
import {
  activeGameDOM,
  renderP1Map,
  renderP2Map,
  playerTurnIndicator,
  victory,
} from './active-game-dom';

const setupP1 = (player1, player2) => {
  const player1Gameboard = gameboardFactory();

  if (player1 === 'Player 1') {
    placeHumanShips(player1Gameboard, player1, player2);

    document.getElementById('save').addEventListener('click', () => {
      try {
        if (player1Gameboard.gameboardShips.length === 5)
          setupP2(player1, player2, player1Gameboard);
        else throw new Error('Make sure to place all your ships.');
      } catch (err) {
        document.querySelector('.error').innerHTML = err.message;
        document.querySelector('.error').style.visibility = 'visible';
      }
    });
  } else {
    player1Gameboard.randomPlaceShip('Carrier', 5);
    player1Gameboard.randomPlaceShip('Battleship', 4);
    player1Gameboard.randomPlaceShip('Cruiser', 3);
    player1Gameboard.randomPlaceShip('Submarine', 3);
    player1Gameboard.randomPlaceShip('Destroyer', 2);

    setupP2(player1, player2, player1Gameboard);
  }
};

const setupP2 = (player1, player2, player1Gameboard) => {
  const player2Gameboard = gameboardFactory();

  if (player2 === 'Player 2') {
    placeHumanShips(player2Gameboard, player2, player1);

    document.getElementById('save').addEventListener('click', () => {
      try {
        if (player2Gameboard.gameboardShips.length === 5)
          startGame(player1, player2, player1Gameboard, player2Gameboard);
        else throw new Error('Make sure to place all your ships.');
      } catch (err) {
        document.querySelector('.error').innerHTML = err.message;
        document.querySelector('.error').style.visibility = 'visible';
      }
    });
  } else {
    player2Gameboard.randomPlaceShip('Carrier', 5);
    player2Gameboard.randomPlaceShip('Battleship', 4);
    player2Gameboard.randomPlaceShip('Cruiser', 3);
    player2Gameboard.randomPlaceShip('Submarine', 3);
    player2Gameboard.randomPlaceShip('Destroyer', 2);

    startGame(player1, player2, player1Gameboard, player2Gameboard);
  }
};

const startGame = (player1, player2, player1Gameboard, player2Gameboard) => {
  console.log(player1Gameboard.board.row);
  console.log(player2Gameboard.board.row);

  const P1 = playerFactory(player1, player2Gameboard);
  const P2 = playerFactory(player2, player1Gameboard);
  let playerTurn = P1;
  let gameover = false;

  activeGameDOM(player1Gameboard, player2Gameboard);

  const handleComputerAttack = (player) => {
    if (player === P1) {
      playerTurn = P1;
      setTimeout(() => {
        P1.attack();

        document.querySelector('.container-p1').innerHTML =
          renderP2Map(player2Gameboard);

        if (player2Gameboard.allShipsSunk) {
          gameover = true;
          victory('Player 1');
        } else {
          playerTurn = P2;

          document.querySelector('.indicator').innerHTML =
            playerTurnIndicator('Player 2');
          if (player2 === 'computer') handleComputerAttack(playerTurn);
        }
      }, 1000);
    } else {
      playerTurn = P2;
      setTimeout(() => {
        P2.attack();

        document.querySelector('.container-p2').innerHTML =
          renderP1Map(player1Gameboard);

        if (player1Gameboard.allShipsSunk) {
          gameover = true;
          victory('Player 2');
        } else {
          playerTurn = P1;
          document.querySelector('.indicator').innerHTML =
            playerTurnIndicator('Player 1');
          if (player1 === 'computer') handleComputerAttack(playerTurn);
        }
      }, 1000);
    }
  };

  document
    .querySelectorAll('.ocean')
    .forEach((square) =>
      square.addEventListener('click', (square) => handleAttack(square))
    );

  if (player1 === 'computer') handleComputerAttack(playerTurn);
  const handleAttack = (square) => {
    if (!gameover) {
      if (playerTurn === P1 && square.target.classList.contains('p2')) {
        const xy = square.target.id.split('');
        const x = parseInt(xy[0]);
        const y = parseInt(xy[1]);
        P1.attack(x, y);

        document.querySelector('.container-p1').innerHTML =
          renderP2Map(player2Gameboard);

        document
          .querySelectorAll('.ocean')
          .forEach((square) =>
            square.addEventListener('click', (square) => handleAttack(square))
          );

        if (player2Gameboard.allShipsSunk) {
          gameover = true;
          victory('Player 1');
        } else {
          document.querySelector('.indicator').innerHTML =
            playerTurnIndicator('Player 2');

          if (player2 === 'computer') handleComputerAttack(P2);
          else playerTurn = P2;
        }
      } else if (playerTurn === P2 && square.target.classList.contains('p1')) {
        const xy = square.target.id.split('');
        const x = parseInt(xy[0]);
        const y = parseInt(xy[1]);
        P2.attack(x, y);

        document.querySelector('.container-p2').innerHTML =
          renderP1Map(player1Gameboard);

        document
          .querySelectorAll('.ocean')
          .forEach((square) =>
            square.addEventListener('click', (square) => handleAttack(square))
          );

        if (player1Gameboard.allShipsSunk) {
          gameover = true;
          victory('Player 2');
        } else {
          if (player1 === 'computer') handleComputerAttack(P1);
          else playerTurn = P1;

          document.querySelector('.indicator').innerHTML =
            playerTurnIndicator('Player 1');
        }
      }
    }
  };
};

export default setupP1;
