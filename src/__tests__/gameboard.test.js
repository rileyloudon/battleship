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

test.only('Gameboard correctly places ships verticaly', () => {
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

test('Gameboard returns error if placing a ship on another ship', () => {
  const testGameboard = gameboardFactory();
  const testShip = shipFactory(2);
  const testShip2 = shipFactory(5);

  testGameboard.placeShip(5, 5, testShip, 'horizontal');

  expect(() => testGameboard.placeShip(5, 5, testShip2, 'vertical')).toThrow(
    'Ship already there'
  );
});
