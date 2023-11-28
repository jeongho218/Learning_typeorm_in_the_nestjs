import { UserEntity } from '../users/users.entity';
import { CommonEntity } from '../common/entities/common.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  JoinTable,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { TagEntity } from '../tags/tags.entity';
import { VisitorEntity } from '../visitors/visitors.entity';

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

  // Relation

  @ManyToOne(() => UserEntity, (author: UserEntity) => author.blogs, {
    // author는 UserEntity의 alias(별명)
    onDelete: 'CASCADE', // 사용자가 삭제되면 블로그도 삭제된다.
  })
  @JoinColumn([
    // foreignKey 정보
    {
      referencedColumnName: 'id', // UserEntity의 컬럼 'id'
      name: 'author_id', // BlogEntity에 저장될 컬럼명
    },
  ])
  author: UserEntity;

  @ManyToMany(() => TagEntity, (tag: TagEntity) => tag.blogs, {
    cascade: true,
    // 블로그를 통해 태그가 추가, 수정, 삭제되고 블로그를 저장하면 태그도 저장된다.
  })
  @JoinTable({
    // blogs와 tag의 중간 매개 테이블을 생성
    name: 'BLOG_TAG', // 매개 테이블의 이름
    joinColumn: {
      // 자기 자신 엔터티 (blogs)
      referencedColumnName: 'id', // 매개 테이블로 보낼 컬럼
      name: 'blog_id', // 매개 테이블에서 쓰일 컬럼명
    },
    inverseJoinColumn: {
      // 상대 엔터티(tag)
      referencedColumnName: 'id', // 매개 테이블로 가져올 컬럼
      name: 'tag_id', // 매개 테이블에서 쓰일 컬럼명
    },
  })
  tags: TagEntity[];

  @OneToMany(() => VisitorEntity, (visitor: VisitorEntity) => visitor.blogs, {
    cascade: true,
  })
  visitors: VisitorEntity[];
}
