import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  ConflictException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
// import { status } from '@grpc/grpc-js';

// @Catch()
// export class GrpcToHttpExceptionFilter implements ExceptionFilter {
//   catch(exception: any, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse();

//     // gRPC error
//     const code = exception.code;
//     const message = exception.details || exception.message;

//     let httpException: HttpException;

//     switch (code) {
//       case status.ALREADY_EXISTS:
//         httpException = new ConflictException(message);
//         break;

//       case status.INVALID_ARGUMENT:
//         httpException = new BadRequestException(message);
//         break;

//       case status.NOT_FOUND:
//         httpException = new BadRequestException(message);
//         break;

//       case status.UNAUTHENTICATED:
//         httpException = new UnauthorizedException(message);
//         break;

//       default:
//         httpException = new BadRequestException(
//           message || 'Internal server error',
//         );
//     }

//     response
//       .status(httpException.getStatus())
//       .json(httpException.getResponse());
//   }
// }
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class GrpcToHttpExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const error = exception.getError() as any;

    response.status(400).json({
      statusCode: 400,
      message: error.message || 'Bad Request',
      error: error.code || 'Bad Request',
      details: error.details || [],
    });
  }
}