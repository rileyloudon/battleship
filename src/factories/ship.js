const shipFactory = (startX, startY, name, orientation) => {
  let length;

  switch (true) {
    case name === 'Carrier':
      length = 5;
      break;
    case name === 'Battleship':
      length = 4;
      break;
    case name === 'Cruiser':
      length = 3;
      break;
    case name === 'Submarine':
      length = 3;
      break;
    case name === 'Destroyer':
      length = 2;
      break;
    default:
      return new Error('Unable to assign ship length');
  }

  return {
    name,
    length,
    orientation,
    startPos: {
      x: startX,
      y: startY,
    },
    hitSpots: [...Array(length).fill(false)],
    sunk: false,

    hit(hitLocation) {
      this.hitSpots[hitLocation] = true;
      if (this.hitSpots.every((spot) => spot === true)) {
        this.sunk = true;
      }
    },

    isSunk() {
      return this.sunk ? true : false;
    },
  };
};

export default shipFactory;
