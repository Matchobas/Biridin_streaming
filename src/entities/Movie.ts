/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('movies')
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
}

export default Movie;
