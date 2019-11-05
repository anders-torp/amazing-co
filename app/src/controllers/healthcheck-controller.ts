import { Controller, Get, Route } from "tsoa";
import MySQLRepository from "../repositories/mysql-repository";

@Route("HealthCheck")
export class HealthCheckController extends Controller {
  @Get()
  public async get(): Promise<boolean> {
    try {
      const mysql = new MySQLRepository();
      await mysql.createConnection();
      return true;
    } catch (error) {
      console.log(error);
      this.setStatus(500);
      return false;
    }
  }
}
