
export interface GenericRepository<T> {
    findAll(option? : any): Promise<T[]>;
    findById(id: string): Promise<T | undefined>;
    create( entity: Partial<T>,manager?: any): Promise<T>;
    update(id: string, entity: Partial<T>, manager?: any): Promise<T | undefined>;
    delete(id: string): Promise<void>;
  }