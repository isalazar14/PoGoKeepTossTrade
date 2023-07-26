## Game master (GM) has CPMs as floats, but calculations require doubles

Can either cast floats to doubles, or use pre-generated lists

### Cast floats to double in JS

```js
let floatNum = 0.094;
let doubleNum = new Float32Array([floatNum])[0];

/* Although game master intends CPM values to be floats, JS treats all numbers as doubles. Float32Array() coerces them to be interpreted as floats*/
let gameMasterCPMs = [
  0.094,
  0.16639787,
  0.21573247,
  // other CPMs
  0.8553,
  0.8603,
  0.8653,
];

let trueCPMs = new Float32Array(gameMasterCPMs)
/* trueCPMs can now be used to calculate CP, in-game stats, and stat product */
```

#### Generate half levels

GM only has whole-level CPMs, need to manually calculate half-levels (root mean square)
see [cpmCompileTest.js]()

### Pre-generated CPMs as doubles

Includes L 0-55 CPMs, Dust Cost, Candy Cost, XL Candy Cost

- [Paste Bin](https://pastebin.com/x4FzRTZJ)
- [Google Sheet](https://docs.google.com/spreadsheets/d/1akMTElC3mStmbRNXI8a4J94YmwJuvia0DiVV_l1W9h0/edit#gid=1145512291)
  - float-double conversion  (java)
  ```java
  float [] levels2 = new float [] {
  	0.094f,
  	0.16639787f,
  	0.21573247f,
  	// other CPMs
  	0.8553f,
  	0.8603f,
  	0.8653f
  };

  for (int i=0; i< levels2.length; i++)
  {
  	String level = Integer.toString(i + 1);
  	double levelCpm = levels2[i];
  	System.out.println(level + ',' + levelCpm);
  	if (i+1 != levels2.length)
  	{
  		double nextLevelCpm = levels2[i+1];
  		double halfLevelCpm = Math.sqrt(levelCpm * levelCpm - levelCpm * levelCpm/2 + nextLevelCpm * nextLevelCpm/2);
  		System.out.println(level + ".5," + halfLevelCpm);
  	}
  }
  ```

[Source](https://www.reddit.com/r/TheSilphRoad/comments/jwjbw4/comment/ilhqkwj)
