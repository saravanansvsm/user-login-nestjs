import {MigrationInterface, QueryRunner} from "typeorm";

export class init1649646794196 implements MigrationInterface {
    name = 'init1649646794196'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "students_entity" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "secondName" character varying NOT NULL, "email" character varying NOT NULL, "phone" integer NOT NULL, CONSTRAINT "PK_f0c9c84afbc4c706755ec0d7424" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "productlist" ("id" SERIAL NOT NULL, "productlist" character varying(120) NOT NULL, "brand" character varying(120) NOT NULL, CONSTRAINT "PK_388a982caea6d3f71d2ef56b552" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying(120) NOT NULL, "modal" character varying(120) NOT NULL, "code" character varying(120) NOT NULL, "price" character varying(120) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(120) NOT NULL, "email" character varying(120) NOT NULL, "password" character varying(120), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "productlist"`);
        await queryRunner.query(`DROP TABLE "students_entity"`);
    }

}
