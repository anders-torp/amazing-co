/*

Tree structure:

 0
/|\
123


LCRS structure:

0
|
1-2-3

Database structure:
id: key | leftchildId | rightchildId | parentId
-------------------------------------------------------
0       | 1           |              |
1       |             | 2            | 0
2       |             | 3            | 0
3       |             |              | 0


*/

export default class Node {
  public id: number;
  public leftChild: number | null;
  public rightSibling: number | null;
  public parent: number | null;

  constructor(
    id: number,
    leftChild: number | null,
    rightSibling: number | null,
    parent: number | null,
  ) {
    this.id = id;
    this.leftChild = leftChild;
    this.rightSibling = rightSibling;
    this.parent = parent;
  }
}
