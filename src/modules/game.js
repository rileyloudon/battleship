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
        if (player1Gameboard.gameboardShips.length === 0)
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
        if (player2Gameboard.gameboardShips.length === 0)
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
  const P1 = playerFactory(player1, player2Gameboard);
  const P2 = playerFactory(player2, player1Gameboard);
  let playerTurn = P1;
  let gameover = false;

  activeGameDOM(player1Gameboard, player2Gameboard);

  const handleComputerAttack = (player) => {
    setTimeout(() => {
      const currentGameboard =
        playerTurn === P1 ? player2Gameboard : player1Gameboard;

      player.attack();

      playerTurn === P1
        ? (document.querySelector('.container-p1').innerHTML =
            renderP2Map(player2Gameboard))
        : (document.querySelector('.container-p2').innerHTML =
            renderP1Map(player1Gameboard));

      if (currentGameboard.allShipsSunk) {
        gameover = true;
        victory(playerTurn);
      } else {
        playerTurn = playerTurn === P1 ? P2 : P1;

        document.querySelector('.indicator').innerHTML =
          playerTurn === P1
            ? playerTurnIndicator('Player 1')
            : playerTurnIndicator('Player 2');

        if (playerTurn.name === 'Computer') handleComputerAttack(playerTurn);
      }
    }, 500);
  };

  if (playerTurn.name === 'Computer') handleComputerAttack(playerTurn);

  document
    .querySelectorAll('.ocean')
    .forEach((square) =>
      square.addEventListener('click', (square) => handleAttack(square))
    );

  const handleAttack = (square) => {
    if (!gameover) {
      const opponenetString = playerTurn === P1 ? 'p2' : 'p1';
      if (playerTurn && square.target.classList.contains(opponenetString)) {
        const currentGameboard =
          playerTurn === P1 ? player2Gameboard : player1Gameboard;

        const xy = square.target.id.split('');
        const x = parseInt(xy[0]);
        const y = parseInt(xy[1]);

        playerTurn.attack(x, y);

        playerTurn === P1
          ? (document.querySelector('.container-p1').innerHTML =
              renderP2Map(player2Gameboard))
          : (document.querySelector('.container-p2').innerHTML =
              renderP1Map(player1Gameboard));

        document
          .querySelectorAll('.ocean')
          .forEach((square) =>
            square.addEventListener('click', (square) => handleAttack(square))
          );

        if (currentGameboard.allShipsSunk) {
          gameover = true;
          victory(playerTurn);
        } else {
          playerTurn = playerTurn === P1 ? P2 : P1;

          document.querySelector('.indicator').innerHTML =
            playerTurn === P1
              ? playerTurnIndicator('Player 1')
              : playerTurnIndicator('Player 2');

          if (playerTurn.name === 'Computer') handleComputerAttack(playerTurn);
        }
      }
    }
  };
};

export default setupP1;
