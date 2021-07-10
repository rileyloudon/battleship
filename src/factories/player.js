const playerFactory = (playerType, gameboard) => {
  return playerType === 'computer'
    ? {
        name: 'Computer',
        availableAttacks: [...Array(100).keys()],
        foundShipSpot: undefined,
        attackVertical: false,
        verticalSquareBeforeHit: undefined,

        attack() {
          let selectedAttack = undefined;

          if (this.foundShipSpot) {
            if (!this.attackVertical) {
              if (
                this.foundShipSpot[1] < 9 &&
                gameboard.board.row[this.foundShipSpot[0]][
                  parseInt(this.foundShipSpot[1]) + 1
                ] !== 'hit' &&
                gameboard.board.row[this.foundShipSpot[0]][
                  parseInt(this.foundShipSpot[1]) + 1
                ] !== 'miss'
              ) {
                selectedAttack = [
                  this.foundShipSpot[0],
                  (parseInt(this.foundShipSpot[1]) + 1).toString(),
                ];
              } else if (
                this.foundShipSpot[1] > 0 &&
                gameboard.board.row[this.foundShipSpot[0]][
                  gameboard.board.row[this.foundShipSpot[0]].findIndex(
                    (square) => square === 'hit'
                  ) - 1
                ] !== 'miss'
              ) {
                let squareBeforeHit =
                  gameboard.board.row[this.foundShipSpot[0]].findIndex(
                    (square) => square === 'hit'
                  ) - 1;
                selectedAttack = [this.foundShipSpot[0], squareBeforeHit];
              } else if (
                (gameboard.board.row[this.foundShipSpot[0]][
                  parseInt(this.foundShipSpot[1]) + 1
                ] === 'miss' ||
                  this.foundShipSpot[1] === 9) &&
                (gameboard.board.row[this.foundShipSpot[0]][
                  parseInt(this.foundShipSpot[1]) - 1
                ] === 'miss' ||
                  this.foundShipSpot[1] === 0)
              ) {
                this.attackVertical = true;
                if (
                  this.foundShipSpot[0] < 9 &&
                  gameboard.board.row[parseInt(this.foundShipSpot[0]) + 1][
                    this.foundShipSpot[1]
                  ] !== 'hit' &&
                  gameboard.board.row[parseInt(this.foundShipSpot[0]) + 1][
                    this.foundShipSpot[1]
                  ] !== 'miss'
                ) {
                  for (let i = 0; i < 9; i++) {
                    if (gameboard.board.row[i][this.foundShipSpot[1]] === 'hit')
                      break;
                    else this.verticalSquareBeforeHit = i;
                  }
                  selectedAttack = [
                    (parseInt(this.foundShipSpot[0]) + 1).toString(),
                    this.foundShipSpot[1],
                  ];
                } else {
                  for (let i = 0; i < 9; i++) {
                    if (gameboard.board.row[i][this.foundShipSpot[1]] === 'hit')
                      break;
                    else this.verticalSquareBeforeHit = i;
                  }
                  console.log(this.verticalSquareBeforeHit);
                  selectedAttack = [
                    this.verticalSquareBeforeHit.toString(),
                    this.foundShipSpot[1],
                  ];
                }
              } else {
                const randomAttack = Math.floor(
                  Math.random() * (this.availableAttacks.length - 1)
                );

                selectedAttack = this.availableAttacks[randomAttack];

                this.availableAttacks.splice(randomAttack, 1);

                selectedAttack =
                  selectedAttack < 10
                    ? ('0' + selectedAttack).split('')
                    : selectedAttack.toString().split('');

                this.foundShipSpot = undefined;
              }
            } else {
              if (
                this.foundShipSpot[0] < 9 &&
                gameboard.board.row[parseInt(this.foundShipSpot[0]) + 1][
                  this.foundShipSpot[1]
                ] !== 'hit' &&
                gameboard.board.row[parseInt(this.foundShipSpot[0]) + 1][
                  this.foundShipSpot[1]
                ] !== 'miss'
              ) {
                for (let i = 0; i < 9; i++) {
                  if (gameboard.board.row[i][this.foundShipSpot[1]] === 'hit') break;
                  else this.verticalSquareBeforeHit = i;
                }
                console.log(this.verticalSquareBeforeHit);
                selectedAttack = [
                  (parseInt(this.foundShipSpot[0]) + 1).toString(),
                  this.foundShipSpot[1],
                ];
              } else if (
                this.foundShipSpot[0] > 0 &&
                gameboard.board.row[this.verticalSquareBeforeHit][
                  this.foundShipSpot[1]
                ] !== 'miss'
              ) {
                for (let i = 0; i < 9; i++) {
                  if (gameboard.board.row[i][this.foundShipSpot[1]] === 'hit') break;
                  else this.verticalSquareBeforeHit = i;
                }
                selectedAttack = [
                  this.verticalSquareBeforeHit.toString(),
                  this.foundShipSpot[1],
                ];
              } else {
                // RANDOM ATTACK
                const randomAttack = Math.floor(
                  Math.random() * (this.availableAttacks.length - 1)
                );

                selectedAttack = this.availableAttacks[randomAttack];

                this.availableAttacks.splice(randomAttack, 1);

                selectedAttack =
                  selectedAttack < 10
                    ? ('0' + selectedAttack).split('')
                    : selectedAttack.toString().split('');

                this.foundShipSpot = undefined;
              }
            }

            if (selectedAttack < 10)
              selectedAttack = ('0' + selectedAttack).split('');

            if (
              gameboard.board.row[selectedAttack[0]][selectedAttack[1]] !== 'empty'
            ) {
              this.foundShipSpot = selectedAttack;
            }

            const removeAttack = this.availableAttacks.findIndex(
              (num) => num === parseInt(selectedAttack.join(''))
            );
            this.availableAttacks.splice(removeAttack, 1);
          } else {
            const randomAttack = Math.floor(
              Math.random() * (this.availableAttacks.length - 1)
            );

            selectedAttack = this.availableAttacks[randomAttack];

            this.availableAttacks.splice(randomAttack, 1);

            selectedAttack =
              selectedAttack < 10
                ? ('0' + selectedAttack).split('')
                : selectedAttack.toString().split('');

            if (
              gameboard.board.row[selectedAttack[0]][selectedAttack[1]] !== 'empty'
            ) {
              this.foundShipSpot = selectedAttack;
            }
          }

          console.log(selectedAttack);
          const attackX = selectedAttack[0];
          const attackY = selectedAttack[1];

          gameboard.recieveAttack(attackX, attackY);
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
