import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Connection } from 'typeorm';

@Injectable()
export class TransactionInterceptor implements NestInterceptor {
  constructor(private readonly connection: Connection) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const req = context.switchToHttp().getRequest();
    req.transaction = queryRunner;

    console.log('Transaction started');

    return next.handle().pipe(
      tap(() => {
        console.log('Committing transaction'); 
        queryRunner.commitTransaction();
      }),
      catchError((error) => {
        console.log('Rolling back transaction');
        queryRunner.rollbackTransaction();
        return throwError(error);
      }),
    );
  }
}
