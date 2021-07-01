const renderP1Map = (player1Gameboard) => {
  return Object.entries(player1Gameboard.board.row)
    .map((row, x) =>
      row[1]
        .map((square, y) => {
          if (square === 'miss')
            return `<div class='miss' id='${x.toString() + y.toString()}'></div>`;
          else if (square === 'hit')
            return `<div class='hit' id='${x.toString() + y.toString()}'></div>`;
          else
            return `<div class='p1 ocean' id='${
              x.toString() + y.toString()
            }'></div>`;
        })
        .join('')
    )
    .join('');
};

const renderP2Map = (player2Gameboard) => {
  return Object.entries(player2Gameboard.board.row)
    .map((row, x) =>
      row[1]
        .map((square, y) => {
          if (square === 'miss')
            return `<div class='miss' id='${x.toString() + y.toString()}'></div>`;
          else if (square === 'hit')
            return `<div class='hit' id='${x.toString() + y.toString()}'></div>`;
          else
            return `<div class='p2 ocean' id='${
              x.toString() + y.toString()
            }'></div>`;
        })
        .join('')
    )
    .join('');
};

const playerTurnIndicator = (playerTurn) => {
  return `<h4>${playerTurn}'s Turn</h4>`;
};

const victory = (player) => {
  document.querySelector('.indicator').innerHTML = `
  <h4>${player} Wins!</h4>`;
};

const activeGameDOM = (player1Gameboard, player2Gameboard) => {
  document.getElementById('app').innerHTML = `      
    <h2>Battleship</h2>
    <div class='indicator'>
      ${playerTurnIndicator('Player 1')}
    </div>
    <div class='battle'>
      <div class='player-1'>
        <h4>Player 1</h4>
        <div class='container-p1'>
          ${renderP2Map(player2Gameboard)}
        </div>
        </div>
        <div class='player-2'>
        <h4>Player 2</h4>
        <div class='container-p2'>
          ${renderP1Map(player1Gameboard)}
        </div>
      </div>
    </div>
  `;
};

export { activeGameDOM, renderP1Map, renderP2Map, playerTurnIndicator, victory };
