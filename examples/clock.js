import MatrixCounter from '../dist/index';

const d = new Date();
const clock = new MatrixCounter(
  [24, 60, 60], //numeric base
  [d.getHours(), d.getMinutes(), d.getSeconds()] //initial state
);

const format = n => n < 10 ? '0' + n : n;

setInterval(() => {
  if (clock.hasNext()) {
    clock.next();
  } else {
    clock.reset();
  }
  const [ hours, minutes, seconds ] = clock.peek();
  console.log(`${format(hours)}:${format(minutes)}:${format(seconds)}`);
}, 1000);
