import {MigrationInterface, QueryRunner} from "typeorm";

export class Valute1614941523245 implements MigrationInterface {
    name = 'Valute1614941523245'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "valute_model" ("id" SERIAL NOT NULL, "valute_id" character varying NOT NULL, "num_code" character varying NOT NULL, "char_code" character varying NOT NULL, "nominal" integer NOT NULL, "name" character varying NOT NULL, "value" numeric(9,4) NOT NULL DEFAULT 0, "previous" numeric(9,4) NOT NULL DEFAULT 0, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_db6d7caa16ab47e92780e713e77" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "valute_model"`, undefined);
    }

}
