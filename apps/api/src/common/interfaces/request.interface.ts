import { Request } from 'express';
import { SafeUser } from './user.interface';

export interface RequestWithUser extends Request {
  user: SafeUser & {
    userId: number;
    sessionId: number;
  };
}
