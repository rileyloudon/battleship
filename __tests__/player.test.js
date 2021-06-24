import playerFactory from '../src/factories/player';
import gameboardFactory from '../src/factories/gameboard';

// Testing random returns with jest:
// https://stackoverflow.com/a/57730344/12843016

beforeEach(() => jest.spyOn(global.Math, 'random').mockReturnValue(0.45));

afterEach(() => jest.spyOn(global.Math, 'random').mockRestore());

test('Computer picks a random target', () => {
  const testGameboard = gameboardFactory();
  const testPlayer = playerFactory('computer', testGameboard);
  testGameboard.placeShip(4, 2, 5, 'horizontal');

  testPlayer.attack();
  testPlayer.attack();

  expect(testGameboard.board.row[4][4].hitSpots).toEqual([
    false,
    false,
    true,
    true,
    false,
  ]);
});
