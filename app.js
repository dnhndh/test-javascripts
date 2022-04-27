var arr = [
  "ax",
  "mof",
  "4",
  "63",
  "42",
  "3",
  "10",
  "[",
  "23",
  "adidas",
  "ba",
  ")",
  "ABC",
];
var symbols = "()[]{}!@#$%¨&*-_=+".split("");

function compare(array) {
  array.sort((a, b) => {
    if (symbols.indexOf(a) > -1) a = "zzzzzzz";
    if (symbols.indexOf(b) > -1) b = "zzzzzzz";

    if (!isNaN(Number(a)) && !isNaN(Number(b))) {
      if (Number(a) > Number(b)) {
        return 1;
      } else if (Number(a) < Number(b)) {
        return -1;
      } else {
        return 0;
      }
    } else {
      if (a.toUpperCase() > b.toUpperCase()) {
        return 1;
      } else if (a.toUpperCase() < b.toUpperCase()) {
        return -1;
      } else {
        return 0;
      }
    }
  });
  return array;
}

console.log(compare(arr));
