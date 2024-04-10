// import { Injectable } from '@nestjs/common';
// import { EntityManager } from 'typeorm';

// @Injectable()
// export class TransactionManager {
//   constructor(private readonly entityManager: EntityManager) {}

//   async startTransaction(): Promise<void> {
//     await this.entityManager.transaction();
//   }

//   async commitTransaction(): Promise<void> {
//     await this.entityManager.commitTransaction();
//   }

//   async rollbackTransaction(): Promise<void> {
//     await this.entityManager.rollbackTransaction();
//   }
// }
