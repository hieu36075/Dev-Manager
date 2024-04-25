import { ICommand } from "@nestjs/cqrs";

export class UpdateProfileCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly fullName?: string,
    public readonly dayOfBirth?: string,
    public readonly description?: string,
    public readonly isManager?: boolean,
    public readonly managerId?: string,
    public readonly address?: string,
    public readonly avatarUrl?: string,
    public readonly positions?: string[],
  ) {}
}