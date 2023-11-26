import { CommonEntity } from '../common/entities/common.entity';
import { Entity } from 'typeorm';

@Entity({
  name: 'VISITOR',
})
export class VisitorEntity extends CommonEntity {
  //
}
