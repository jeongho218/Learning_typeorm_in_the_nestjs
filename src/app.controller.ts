import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('기본 페이지 - 삭제 예정')
@Controller()
export class AppController {
  @ApiOperation({ summary: '기본 api - 삭제 예정' })
  @Get()
  getRoot() {
    return 'typeorm in nest, just coding';
  }
}
