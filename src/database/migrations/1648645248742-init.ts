import {MigrationInterface, QueryRunner} from "typeorm";

export class init1648645248742 implements MigrationInterface {
    name = 'init1648645248742'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`bookmark_group\` (\`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(75) NOT NULL, \`status\` enum ('0', '1') NULL DEFAULT '1', \`totalBookmarks\` int NULL DEFAULT '0', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`bookmark\` ADD CONSTRAINT \`FK_b5b2c7740c8a67a77ce90e6d6f7\` FOREIGN KEY (\`bookMarkGroupId\`) REFERENCES \`bookmark_group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bookmark\` DROP FOREIGN KEY \`FK_b5b2c7740c8a67a77ce90e6d6f7\``);
        await queryRunner.query(`DROP TABLE \`bookmark_group\``);
    }

}
