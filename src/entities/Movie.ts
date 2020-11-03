/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

import MoviesToCategorias from './MoviesToCategorias';

@Entity('movie')
class Movie {
  @PrimaryColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  sinopse: string;

  @Column('int')
  duracao: number;

  @Column('int')
  avaliacao: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(
    () => MoviesToCategorias,
    moviesToCategorias => moviesToCategorias.categoria,
  )
  moviesToCategorias: MoviesToCategorias[];
}

export default Movie;
