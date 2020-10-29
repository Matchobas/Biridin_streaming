import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateMovies1603835841971 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'movie',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
          },
          {
            name: 'titulo',
            type: 'varchar',
          },
          {
            name: 'sinopse',
            type: 'varchar',
          },
          {
            name: 'avaliacao',
            type: 'decimal',
            isNullable: true,
          },
          {
            name: 'duracao',
            type: 'integer',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('movie');
  }
}
