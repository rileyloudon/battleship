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
  const testGameboard = gameboardFactory();
  const testShip = shipFactory(3);
  testGameboard.placeShip(0, 2, testShip, 'horizontal');
  expect(testGameboard.map.row[0]).toStrictEqual([
    'empty',
    'empty',
    'ship',
    'ship',
    'ship',
    'empty',
    'empty',
    'empty',
    'empty',
    'empty',
  ]);
});

test('Gameboard correctly places ships verticaly', () => {
  const testGameboard = gameboardFactory();
  const testShip = shipFactory(2);
  testGameboard.placeShip(5, 5, testShip, 'vertical');
  expect(testGameboard.map.row[5]).toStrictEqual([
    'empty',
    'empty',
    'empty',
    'empty',
    'empty',
    'ship',
    'empty',
    'empty',
    'empty',
    'empty',
  ]);

  expect(testGameboard.map.row[6]).toStrictEqual([
    'empty',
    'empty',
    'empty',
    'empty',
    'empty',
    'ship',
    'empty',
    'empty',
    'empty',
    'empty',
  ]);
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
