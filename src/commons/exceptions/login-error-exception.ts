import { HttpException, HttpStatus } from '@nestjs/common';

export class LoginErrorException extends HttpException {
  constructor(message: string | Record<string, any> = 'Forbidden') {
    super(message, HttpStatus.FORBIDDEN);
  }
}
