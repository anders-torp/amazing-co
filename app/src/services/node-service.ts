import Node from "../models/node";
import MySQLRepository from "../repositories/mysql-repository";

export class NodeService {
  public repository = new MySQLRepository();

  //  Change parent node
  public async changeParent(nodeId: number, newParentId: number) {
    const node = await this.repository.getById(nodeId);
    // Remove reference to node from old parent (child).
    if (node.parent != null) {
      const parent = await this.repository.getById(node.parent);
      await this.removeChild(parent, node);
    }

    const newParent = await this.repository.getById(newParentId);
    await this.addChild(newParent, node);
  }

  public async getChildren(nodeId: number): Promise<number[]> {
    const node = await this.repository.getById(nodeId);

    const res: number[] = [];

    if (node.leftChild != null) {
      const leftChild = await this.repository.getById(node.leftChild);
      await this.getSiblings(leftChild, res);
    }
    return res;
  }

  public async getRoot(nodeId: number): Promise<number> {
    const node = await this.repository.getById(nodeId);
    if (node.parent == null) {
      return nodeId;
    }
    return await this.getRoot(node.parent);
  }

  public async getHeightForNodeId(nodeId: number): Promise<number> {
    const node = await this.repository.getById(nodeId);
    if (!node) {
      return -1;
    }

    return await this.getHeight(node, 0);
  }

  private async addChild(parent: Node, child: Node): Promise<void> {
    child.rightSibling = null;
    await this.setParent(child, parent.id);

    if (parent.leftChild == null) {
      parent.leftChild = child.id;
      await this.repository.update(parent);
    } else {
      const leftChild = await this.repository.getById(parent.leftChild);

      await this.addSibling(leftChild, child);
    }
  }

  // Remove child fra parent
  private async removeChild(parent: Node, childToRemove: Node) {
    if (parent.leftChild == null) {
      return;
    }

    // If child equals leftchild
    if (parent.leftChild === childToRemove.id) {
      parent.leftChild = childToRemove.rightSibling;
      await this.repository.update(parent);
    } else {
      // remove sibling
      const leftChild = await this.repository.getById(parent.leftChild);
      await this.removeSibling(leftChild, childToRemove);
    }
  }

  private async removeSibling(sibling: Node, childToRemove: Node) {
    if (sibling.rightSibling == null) {
      return;
    }

    if (sibling.rightSibling === childToRemove.id) {
      sibling.rightSibling = childToRemove.rightSibling;
      await this.repository.update(sibling);
      return;
    } else {
      const rightSibling = await this.repository.getById(sibling.rightSibling);

      await this.removeSibling(rightSibling, childToRemove);
    }

    return;
  }

  private async getHeight(node: Node, height: number): Promise<number> {
    if (node.parent == null) {
      return height;
    }
    const parent = await this.repository.getById(node.parent);

    if (!parent) {
      return height;
    }
    return await this.getHeight(parent, height + 1);
  }

  private async getSiblings(node: Node, siblings: number[]): Promise<number[]> {
    siblings.push(node.id);
    if (node.rightSibling != null) {
      const rightSibling = await this.repository.getById(node.rightSibling);

      await this.getSiblings(rightSibling, siblings);
    }
    return siblings;
  }

  private async addSibling(node: Node, sibling: Node) {
    if (node.rightSibling == null) {
      node.rightSibling = sibling.id;
      if (node.parent != null) {
        await this.setParent(node, node.parent);
      }
    } else {
      const rightSibling = await this.repository.getById(node.rightSibling);

      await this.addSibling(rightSibling, sibling);
    }
  }

  private async setParent(node: Node, parentId: number) {
    node.parent = parentId;
    await this.repository.update(node);
  }
}
