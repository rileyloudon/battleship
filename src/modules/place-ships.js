const placeHumanShips = (currentGameboard, currentPlayer, opponent) => {
  const renderMap = () => {
    return Object.entries(currentGameboard.board.row)
      .map((row, x) =>
        row[1]
          .map((square, y) =>
            square === 'empty'
              ? `<div class='ocean' id='${x.toString() + y.toString()}'></div>`
              : `<div class='occupied' id='${x.toString() + y.toString()}'></div>`
          )
          .join('')
      )
      .join('');
  };

  const app = document.getElementById('app');
  app.innerHTML = `
      <h2>Battleship</h2>
      <h4>${currentPlayer} - Place Your Ships</h4>
      ${
        opponent === 'Player 1' || opponent === 'Player 2'
          ? `<p>(Don't let ${opponent} see!)</p>`
          : ``
      }
      <div class='ships'>
        <label>
          <input type='radio' name='ship' value='Carrier'>
          <span class='text ship'>Carrier (5 Spots)</span>
        </label>
        <label>
          <input type='radio' name='ship' value='Battleship'>
          <span class='text ship'>Battleship (4 Spots)</span>
        </label>        
        <label>
          <input type='radio' name='ship' value='Cruiser' checked>
          <span class='text ship'>Cruiser (3 Spots)</span>
        </label>        
        <label>
          <input type='radio' name='ship' value='Submarine'>
          <span class='text ship'>Submarine (3 Spots)</span>
        </label>        
        <label>
          <input type='radio' name='ship' value='Destroyer'>
          <span class='text ship'>Destroyer (2 Spots)</span>
        </label>
      </div>
      <div class='ship-orientation'>
        <label>
          <input type='radio' name='orientation' value='horizontal' checked>
          <span class='text'>Horizontal</span>
        </label>
        <label>
          <input type='radio' name='orientation' value='vertical'>
          <span class='text'>Vertical</span>
        </label>
      </div>
      <p class='error'>Error</p>
      <div class='container'>
        ${renderMap()}
      </div>
      <button id='save'>Save Ships</button>
    `;

  document
    .querySelectorAll('.ocean')
    .forEach((square) =>
      square.addEventListener('click', (square) => handleClick(square))
    );

  const handleClick = (square) => {
    const selectedShip = document.querySelector('input[name=ship]:checked').value;

    const shipOrientation = document.querySelector(
      'input[name=orientation]:checked'
    ).value;

    const xy = square.target.id.split('');
    const startX = parseInt(xy[0]);
    const startY = parseInt(xy[1]);

    try {
      currentGameboard.placeShip(startX, startY, selectedShip, shipOrientation);
      document.querySelector('.error').style.visibility = 'hidden';
    } catch (err) {
      document.querySelector('.error').innerHTML = err.message;
      document.querySelector('.error').style.visibility = 'visible';
    }

    const container = document.querySelector('.container');
    container.innerHTML = renderMap();

    document
      .querySelectorAll('.ocean')
      .forEach((square) =>
        square.addEventListener('click', (square) => handleClick(square))
      );
  };
};

export default placeHumanShips;
