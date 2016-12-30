# matrixcounter
[![Build Status](https://travis-ci.org/thebigredgeek/matrixcounter.svg?branch=master)](https://travis-ci.org/thebigredgeek/matrixcounter)

A simple iterator for counting along a matrix that contains varied numerical bases.

### Purpose
MatrixCounter is a simple library for iterating and counting about a matrix that contains varied numerical bases for each index.  Example use cases include constructing clocks (24 hour, 12 hour, binary), creating permutations from an array of strings, or reducing measurements of smaller units to larger units.

### Installation
```bash
  npm install matrix-counter
```

### Example Usage
```javascript
import MatrixCounter from '../dist/index';

const d = new Date();
const clock = new MatrixCounter(
  [24, 60, 60], //numeric base
  [d.getHours(), d.getMinutes(), d.getSeconds()] //initial state
);

const format = n => n < 10 ? '0' + n : n;

// Worth noting that using setInterval to increment a clock is a pretty horrid idea
setInterval(() => {
  if (clock.hasNext()) {
    clock.next();
  } else {
    clock.reset();
  }
  const [ hours, minutes, seconds ] = clock.peek();
  console.log(`${format(hours)}:${format(minutes)}:${format(seconds)}`);
}, 1000);
```

### Development

```bash
  $ make dependencies # install node modules, works with yarn
  
  $ make lint # lint code
  
  $ make test # test code
  
  $ make # build code
```

### Todo
- Hook up travis, coveralls, and beer pay :D
- Add more tests
- Add better docs
- Release
