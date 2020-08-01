export default class MinBinaryHeap {
  /**
   * Represent a (Min) Binary Heap.
   * Inspired by the Eloquent JavaScript book.
   *
   * @constructor
   * @param {function} scoreFunction - The function used to insert data
   */
  constructor(scoreFunction) {
    this.data = [];
    this.dataSet = new Set([]);
    this.scoreFunction = scoreFunction;
  }

  /**
   * Return the size of this BinaryHeap.
   */
  size() {
    return this.data.length;
  }

  /**
   * Insert an element into this BinaryHeap.
   *
   * @param {*} element - The element to insert
   */
  push(element) {
    this.data.push(element);
    this.ascend(this.data.length - 1);
    this.dataSet.add(element);
  }

  /**
   * Remove and return the smallest element of this BinaryHeap that is updated.
   */
  pop() {
    var result = this.data[0];

    var end = this.data.pop();

    if (this.data.length > 0) {
      this.data[0] = end;
      this.descend(0);
    }

    this.dataSet.delete(result);

    return result;
  }

  /**
   * Remove the node given from this BinaryHeap that is updated.
   * @param {*} element - The node to remove
   *
   */
  remove(node) {
    if (this.dataSet.has(node))
      this.dataSet.delete(node);

    var length = this.data.length;

    for (var i = 0; i < length; i++) {
      if (this.data[i] != node)
        continue;

      var end = this.data.pop();

      if (i == length - 1)
        break;

      this.data[i] = end;
      this.ascend(i);
      this.descend(i);

      break;
    }
  }

  /**
   * Move up the element with index n of this BinaryHeap.
   *
   * @param{int} n - The nth element
   */
  ascend(n) {
    var element = this.data[n];
    var score = this.scoreFunction(element);

    while (n > 0) {
      var parentN = ~~((n + 1) / 2) - 1,
      parent = this.data[parentN];

      if (score >= this.scoreFunction(parent))
        break;

      this.data[parentN] = element;
      this.data[n] = parent;
      n = parentN;
    }
  }

  /**
   * Move down the element with index n of this BinaryHeap.
   *
   * @param{int} n - The nth element
   */
  descend(n) {
   var length = this.data.length,
   element = this.data[n],
   elemScore = this.scoreFunction(element);

   while(true) {
     let c2 = (n + 1) * 2, c1 = c2 - 1;
     let swap = null;

     if (c1 < length) {
       let child1 = this.data[c1];
       var child1Score = this.scoreFunction(child1);
       if (child1Score < elemScore)
         swap = c1;
     }

     if (c2 < length) {
       let child2 = this.data[c2];
       let child2Score = this.scoreFunction(child2);
       if (child2Score < (swap == null ? elemScore : child1Score))
         swap = c2;
     }

     if (swap == null)
      break;

     this.data[n] = this.data[swap];
     this.data[swap] = element;
     n = swap;
   }
  }

  /**
   * Check whether this node exists in the heap.
   *
   * @param {*} node - The node to check
   * @returns True if the node exists in the Heap
   */
  contains(node) {
      return this.dataSet.has(node);
  }
}
