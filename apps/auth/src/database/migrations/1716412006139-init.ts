import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1716412006139 implements MigrationInterface {
    name = 'Init1716412006139'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" text NOT NULL, "password" text NOT NULL, "first_name" text NOT NULL, "last_name" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_97672ac88f789774dd47f7c8be"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
