# a-star
Four directions A* algorithm written in JavaScript for 2D Array.  

## Usage

A config `Object` must be passed to the `AStar`.  

This config must be composed of two parameters: a 2D Array `datas` of any type (primitives or custom `Class`) and a function `block` in order to test if the cells from the grid is a block.

After the `AStar` initialization, you can use the `search` function multiple times as long as you give two coordinates objects.

The research complete, an object composed of the `status` is returned.  
If a `path` was found, an array of object coordinates (from start to end) is added too.  

The __status__ are:  
- _Found_: a path have been found and retrieved
- _Invalid_: at least one of the given coordinates is wrong (out of bounds)
- _Block_: at least one of the given coordinates is a block
- _None_: no path have been found

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
  block: n => n === 1
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
//    [3, 1, 3, 3, 0, 0],
//    [3, 1, 1, 3, 1, 0],
//    [3, 3, 3, 3, 0, 0],
//    [0, 0, 0, 1, 0, 1],
//    [0, 1, 1, 1, 0, 0]
//  ]
console.dir(grid);
```
