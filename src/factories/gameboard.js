import shipFactory from './ship';

const gameboardFactory = () => {
  return {
    gameboardShips: [],
    allShipsSunk: false,
    board: {
      row: {
        //  x: [y]
        0: [...Array(10).fill('empty')],
        1: [...Array(10).fill('empty')],
        2: [...Array(10).fill('empty')],
        3: [...Array(10).fill('empty')],
        4: [...Array(10).fill('empty')],
        5: [...Array(10).fill('empty')],
        6: [...Array(10).fill('empty')],
        7: [...Array(10).fill('empty')],
        8: [...Array(10).fill('empty')],
        9: [...Array(10).fill('empty')],
      },
    },

    placeShip(startX, startY, name, direction) {
      if (this.gameboardShips.some((ship) => ship.name === name)) {
        this.removeShip(name);
      }

      this.gameboardShips.push(shipFactory(startX, startY, name, direction));

      const newShipLength =
        this.gameboardShips[this.gameboardShips.length - 1].length;

      const placeShipHoriontal = (startX, startY, newShipLength) => {
        if (startY + newShipLength <= this.board.row[startX].length) {
          for (let i = startY; i < startY + newShipLength; i++) {
            if (this.board.row[startX][i] !== 'empty')
              throw new Error('Ship already there');
          }
          for (let i = startY; i < startY + newShipLength; i++) {
            this.board.row[startX][i] =
              this.gameboardShips[this.gameboardShips.length - 1];
          }
        } else throw new Error('Not enough space for that ship!');
      };

      const placeShipVertical = (startX, startY, newShipLength) => {
        if (startX + newShipLength <= Object.keys(this.board.row).length) {
          for (let i = startX; i < startX + newShipLength; i++) {
            if (this.board.row[i][startY] !== 'empty')
              throw new Error('Ship already there');
          }
          for (let i = startX; i < startX + newShipLength; i++) {
            this.board.row[i][startY] =
              this.gameboardShips[this.gameboardShips.length - 1];
          }
        } else throw new Error('Not enough space for that ship!');
      };

      if (direction === 'horizontal')
        placeShipHoriontal(startX, startY, newShipLength);
      else if (direction === 'vertical')
        placeShipVertical(startX, startY, newShipLength);
    },

    removeShip(name) {
      this.gameboardShips = this.gameboardShips.filter((ship) => ship.name !== name);
      Object.entries(this.board.row).forEach((row, x) =>
        row[1].forEach((square, y) => {
          if (square !== 'empty' && square.name === name) {
            this.board.row[x][y] = 'empty';
          }
        })
      );
    },

    recieveAttack(x, y) {
      const attackedSquare = this.board.row[x][y];

      if (attackedSquare === 'empty') {
        this.board.row[x][y] = 'miss';
      } else {
        attackedSquare.orientation === 'horizontal'
          ? attackedSquare.hit(y - attackedSquare.startPos.y)
          : attackedSquare.hit(x - attackedSquare.startPos.x);

        if (attackedSquare.isSunk()) {
          if (this.gameboardShips.every((ship) => ship.sunk === true))
            this.allShipsSunk = true;
        }
      }
    },
  };
};

export default gameboardFactory;
