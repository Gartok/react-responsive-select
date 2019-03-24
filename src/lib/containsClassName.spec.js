import containsClassName from './containsClassName';

describe('containsClassName', () => {
  const mockElement = {
    className: 'things',
  };

  it('should return true when a class is found', () => {
    const test = containsClassName(mockElement, 'things');
    expect(test).toEqual(true);
  });

  it('should return false when only part of a class is found', () => {
    const test = containsClassName(mockElement, 'thing');
    expect(test).toEqual(false);
  });

  it('should return false when part of a class is NOT found', () => {
    const test = containsClassName(mockElement, 'jhgfjhgfjhgfjhgfjhgf');
    expect(test).toEqual(false);
  });
});
