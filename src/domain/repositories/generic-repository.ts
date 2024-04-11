
export interface GenericRepository<T> {
    findAll(): Promise<T[]>;
    findById(id: string): Promise<T | undefined>;
    create( entity: T,manager?: any): Promise<T>;
    update(id: string, entity: Partial<T>): Promise<T | undefined>;
    delete(id: string): Promise<void>;
  }