

export interface IBcrypRepository{
    hash(hashString: string): Promise<string>;
    compare(password:string, hashPassword: string): Promise<Boolean>
}