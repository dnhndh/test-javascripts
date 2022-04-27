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
function naturalSort(a) {
  return a
    .reduce(
      (p, c) => {
        /[A-Z]/i.test(c)
          ? p[0].push(c)
          : /\d+/.test(c)
          ? p[1].push(c * 1)
          : p[2].push(c);
        console.log(p[2]);
        return p;
      },
      [[], [], []]
    )
    .reduce(
      (p, c) =>
        p.concat(
          c
            .sort((p, c) => (p < c ? -1 : 1))
            .map((e) => (typeof e == "number" ? e.toString() : e))
        ),
      []
    );
}
console.log(naturalSort(arr));
