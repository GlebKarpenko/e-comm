export interface IRepository<T, DTO> {
    getAll(): Promise<T[]>;
    getById(id: number): Promise<T>;
    create(data: Partial<DTO>): Promise<any>;
    update(id: number, data: Partial<DTO>): Promise<any>;
    delete(id: number): Promise<any>;
}