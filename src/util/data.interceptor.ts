import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class DataInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const id = Math.random().toString(36).substr(2, 9);
    const request = context.switchToHttp().getRequest();
    request.id = id;

    return next
      .handle()
      .pipe(
        map(result => {
          return {
            id: id,
            data: result
          };
        })
      );
  }
}
