function* countgen(start, end) {
  let num = start;
  while (num <= end) yield num++;
  return;
}

const counter = countgen(2, 7)
for (let i=0; 1<5; i++) console.log(counter.next().value)