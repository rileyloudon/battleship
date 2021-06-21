import shipFactory from './ship';

const gameboardFactory = () => {
  return {
    gameboardShips: [],
    allShipsSunk: false,
    map: {
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

    placeShip(startX, startY, newShipLength, direction) {
      this.gameboardShips.push(
        shipFactory(startX, startY, newShipLength, direction)
      );

      const placeShipHoriontal = (startX, startY, newShipLength) => {
        if (startY + newShipLength <= this.map.row[startX].length) {
          if (this.map.row[startX].indexOf(!'empty', startY) === -1) {
            for (let i = startY; i < startY + newShipLength; i++) {
              this.map.row[startX][i] =
                this.gameboardShips[this.gameboardShips.length - 1];
            }
          } else {
            throw new Error('Ship already there');
          }
        } else throw new Error('Not enough space for that ship!');
      };

      const placeShipVertical = (startX, startY, newShipLength) => {
        if (startX + newShipLength <= Object.keys(this.map.row).length) {
          for (let i = startX; i < startX + newShipLength; i++) {
            if (this.map.row[i][startX] !== 'empty')
              throw new Error('Ship already there');
          }
          for (let i = startX; i < startX + newShipLength; i++) {
            this.map.row[i][startY] =
              this.gameboardShips[this.gameboardShips.length - 1];
          }
        } else throw new Error('Not enough space for that ship!');
      };

      if (direction === 'horizontal')
        placeShipHoriontal(startX, startY, newShipLength);
      else if (direction === 'vertical')
        placeShipVertical(startX, startY, newShipLength);
    },

    recieveAttack(x, y) {
      const attackedSquare = this.map.row[x][y];

      if (attackedSquare === 'empty') {
        this.map.row[x][y] = 'miss';
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
