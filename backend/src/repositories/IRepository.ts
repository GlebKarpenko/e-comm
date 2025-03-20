export interface Repository<T> {
    getAll(): Promise<T[]>;
    getById(id: number): Promise<T>;
    create(data: Partial<T>): Promise<any>;
    update(id: number, data: Partial<T>): Promise<any>;
    delete(id: number): Promise<any>;
}