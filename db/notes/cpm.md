## Game master (GM) has CPMs as floats, but calculations require doubles
Can either cast floats to doubles, or use pre-generated lists

### Cast floats to double in JS
```js
let floatNum = 0.094
let doubleNum = new Float32Array([floatNum])[0]
```

#### Generate half levels
GM only has whole-level CPMs, need to manually calculate half-levels (root mean square)
see [cpmCompileTest.js]()

### Pre-generated CPMs as doubles
Includes L 0-55 CPMs, Dust Cost, Candy Cost, XL Candy Cost
- [Google Sheet](https://docs.google.com/spreadsheets/d/1akMTElC3mStmbRNXI8a4J94YmwJuvia0DiVV_l1W9h0/edit#gid=1145512291])
- [Paste Bin](https://pastebin.com/x4FzRTZJ)

[Source](https://www.reddit.com/r/TheSilphRoad/comments/jwjbw4/comment/ilhqkwj)
