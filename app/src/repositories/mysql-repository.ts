import Node from "../models/node";
import { NodeDTO } from "../models/nodeDTO";
// tslint:disable-next-line: no-var-requires
const mysql = require("mysql2/promise");
const table = "tree";

export default class MySQLRespository {
  // Create db connection
  public async createConnection() {
    return await mysql.createConnection({
      host: process.env.DATABASE_HOST,
      port: process.env.PORT,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
    });
  }

  // Get node
  public async getById(id: number): Promise<NodeDTO> {
    const con = await this.createConnection();
    const [rows, fields] = await con.query(
      `SELECT * from ${table} WHERE id = ${id.toString()}`,
    );
    con.end();

    if (rows.length === 0) {
      return {} as NodeDTO;
    }

    return {
      id: rows[0].id,
      leftChild: rows[0].leftChild,
      rightSibling: rows[0].rightSibling,
      parent: rows[0].parent,
    } as NodeDTO;
  }

  // Update an existing node
  public async update(item: Node): Promise<void> {
    const con = await this.createConnection();
    await con.query(
      `  UPDATE ${table}
      SET parent = ${item.parent}, leftChild = ${item.leftChild}, rightSibling = ${item.rightSibling}
      WHERE id = ${item.id}`,
    );
    con.end();

    return;
  }

  // Create new new node and return id
  public async newNode(): Promise<number> {
    const con = await this.createConnection();
    let [rows, fields] = await con.query(
      `INSERT INTO ${table} (id) VALUES (null)`,
    );

    if (rows.length === 0) {
      con.end();
      throw new Error("Could not create new node.");
    }

    [rows, fields] = await con.query(`SELECT LAST_INSERT_ID()`);
    con.end();

    return rows[0]["LAST_INSERT_ID()"];
  }
}
