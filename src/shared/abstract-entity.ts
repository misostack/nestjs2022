import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class AbstractEntity {
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
