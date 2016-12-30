import assert from 'assert';

const type = t => Object.prototype.toString.call(t).replace('[object ', '').replace(']', '').toLowerCase();

export default class MatrixCounter {
  constructor (base, initialState) {
    assert.equal(type(base), 'array', `
      MatrixCounter#constructor accepts first parameter 
      "base" of type array, got parameter of type ${type(base)}
    `);
    base.forEach(i => assert(i > 1, `
      MatrixCounter#constructor accepts first parameter 
      "base" of type array containing numbers greater than 1,
      got element less than or equal to 1.
    `))
    this.__base = base;
    if (type(initialState) === 'array') {
      assert.equal(base.length, initialState.length, `
        MatrixCounter#constructor accepts second parameter
        of type "initialState" of type array and equal length
        to first parameter "base", but got lengths ${base.length} (base) and ${initialState.length} (initialState)
      `);
      this.__state = initialState;
    } else {
      this.reset();
    }
  }
  hasNext () {
    return this.__state[0] < this.__base[0];
  }
  next () {
    // If we are at the end, signal
    if (!this.hasNext()) return null;
    // Increment index 0;
    this.__state[this.__state.length - 1] = this.__state[this.__state.length - 1] + 1;
    // Recalc state
    for (var i = this.__state.length - 1; i >= 1; i--) {
      if (this.__state[i] === this.__base[i]) {
        this.__state[i - 1] ++; //carry next index
        this.__state[i] = 0; //reset this index
      }
    }
    return this.peek();
  }
  peek () {
    return [].concat(this.__state); //keepin' it immutable
  }
  reset () {
    this.__state = new Array(this.__base.length).fill(0);
    return this.peek();
  }
}
