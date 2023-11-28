import { BlogEntity } from '../blogs/blogs.entity';
import { CommonEntity } from '../common/entities/common.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity({
  name: 'TAG',
})
export class TagEntity extends CommonEntity {
  @Column({ type: 'varchar', nullable: true })
  name: string;

  // Relation

  @ManyToMany(() => BlogEntity, (blog: BlogEntity) => blog.tags)
  // 매개 테이블에 대한 설정은 BlogEntity에서 했으므로 이 곳에서는 안해도 된다.
  blogs: BlogEntity[];
}
