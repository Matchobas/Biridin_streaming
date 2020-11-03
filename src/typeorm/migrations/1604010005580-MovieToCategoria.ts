import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class MovieToCategoria1604010005580
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'movie_categoria',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
          },
          {
            name: 'movie_id',
            type: 'integer',
          },
          {
            name: 'categoria_id',
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

        foreignKeys: [
          {
            name: 'movies_movie_categoria_fk',
            referencedTableName: 'movie',
            referencedColumnNames: ['id'],
            columnNames: ['movie_id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          {
            name: 'categorias_movie_categoria_fk',
            referencedTableName: 'categoria',
            referencedColumnNames: ['id'],
            columnNames: ['categoria_id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('movie_categoria');
  }
}
