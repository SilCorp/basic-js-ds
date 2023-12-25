const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.data = undefined;
    this.left = undefined;
    this.right = undefined;
  }

  root() {
    if (this.data === undefined) {
      return null;
    }

    return this;
  }

  add(data) {
    if (this.data === undefined) {
      this.data = data;
      return;
    }

    if (data < this.data) {
      if (this.left === undefined) {
        this.left = new BinarySearchTree();
      }

      return this.left.add(data);
    }

    if (data > this.data) {
      if (this.right === undefined) {
        this.right = new BinarySearchTree();
      }

      return this.right.add(data);
    }
  }

  has(data) {
    return Boolean(this.find(data));
  }

  find(data) {
    if (data === this.data) {
      return this;
    }

    if (data < this.data && this.left) {
      return this.left.find(data);
    }

    if (data > this.data && this.right) {
      return this.right.find(data);
    }

    return null;
  }

  remove(data) {
    let parentNode = this;
    let nodeToDelete = this;
    let nodeToDeleteSide;
    while (nodeToDelete.data !== data) {
      parentNode = nodeToDelete;

      if (data < parentNode.data) {
        nodeToDelete = parentNode.left;
        nodeToDeleteSide = "left";
      } else {
        nodeToDelete = parentNode.right;
        nodeToDeleteSide = "right";
      }

      if (nodeToDelete === undefined) return;
    }

    //   If no children
    if (nodeToDelete.left === undefined && nodeToDelete.right === undefined) {
      parentNode[nodeToDeleteSide] = undefined;
      return;
    }

    //   If no left child
    if (nodeToDelete.left === undefined) {
      parentNode[nodeToDeleteSide] = nodeToDelete.right;
      return;
    }
    //   If no right child
    if (nodeToDelete.right === undefined) {
      parentNode[nodeToDeleteSide] = nodeToDelete.left;
      return;
    }

    //   If all child
    let nodeToDeleteRightChildMinNode = nodeToDelete.right;

    while (nodeToDeleteRightChildMinNode.left) {
      nodeToDeleteRightChildMinNode = nodeToDeleteRightChildMinNode.left;
    }

    this.remove(nodeToDeleteRightChildMinNode.data);
    nodeToDelete.data = nodeToDeleteRightChildMinNode.data;
  }

  min() {
    if (this.left) {
      return this.left.min();
    }

    return this.data ?? null;
  }

  max() {
    if (this.right) {
      return this.right.max();
    }

    return this.data ?? null;
  }
}

module.exports = {
  BinarySearchTree
};