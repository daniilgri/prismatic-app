import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

import {
  PRISMA_CLIENT_ERROR_CODES,
  ERROR_CODE_TO_HTTP_STATUS_MAP,
} from '../constants/prisma-client-errors.constant';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const responseBody =
      ERROR_CODE_TO_HTTP_STATUS_MAP[
        exception.code as PRISMA_CLIENT_ERROR_CODES
      ];

    if (responseBody) {
      return response.status(responseBody.statusCode).json(responseBody);
    }

    super.catch(exception, host);
  }
}
