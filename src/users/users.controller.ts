import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { UserLogInDTO } from './dtos/user-login.dto';
import { UserRegisterDTO } from './dtos/user-register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './users.entity';
import { Repository } from 'typeorm';
import { OnlyPrivateInterceptor } from '../common/interceptors/only-private.interceptor';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { UserDTO } from './dtos/user.dto';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('USER')
@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  @ApiOperation({ summary: ' 내 정보 가져오기' })
  @Get()
  // 브라우저의 쿠키에서 JWT 정보를 가져와 파싱 및 해석한다.
  @UseGuards(JwtAuthGuard)
  // JwtAuthGuard에서 user를 리턴받아 OnlyPrivateInterceptor에게 넘긴다.
  @UseInterceptors(OnlyPrivateInterceptor)
  // 설명이 복잡해보이지만 역할을 '현재 사용자가 제대로 로그인 하였는가' 검사하는 것이다.
  async getCurrentUser(@CurrentUser() currentUser: UserDTO) {
    return currentUser;
  }

  @ApiOperation({ summary: '회원가입' })
  @Post()
  async signUp(@Body() userRegisterDTO: UserRegisterDTO) {
    return await this.usersService.registerUser(userRegisterDTO);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  async logIn(
    @Body() userLoginDTO: UserLogInDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { jwt, user } = await this.usersService.verifyUserAndSignJwt(
      userLoginDTO.email,
      userLoginDTO.password,
    );
    response.cookie('jwt', jwt, { httpOnly: true }).status(200);
    return user;
  }

  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  async logOut(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
  }
}
