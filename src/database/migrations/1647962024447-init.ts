import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1647962024447 implements MigrationInterface {
  name = 'init1647962024447';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`bookmark_group\` (\`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`bookmark\` (\`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`link\` varchar(255) NOT NULL, \`bookMarkGroupId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bookmark\` ADD CONSTRAINT \`FK_b5b2c7740c8a67a77ce90e6d6f7\` FOREIGN KEY (\`bookMarkGroupId\`) REFERENCES \`bookmark_group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`bookmark\` DROP FOREIGN KEY \`FK_b5b2c7740c8a67a77ce90e6d6f7\``,
    );
    await queryRunner.query(`DROP TABLE \`bookmark\``);
    await queryRunner.query(`DROP TABLE \`bookmark_group\``);
  }
}
