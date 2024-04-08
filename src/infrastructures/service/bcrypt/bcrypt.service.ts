import { IBcrypRepository } from '@/domain/adapter/bcrypt.repository';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';


@Injectable()
export class BcryptService implements IBcrypRepository {
  rounds: number = 10;

  async hash(hashString: string): Promise<string> {
    return await bcrypt.hash(hashString, this.rounds);
  }

  async compare(password: string, hashPassword: string): Promise<boolean> {
    console.log('as', password)
    return await bcrypt.compare(password, hashPassword);
  }
}