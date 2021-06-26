import shipFactory from '../src/factories/ship';

test('Ship registers hits', () => {
  const testShip = shipFactory(null, null, 'Submarine');
  testShip.hit(0);
  testShip.hit(3);
  expect(testShip.hitSpots).toStrictEqual([true, false, false, true]);
});

test('Ship sinks', () => {
  const sinkShip = shipFactory(null, null, 'Destroyer');
  sinkShip.hit(0);
  sinkShip.hit(1);
  expect(sinkShip.isSunk()).toBe(true);
  expect(sinkShip.sunk).toBe(true);
});
