import { CommonEntity } from '../common/entities/common.entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'BLOG',
})
export class BlogEntity extends CommonEntity {
  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  contents: string;
}
