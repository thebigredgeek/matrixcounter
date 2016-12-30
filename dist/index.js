'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var type = function type(t) {
  return Object.prototype.toString.call(t).replace('[object ', '').replace(']', '').toLowerCase();
};

var MatrixCounter = function () {
  function MatrixCounter(base, initialState) {
    _classCallCheck(this, MatrixCounter);

    _assert2.default.equal(type(base), 'array', '\n      MatrixCounter#constructor accepts first parameter \n      "base" of type array, got parameter of type ' + type(base) + '\n    ');
    base.forEach(function (i) {
      return (0, _assert2.default)(i > 1, '\n      MatrixCounter#constructor accepts first parameter \n      "base" of type array containing numbers greater than 1,\n      got element less than or equal to 1.\n    ');
    });
    this.__base = base;
    if (type(initialState) === 'array') {
      _assert2.default.equal(base.length, initialState.length, '\n        MatrixCounter#constructor accepts second parameter\n        of type "initialState" of type array and equal length\n        to first parameter "base", but got lengths ' + base.length + ' (base) and ' + initialState.length + ' (initialState)\n      ');
      this.__state = initialState;
    } else {
      this.reset();
    }
  }

  _createClass(MatrixCounter, [{
    key: 'hasNext',
    value: function hasNext() {
      return this.__state[0] < this.__base[0];
    }
  }, {
    key: 'next',
    value: function next() {
      // If we are at the end, signal
      if (!this.hasNext()) return null;
      // Increment index 0;
      this.__state[this.__state.length - 1] = this.__state[this.__state.length - 1] + 1;
      // Recalc state
      for (var i = this.__state.length - 1; i >= 1; i--) {
        if (this.__state[i] === this.__base[i]) {
          this.__state[i - 1]++; //carry next index
          this.__state[i] = 0; //reset this index
        }
      }
      return this.peek();
    }
  }, {
    key: 'peek',
    value: function peek() {
      return [].concat(this.__state); //keepin' it immutable
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.__state = new Array(this.__base.length).fill(0);
      return this.peek();
    }
  }]);

  return MatrixCounter;
}();

exports.default = MatrixCounter;
//# sourceMappingURL=index.js.map