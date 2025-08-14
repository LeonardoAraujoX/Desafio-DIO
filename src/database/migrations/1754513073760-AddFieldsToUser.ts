import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddFieldsToUser1754513073760 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn("users", new TableColumn({
      name: "name",
      type: "string",
      isNullable: false,
    }));

    await queryRunner.addColumn("users", new TableColumn({
      name: "email",
      type: "string",
      isNullable: false,
      isUnique: true,
    }));

    await queryRunner.addColumn("users", new TableColumn({
      name: "password",
      type: "string",
      isNullable: false,
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("users", "password");
    await queryRunner.dropColumn("users", "email");
    await queryRunner.dropColumn("users", "name");
  }
}

