const playerFactory = (playerType, gameboard) => {
  const availableAttacks = [...Array(100).keys()];

  return playerType === 'computer'
    ? {
        name: 'Computer',

        attack() {
          const randomAttack = Math.floor(
            Math.random() * (availableAttacks.length - 1)
          );

          let selectedAttack = availableAttacks[randomAttack];
          selectedAttack =
            selectedAttack < 10
              ? ('0' + selectedAttack).split('')
              : selectedAttack.toString().split('');

          const attackX = selectedAttack[0];
          const attackY = selectedAttack[1];

          gameboard.recieveAttack(attackX, attackY);
          availableAttacks.splice(randomAttack, 1);
        },
      }
    : {
        name: playerType,

        attack(x, y) {
          gameboard.recieveAttack(x, y);
        },
      };
};

export default playerFactory;
