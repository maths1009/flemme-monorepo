import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
  BadRequestException,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Put,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { UploadProfilePictureDto } from './dto/upload-profile-picture.dto';
import { UserErrorMessages } from './errors/user-error-message';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Put(':id/profile-picture')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Upload profile picture' })
  @ApiParam({ name: 'id', description: 'User id' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadProfilePictureDto })
  @ApiException(() => BadRequestException, {
    description:
      UserErrorMessages.USER_CANNOT_MODIFY_OTHER_USER_PROFILE_PICTURE,
  })
  @ApiException(() => BadRequestException, {
    description: UserErrorMessages.USER_NOT_FOUND,
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfilePicture(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ): Promise<void> {
    const currentUser = req.user!;
    if (currentUser.id !== id) {
      throw new BadRequestException(
        UserErrorMessages.USER_CANNOT_MODIFY_OTHER_USER_PROFILE_PICTURE,
      );
    }
    await this.usersService.uploadProfilePicture(id, file);
  }
}
