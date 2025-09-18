import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
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
import { FileValidationPipe } from '@/common/pipes';
import { FileValidationMessages } from '@/common/errors/file-validation-messages.enum';
import { UpdateUserDto } from './dto/user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Update user' })
  @ApiParam({ name: 'id', description: 'User id' })
  @ApiBody({ type: UpdateUserDto })
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Req() req: Request) {
    //TODO: send email to user if email is changed
    const currentUser = req.user!;
    if (currentUser.id !== id) {
      throw new BadRequestException(
        UserErrorMessages.USER_CANNOT_MODIFY_OTHER_USER,
      );
    }
    return this.usersService.update(id, updateUserDto);
  }


  @Put(':id/profile-picture')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Upload profile picture' })
  @ApiParam({ name: 'id', description: 'User id' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadProfilePictureDto })
  @ApiException(() => BadRequestException, {
    description:
      UserErrorMessages.USER_CANNOT_MODIFY_OTHER_USER,
  })
  @ApiException(() => BadRequestException, {
    description: UserErrorMessages.USER_NOT_FOUND,
  })
  @ApiException(() => BadRequestException, {
    description: FileValidationMessages.FILE_REQUIRED,
  })
  @ApiException(() => BadRequestException, {
    description: FileValidationMessages.FILE_TOO_LARGE,
  })
  @ApiException(() => BadRequestException, {
    description: FileValidationMessages.FILE_TYPE_NOT_ALLOWED,
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfilePicture(
    @Param('id') id: string,
    @UploadedFile(new FileValidationPipe({
      maxSize: 5 * 1024 * 1024,
      allowedMimeTypes: ['image/jpeg', 'image/png'],
      required: true,
    })) file: Express.Multer.File,
    @Req() req: Request,
  ): Promise<void> {
    const currentUser = req.user!;
    if (currentUser.id !== id) {
      throw new BadRequestException(
        UserErrorMessages.USER_CANNOT_MODIFY_OTHER_USER,
      );
    }
    await this.usersService.uploadProfilePicture(id, file);
  }
}
