import { HttpException, HttpStatus } from '@nestjs/common';

export class LoginErrorException extends HttpException {
  constructor(
    message: string | Record<string, any> = 'Forbidden',
    http_code: number = HttpStatus.NOT_FOUND,
  ) {
    if (typeof message == 'string')
      message = {
        status: 'failed',
        message: message,
      };

    super(message, http_code);
  }
}
