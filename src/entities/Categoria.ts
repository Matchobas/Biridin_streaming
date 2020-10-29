/* eslint-disable camelcase */
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  ManyToMany,
} from 'typeorm';

import Movie from './Movie';

@Entity('categorias')
class Categoria {
  @PrimaryColumn()
  id: number;

  @Column()
  descricao: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => Movie, movie => movie.categories)
  movies: Movie[];
}

export default Categoria;
