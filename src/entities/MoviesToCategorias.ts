/* eslint-disable camelcase */
import {
  PrimaryColumn,
  Entity,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Movie from './Movie';
import Categoria from './Categoria';

@Entity('movie_categoria')
class MoviesToCategorias {
  @PrimaryColumn()
  id: number;

  @Column('int')
  movie_id: number;

  @Column('int')
  categoria_id: number;

  @UpdateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(_ => Movie, movie => movie.moviesToCategorias)
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;

  @ManyToOne(_ => Categoria, categoria => categoria.moviesToCategorias)
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;
}

export default MoviesToCategorias;
