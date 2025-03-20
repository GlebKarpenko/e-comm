export interface User {
    id_user: number,
    username: string,
    email: string,
    provider: string,
    provider_id: string,
    role: 'customer' | 'admin',
    created_at: string,
    modified_at: string,
}

export interface CreateUserDTO {
    id_user: number,
    username: string,
    email: string,
    provider: string,
    provider_id: string,
    role: 'customer' | 'admin',
}

export interface UpdateUserDTO {
    username: string,
    email: string,
    provider: string,
    provider_id: string,
    role: 'customer' | 'admin',
}