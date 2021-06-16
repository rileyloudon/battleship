const shipFactory = (startX, startY, length, orientation) => {
  return {
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
    },

    isSunk() {
      if (this.hitSpots.every((spot) => spot === true)) {
        this.sunk = true;
        return true;
      }
      return false;
    },
  };
};

export default shipFactory;
