export interface RangeSelector {
    label: string,
    min: number,
    max: number,
    initialRange: number[]
}

export interface FilterState {
    price: [number, number]
    perfomance_range: [number, number]
    brand?: string[]
    socket?: string[]
    pcie_support?: string[]
    memory_type?: string[]
    cores?: string[]
    threads?: string[]
    clock?: string[]
    tdp?: string[]
    cache_size?: string[]
    graphics?: string[]
    techproc?: string[]
    category?: string[]
}