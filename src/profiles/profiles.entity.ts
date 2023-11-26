import { CommonEntity } from '../common/entities/common.entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'USER_PROFILE',
})
export class ProfileEntity extends CommonEntity {
  @Column({ type: 'varchar', nullable: true })
  bio: string; // 간단한 소개

  @Column({ type: 'varchar', nullable: true })
  site: string;
}
