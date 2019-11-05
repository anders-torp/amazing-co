import { Controller, Get, Route, Post } from "tsoa";
import MySQLRepository from "../repositories/mysql-repository";
import { NodeService } from "../services/node-service";

@Route("node")
export class NodeController extends Controller {
  public service = new NodeService();
  public repository = new MySQLRepository();

  @Get("{nodeId}/height")
  public async getHeight(nodeId: number): Promise<string> {
    const result = await this.service.getHeightForNodeId(nodeId);
    return result.toString();
  }

  @Get("{nodeId}/root")
  public async getRoot(nodeId: number): Promise<string> {
    const result = await this.service.getRoot(nodeId);
    return result.toString();
  }

  @Get("{nodeId}/children")
  public async getChildren(nodeId: number): Promise<number[]> {
    return await this.service.getChildren(nodeId);
  }

  @Post("{nodeId}/parent/{parentId}")
  public async changeParent(nodeId: number, parentId: number): Promise<void> {
    // NOTE: Setting the parent to one of the nodes children doesn't work
    await this.service.changeParent(nodeId, parentId);
    return;
  }

  @Post()
  public async newNode(): Promise<number> {
    try {
      const nodeid = await this.repository.newNode();
      return nodeid;
    } catch (error) {
      console.log(error);
      this.setStatus(400);
      return -1;
    }
  }
}
