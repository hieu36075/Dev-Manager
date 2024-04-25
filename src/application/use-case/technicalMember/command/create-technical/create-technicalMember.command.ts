import { ICommand } from '@nestjs/cqrs';

export class CreateTechnicalMemberCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly level: string,
    public readonly experience: string,
    // public readonly technicalId: string,
  ) {}
}
