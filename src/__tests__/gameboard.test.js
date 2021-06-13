import gameboardFactory from '../factories/gameboard';
import shipFactory from '../factories/ship';

test('Gameboard records misses', () => {
  const testGameboard = gameboardFactory();

  testGameboard.recieveAttack(2, 5);

  expect(testGameboard.map.row[2]).toStrictEqual([
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
  const returnObject = shipFactory(3);
  const testGameboard = gameboardFactory();

  testGameboard.placeShip(0, 2, 3, 'horizontal');

  expect(testGameboard.map.row[0].toString()).toStrictEqual(
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
  const returnObject = shipFactory(2);
  const testGameboard = gameboardFactory();
  testGameboard.placeShip(5, 5, 2, 'vertical');

  expect(testGameboard.map.row[5].toString()).toStrictEqual(
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

  expect(testGameboard.map.row[6].toString()).toStrictEqual(
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

  expect(() => testGameboard.placeShip(8, 0, 4, 'vertical')).toThrow(
    'Not enough space for that ship!'
  );
});
