/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import Categoria from './Categoria';

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

  @ManyToMany(() => Categoria, categoria => categoria.movies)
  @JoinTable()
  categories: Categoria[];
}

export default Movie;
