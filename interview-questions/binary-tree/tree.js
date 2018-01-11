class Tree {
  constructor(val) {
    this.root = null;
  }

  calculateHeight(node) {
    if (node === null) return -1;
    return Math.max(this.calculateHeight(node.left), this.calculateHeight(node.right)) + 1;
  }

  compareTrees(node1, node2) {
    if (node1 === null || node2 === null) {
      if (node1 !== null || node2 !== null) {
        return false;
      }
      return true;
    }

    return (
      node1.val === node2.val &&
      this.compareTrees(node1.left, node2.left) &&
      this.compareTrees(node1.right, node2.right)
    );
  }
}

class Node {
  constructor(val) {
    this.val = val;
    this.right = null;
    this.left = null;
  }
}

const tree1 = new Tree();
tree1.root = new Node(5);
tree1.root.right = new Node(3);
tree1.root.left = new Node(5);
tree1.root.right.right = new Node(3);
tree1.root.right.right.right = new Node(5);
console.log(tree1.calculateHeight(tree1.root));

const tree2 = new Tree();
tree2.root = new Node(5);
tree2.root.right = new Node(3);
tree2.root.left = new Node(5);
tree2.root.right.right = new Node(3);
tree2.root.right.right.right = new Node(5);

console.log(tree1.compareTrees(tree1.root, tree2.root));
