export interface ProductCpu {
    identification: {
        id: number,
        sku: number,
        slug: string,
    },
    naming: {
        name: string,
        brand: string,
        model: string,
        category: string
    },
    sales: {
        status: string,
        price: number,
        inventoryQuantity: number,
        discountPercentage: number
    },
    specs: {
        socket: string,
        coreCount: number,
        threadCount: number,
        baseClock: number,
        boostClock: number,
        memoryType: string,
        pcieSupport: string,
        cacheSize: number,
        tdp: number,
        graphicsIntegrated: boolean,
        techProc: number,
        productivityScore: number
    },
    meta: {
        description: string,
        imageUrl: string,
        imageMime: string,
        imageSize: { w: number, h: number },
        createdAt: Date
    }
}