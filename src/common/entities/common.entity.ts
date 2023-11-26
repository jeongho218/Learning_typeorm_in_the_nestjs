import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsUUID } from 'class-validator';
import { Exclude } from 'class-transformer';

export abstract class CommonEntity {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // 해당 열이 추가된 시각을 자동으로 기록
  // 만일 Postgres의 time zone이 'UTC'라면 UTC 기준으로 출력하고 'Asia/Seoul'라면 서울 기준으로 출력한다.
  // DB SQL QUERY : set time zone 'Asia/Seoul'; set time zone 'UTC'; show timezone;
  @CreateDateColumn({
    type: 'timestamptz' /* timestamp with time zone */,
  })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  // Soft Delete : 기존에는 null, 삭제시에 timestamp를 찍는다.
  @Exclude() // 리턴값에서 이 컬럼은 제외한다.
  // 이 기능은 main.ts의 ClassSerializerInterceptor에 의해 활성화된다.
  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt?: Date | null;
}
