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

  // Relation

  /* ERD 참조
  USER 엔터티에서 USER_PROFILE 엔터티의 '프로필 아이디'컬럼을 가져오고,
  반대로 USER_PROFILE 엔터테이서 USER 엔터티의 컬럼을 가져오는 것은 없기 때문에(단방향)
  이 엔터티에서의 관계 설정은 하지 않는다.
   */
}
