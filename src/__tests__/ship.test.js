import shipFactory from '../factories/ship';

test('Ship registers hits', () => {
  const testShip = shipFactory(3);
  testShip.hit(0);
  testShip.hit(3);
  expect(testShip.hitSpots).toStrictEqual([true, false, false, true]);
});

test('Ship sinks', () => {
  const sinkShip = shipFactory(1);
  sinkShip.hit(0);
  sinkShip.hit(1);
  expect(sinkShip.isSunk()).toBe(true);
  expect(sinkShip.sunk).toBe(true);
});
