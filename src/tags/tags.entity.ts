import { CommonEntity } from '../common/entities/common.entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'TAG',
})
export class TagEntity extends CommonEntity {
  @Column({ type: 'varchar', nullable: true })
  name: string;
}
