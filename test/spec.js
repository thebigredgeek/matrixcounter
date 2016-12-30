import { expect } from 'chai';

import MatrixCounter from '../dist/index';

const drain = counter => {
  let res = [];
  while (counter.hasNext()) {
    res.push(counter.peek());
    counter.next();
  }
  return res;
};

describe('MatrixCounter', () => {
  context('basic case', () => {
    it('works', () => {
      const counter = new MatrixCounter([3, 2, 3]);
      expect(drain(counter)).to.eql([
        [0, 0, 0],
        [0, 0, 1],
        [0, 0, 2],
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 2],
        [1, 0, 0],
        [1, 0, 1],
        [1, 0, 2],
        [1, 1, 0],
        [1, 1, 1],
        [1, 1, 2],
        [2, 0, 0],
        [2, 0, 1],
        [2, 0, 2],
        [2, 1, 0],
        [2, 1, 1],
        [2, 1, 2]
      ]);
    });
  });
  context('with initialState', () => {
    it('works', () => {
      const counter = new MatrixCounter(
        [3, 2, 3],
        [1, 0, 0]
      );
      expect(drain(counter)).to.eql([
        [1, 0, 0],
        [1, 0, 1],
        [1, 0, 2],
        [1, 1, 0],
        [1, 1, 1],
        [1, 1, 2],
        [2, 0, 0],
        [2, 0, 1],
        [2, 0, 2],
        [2, 1, 0],
        [2, 1, 1],
        [2, 1, 2]
      ]);
    });
  });
  describe('hasNext', () => {
    context('at the end', () => {
      it('returns false', () => {
        const counter = new MatrixCounter(
          [2, 2, 2],
          [2, 0, 0]
        );
        expect(counter.hasNext()).to.be.false;
      });
    });
    context('not at the end', () => {
      it('returns true', () => {
        const counter = new MatrixCounter(
          [2, 2, 2],
          [1, 1, 1]
        );
        expect(counter.hasNext()).to.be.true;
      });
    });
  });
  describe('next', () => {
    context('at the end', () => {
      it('returns null', () => {
        const counter = new MatrixCounter(
          [2, 2, 2],
          [2, 0, 0]
        );
        expect(counter.next()).to.be.null;
      });
    });
    context('not at the end', () => {
      it('increments and returns the next state', () => {
        const counter = new MatrixCounter(
          [2, 2, 2],
          [0, 0, 1]
        );
        expect(counter.next()).to.eql([
          0, 1, 0
        ]);
      });
    });
  });
  describe('peek', () => {
    it('returns the current state', () => {
      const counter = new MatrixCounter(
        [2, 2, 2],
        [0, 0, 1]
      );
      expect(counter.peek()).to.eql([
        0, 0, 1
      ]);
    })
  });
  describe('reset', () => {
    it('resets returns the state', () => {
      const counter = new MatrixCounter(
        [2, 2, 2],
        [0, 0, 0]
      );
      counter.next();
      expect(counter.reset()).to.eql([
        0, 0, 0
      ])
    });
  });
});
