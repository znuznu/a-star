# a-star
Four or height directions A* algorithm written in JavaScript for 2D Array.  

## Usage

A config `Object` must be passed to the `AStar`.  

This config must be composed of (at least) 2 parameters: a 2D Array `datas` of any type (primitives or custom `Class`), a function `block` in order to test if a square of the grid is a block and a topology, 4 or 8 (default is 4).  

After the `AStar` initialization, you can use the `search` function multiple times as long as you give two coordinate objects.

When the research is done, an object composed of the `status` is returned.  
If a `path` was found, an array of object coordinates (from start to end) is added too.  

The __status__ are:  
- _Found_: a path has been found and retrieved
- _Invalid_: at least one of the given coordinates is wrong (out of bounds)
- _Block_: at least one of the given coordinates is a block
- _None_: no path have been found

__Note:__ the heuristic used is the Manhattan distance or the octile distance.  

### A quick example
```javascript
// A 2D array where 1 is a block and 0 is a passage.
let grid = [
  [0, 1, 0, 0, 0, 0],
  [0, 1, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 1],
  [0, 1, 1, 1, 0, 0]
];

// The config object used to initialize the A* Class.
// The testing block function is simple.
let config = {
  datas: grid,
  block: n => n === 1,
  topology: 4
};

let aStar = new AStar(config);

// r stands for row, c for col.
let start = {r: 0, c: 0};
let end = {r: 0, c: 2};

let result = aStar.search(start, end);

//  {
//    status: 'Found',
//    path: (8) [...]
//  }
console.dir(result);

result.path.forEach(n => {
  grid[n.r][n.c] = 9;
});

//  [
//    [9, 1, 9, 9, 0, 0],
//    [9, 1, 1, 9, 1, 0],
//    [9, 9, 9, 9, 0, 0],
//    [0, 0, 0, 1, 0, 1],
//    [0, 1, 1, 1, 0, 0]
//  ]
console.dir(grid);
```
