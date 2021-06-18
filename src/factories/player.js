const playerFactory = (playerType, gameboard) => {
  const randomSquare = () => {
    return Math.floor(Math.random() * (9 + 1));
  };

  return playerType === 'computer'
    ? {
        playerName: 'Computer',

        attack() {
          gameboard.recieveAttack(randomSquare(), randomSquare());
        },
      }
    : {
        playerName: 'You',

        attack(x, y) {
          gameboard.recieveAttack(x, y);
        },
      };
};

export default playerFactory;
