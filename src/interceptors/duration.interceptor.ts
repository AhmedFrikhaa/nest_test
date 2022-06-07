import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class DurationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    console.log('request sent at ', now);
    return next.handle().pipe(
      tap(() => {
        const responseTime = Date.now();
        console.log('response received at ', responseTime);
        const timeTaken = responseTime - now;
        console.log('response received in ', timeTaken, '   ms');
      }),
    );
  }
}
