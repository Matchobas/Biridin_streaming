/* eslint-disable camelcase */
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  OneToMany,
} from 'typeorm';

import MoviesToCategorias from './MoviesToCategorias';

@Entity('categoria')
class Categoria {
  @PrimaryColumn()
  id: number;

  @Column()
  descricao: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(
    () => MoviesToCategorias,
    moviesToCategorias => moviesToCategorias.movie,
  )
  moviesToCategorias: MoviesToCategorias[];
}

export default Categoria;
