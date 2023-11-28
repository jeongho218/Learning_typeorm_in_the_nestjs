import { IsIP, IsNotEmpty } from 'class-validator';
import { CommonEntity } from '../common/entities/common.entity';
import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BlogEntity } from '../blogs/blogs.entity';

@Entity({
  name: 'VISITOR',
})
export class VisitorEntity extends CommonEntity {
  @IsIP()
  @IsNotEmpty()
  @Column({ type: 'inet', nullable: false })
  ip: string;

  // Relation

  @ManyToOne(() => BlogEntity, (blogs: BlogEntity) => blogs.visitors, {
    onDelete: 'SET NULL', // 참조하는 blog의 데이터가 삭제되면
    // visitor 엔터티에서의 해당 데이터는 null로 표시한다.
  })
  @JoinColumn([{ name: 'blog_id', referencedColumnName: 'id' }])
  blogs: BlogEntity;
}
