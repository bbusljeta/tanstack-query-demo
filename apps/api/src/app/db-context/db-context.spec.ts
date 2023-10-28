import { DbContext } from './db-context';

describe('DbContext', () => {
  it('should be defined', () => {
    expect(new DbContext()).toBeDefined();
  });
});
