const playerFactory = (playerType, gameboard) => {
  const availableAttacks = [...Array(100).keys()];

  return playerType === 'computer'
    ? {
        playerName: 'Computer',

        attack() {
          const randoomAttack = Math.floor(
            Math.random() * (availableAttacks.length - 1)
          );

          const selectedAttack = availableAttacks[randoomAttack]
            .toString()
            .split('');

          const attackX = selectedAttack[0];
          const attackY = selectedAttack[1];

          gameboard.recieveAttack(attackX, attackY);
          availableAttacks.splice(randoomAttack, 1);
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
