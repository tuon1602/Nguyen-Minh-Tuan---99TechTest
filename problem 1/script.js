var sum_to_n_a = function (n) {
  // using regular for loop
  let sum = 0;
  for (let i = 0; i <= n; i++) {
    sum += i;
  }
  return sum;
};
var sum_to_n_b = function (n) {
  // using reduce function
  const numbers = Array.from({ length: n }, (_, index) => index + 1);
  const sum = numbers.reduce((acc, cur) => acc + cur, 0);
  return sum;
};
var sum_to_n_c = function (n) {
  // using math
  const sum = (n * (n + 1)) / 2;
  return sum;
};
console.log("solution a: " + sum_to_n_a(5));
console.log("solution b: " + sum_to_n_b(5));
console.log("solution c: " + sum_to_n_c(5));
