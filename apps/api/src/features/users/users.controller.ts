import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  NotFoundException,
  Param,
  Patch,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '@/common/decorators/public.decorator';
import { CurrentUser } from '@/common/decorators/user.decorator';
import { FileValidationMessages } from '@/common/errors/file-validation-messages.enum';
import { FileValidationPipe } from '@/common/pipes';
import { FILE_SERVICE, FileServiceInterface } from '@/common/services/file.service';
import { User } from '../users/entities/user.entity';
import { UploadProfilePictureDto } from './dto/upload-profile-picture.dto';
import { MyProfileDto, PublicUserDto, UpdateUserDto } from './dto/user.dto';
import { UserErrorMessages } from './errors/user-error-message';
import { userToMyProfileDto, userToPublicDto } from './mappers/user.mapper';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject(FILE_SERVICE) private readonly fileService: FileServiceInterface,
  ) {}

  @Get(':id')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get user public profile' })
  @ApiParam({ description: 'User id', name: 'id' })
  @ApiException(() => NotFoundException, {
    description: UserErrorMessages.USER_NOT_FOUND,
  })
  @ApiResponse({
    description: 'User public profile',
    status: HttpStatus.OK,
    type: PublicUserDto,
  })
  async getUser(@Param('id') id: string): Promise<PublicUserDto> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(UserErrorMessages.USER_NOT_FOUND);
    }
    return userToPublicDto(user, this.fileService);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update user' })
  @ApiParam({ description: 'User id', name: 'id' })
  @ApiBody({ type: UpdateUserDto })
  @ApiException(() => BadRequestException, {
    description: UserErrorMessages.USER_CANNOT_MODIFY_OTHER_USER,
  })
  @ApiException(() => NotFoundException, {
    description: UserErrorMessages.USER_NOT_FOUND,
  })
  @ApiResponse({
    description: 'User updated successfully',
    status: HttpStatus.OK,
    type: MyProfileDto,
  })
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @CurrentUser() currentUser: User) {
    //TODO: send email to user if email is changed
    if (currentUser.id !== id) {
      throw new BadRequestException(UserErrorMessages.USER_CANNOT_MODIFY_OTHER_USER);
    }
    const updatedUser = await this.usersService.update(id, updateUserDto);
    return userToMyProfileDto(updatedUser, this.fileService);
  }

  @Put(':id/profile-picture')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Upload profile picture' })
  @ApiParam({ description: 'User id', name: 'id' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadProfilePictureDto })
  @ApiException(() => BadRequestException, {
    description: UserErrorMessages.USER_CANNOT_MODIFY_OTHER_USER,
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
  @ApiResponse({
    description: 'Profile picture uploaded successfully',
    status: HttpStatus.ACCEPTED,
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfilePicture(
    @Param('id') id: string,
    @UploadedFile(
      new FileValidationPipe({
        allowedMimeTypes: ['image/jpeg', 'image/png'],
        maxSize: 5 * 1024 * 1024,
        required: true,
      }),
    )
    file: Express.Multer.File,
    @CurrentUser() currentUser: User,
  ): Promise<void> {
    if (currentUser.id !== id) {
      throw new BadRequestException(UserErrorMessages.USER_CANNOT_MODIFY_OTHER_USER);
    }
    await this.usersService.uploadProfilePicture(id, file);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Delete user' })
  @ApiParam({ description: 'User id', name: 'id' })
  @ApiException(() => BadRequestException, {
    description: UserErrorMessages.USER_CANNOT_MODIFY_OTHER_USER,
  })
  @ApiResponse({
    description: 'User deleted successfully',
    status: HttpStatus.ACCEPTED,
  })
  async deleteUser(@Param('id') id: string, @CurrentUser() currentUser: User) {
    if (currentUser.id !== id) {
      throw new BadRequestException(UserErrorMessages.USER_CANNOT_MODIFY_OTHER_USER);
    }
    await this.usersService.delete(id);
  }
}
