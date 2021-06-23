import gameboardFactory from '../factories/gameboard';
import game from '../modules/game';

const initialLoad = () => {
  const app = document.getElementById('app');
  app.innerHTML = `
    <h2>Battleship</h2>
    <p>Who's playing?</p>
    
    <p>Player 1</p>
    <label class=''> 
      <input type='radio' name='player1' value='human' checked>
      <span>&#xE7FD</span>
    </label>
    <label class='material-icons'> 
      <input type='radio' name='player1' value='computer'>
      <span>&#xe30a</span>
    </label>

    <p>Player 2</p>
    <label class='material-icons'>
      <input type='radio' name='player2' value='human' >
      <span>&#xE7FD</span>
    </label>
     <label class='material-icons'>
      <input type='radio' name='player2' value='computer' checked>
      <span>&#xe30a</span>
    </label>

    <br />

    <button id='start-game'>Start Game</button>
  `;

  document.getElementById('start-game').addEventListener('click', () => {
    const player1 =
      document.querySelector('input[name=player1]:checked').value === 'human'
        ? 'Player 1'
        : 'computer';

    const player2 =
      document.querySelector('input[name=player2]:checked').value === 'human'
        ? 'Player 2'
        : 'computer';
    game(player1, player2);
  });
};

export default initialLoad;
