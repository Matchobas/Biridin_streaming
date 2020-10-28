/* eslint-disable camelcase */
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

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
}

export default Categoria;
