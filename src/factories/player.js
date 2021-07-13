const playerFactory = (playerType, gameboard) => {
  return playerType === 'computer'
    ? {
        name: 'Computer',
        availableAttacks: [...Array(100).keys()],
        foundShipSpot: undefined,
        attackVertical: false,

        horizontalSquareBeforeHit: undefined,
        verticalSquareBeforeHit: undefined,

        attack() {
          let selectedAttack = undefined;

          const randomAttack = () => {
            const randomNumber = Math.floor(
              Math.random() * (this.availableAttacks.length - 1)
            );

            selectedAttack = this.availableAttacks[randomNumber];

            selectedAttack =
              selectedAttack < 10
                ? ('0' + selectedAttack).split('')
                : selectedAttack.toString().split('');
          };

          const verticalAttack = () => {
            for (let i = this.foundShipSpot[0]; i >= '0'; i--) {
              if (gameboard.board.row[i][this.foundShipSpot[1]] !== 'hit') {
                this.verticalSquareBeforeHit = i;
                break;
              }
            }

            if (
              this.foundShipSpot[0] !== '9' &&
              (gameboard.board.row[parseInt(this.foundShipSpot[0]) + 1][
                this.foundShipSpot[1]
              ] === 'empty' ||
                typeof gameboard.board.row[parseInt(this.foundShipSpot[0]) + 1][
                  this.foundShipSpot[1]
                ] === 'object')
            ) {
              selectedAttack = [
                (parseInt(this.foundShipSpot[0]) + 1).toString(),
                this.foundShipSpot[1],
              ];
            } else if (
              this.foundShipSpot[0] !== '0' &&
              this.verticalSquareBeforeHit !== undefined &&
              (gameboard.board.row[this.verticalSquareBeforeHit][
                this.foundShipSpot[1]
              ] === 'empty' ||
                typeof gameboard.board.row[this.verticalSquareBeforeHit][
                  this.foundShipSpot[1]
                ] === 'object')
            ) {
              selectedAttack = [
                this.verticalSquareBeforeHit.toString(),
                this.foundShipSpot[1],
              ];
            } else {
              randomAttack();
              this.attackVertical = false;
              this.foundShipSpot = undefined;
            }
          };

          if (this.foundShipSpot) {
            if (!this.attackVertical) {
              for (let i = this.foundShipSpot[1]; i >= '0'; i--) {
                if (gameboard.board.row[this.foundShipSpot[0]][i] !== 'hit') {
                  this.horizontalSquareBeforeHit = i;
                  break;
                }
              }

              if (
                this.foundShipSpot[1] !== '9' &&
                (gameboard.board.row[this.foundShipSpot[0]][
                  parseInt(this.foundShipSpot[1]) + 1
                ] === 'empty' ||
                  typeof gameboard.board.row[this.foundShipSpot[0]][
                    parseInt(this.foundShipSpot[1]) + 1
                  ] === 'object')
              ) {
                selectedAttack = [
                  this.foundShipSpot[0],
                  (parseInt(this.foundShipSpot[1]) + 1).toString(),
                ];
              } else if (
                this.foundShipSpot[1] !== '0' &&
                this.horizontalSquareBeforeHit !== undefined &&
                (gameboard.board.row[this.foundShipSpot[0]][
                  this.horizontalSquareBeforeHit
                ] === 'empty' ||
                  typeof gameboard.board.row[this.foundShipSpot[0]][
                    this.horizontalSquareBeforeHit
                  ] === 'object')
              ) {
                selectedAttack = [
                  this.foundShipSpot[0],
                  this.horizontalSquareBeforeHit.toString(),
                ];
              } else if (
                (this.foundShipSpot[1] === '9' ||
                  gameboard.board.row[this.foundShipSpot[0]][
                    parseInt(this.foundShipSpot[1]) + 1
                  ] === 'miss') &&
                (this.foundShipSpot[1] === '0' ||
                  gameboard.board.row[this.foundShipSpot[0]][
                    parseInt(this.foundShipSpot[1]) - 1
                  ] === 'miss')
              ) {
                this.attackVertical = true;
                verticalAttack();
              } else {
                randomAttack();
              }
            } else {
              verticalAttack();
            }

            if (selectedAttack < 10)
              selectedAttack = ('0' + selectedAttack).split('');
          } else {
            randomAttack();
          }

          if (
            gameboard.board.row[selectedAttack[0]][selectedAttack[1]] !== 'empty'
          ) {
            this.foundShipSpot = selectedAttack;
          }

          const attackX = selectedAttack[0];
          const attackY = selectedAttack[1];

          const removeAttack = this.availableAttacks.findIndex(
            (num) => num === parseInt(selectedAttack.join(''))
          );
          this.availableAttacks.splice(removeAttack, 1);
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
