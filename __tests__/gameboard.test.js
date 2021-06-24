import gameboardFactory from '../src/factories/gameboard';
import shipFactory from '../src/factories/ship';

test('Gameboard records misses', () => {
  const testGameboard = gameboardFactory();

  testGameboard.recieveAttack(2, 5);

  expect(testGameboard.board.row[2]).toStrictEqual([
    'empty',
    'empty',
    'empty',
    'empty',
    'empty',
    'miss',
    'empty',
    'empty',
    'empty',
    'empty',
  ]);
});

test('Gameboard correctly places ships horizontally', () => {
  const returnObject = shipFactory(null, null, 3);
  const testGameboard = gameboardFactory();

  testGameboard.placeShip(0, 2, 3, 'horizontal');

  expect(testGameboard.board.row[0].toString()).toStrictEqual(
    [
      'empty',
      'empty',
      returnObject,
      returnObject,
      returnObject,
      'empty',
      'empty',
      'empty',
      'empty',
      'empty',
    ].toString()
  );
});

test('Gameboard correctly places ships verticaly', () => {
  const returnObject = shipFactory(null, null, 2);
  const testGameboard = gameboardFactory();
  testGameboard.placeShip(5, 5, 2, 'vertical');

  expect(testGameboard.board.row[5].toString()).toStrictEqual(
    [
      'empty',
      'empty',
      'empty',
      'empty',
      'empty',
      returnObject,
      'empty',
      'empty',
      'empty',
      'empty',
    ].toString()
  );

  expect(testGameboard.board.row[6].toString()).toStrictEqual(
    [
      'empty',
      'empty',
      'empty',
      'empty',
      'empty',
      returnObject,
      'empty',
      'empty',
      'empty',
      'empty',
    ].toString()
  );
});

test('Gameboard records hits', () => {
  const testGameboard = gameboardFactory();

  testGameboard.placeShip(8, 7, 3, 'horizontal');
  testGameboard.recieveAttack(8, 7);
  testGameboard.recieveAttack(8, 8);

  expect(testGameboard.board.row[8][7].hitSpots).toEqual([true, true, false]);
});

test('Gameboard knows when all ships have been sunk', () => {
  const testGameboard = gameboardFactory();

  testGameboard.placeShip(2, 4, 3, 'vertical');
  testGameboard.placeShip(5, 5, 4, 'horizontal');

  testGameboard.recieveAttack(2, 4);
  testGameboard.recieveAttack(3, 4);
  testGameboard.recieveAttack(4, 4);

  testGameboard.recieveAttack(5, 5);
  testGameboard.recieveAttack(5, 6);
  testGameboard.recieveAttack(5, 7);
  testGameboard.recieveAttack(5, 8);

  expect(testGameboard.allShipsSunk).toBe(true);
});

test('Returns an error if placing a ship on another ship', () => {
  const testGameboard = gameboardFactory();
  testGameboard.placeShip(5, 5, 2, 'horizontal');

  expect(() => testGameboard.placeShip(5, 5, 5, 'vertical')).toThrow(
    'Ship already there'
  );
});

test('Returns an error if the ship is too large to fit inside the gameboard', () => {
  const testGameboard = gameboardFactory();

  expect(() => testGameboard.placeShip(0, 9, 3, 'horizontal')).toThrow(
    'Not enough space for that ship!'
  );

  expect(() => testGameboard.placeShip(8, 0, 3, 'vertical')).toThrow(
    'Not enough space for that ship!'
  );
});
