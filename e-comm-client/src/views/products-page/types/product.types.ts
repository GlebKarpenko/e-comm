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

export const EMPTY_CPU_PRODUCT = {
    "identification": {
      "id": 0,
      "sku": 0,
      "slug": ""
    },
    "naming": {
      "name": "",
      "brand": "",
      "model": "",
      "category": ""
    },
    "sales": {
      "status": "",
      "price": 0,
      "inventoryQuantity": 0,
      "discountPercentage": 0
    },
    "specs": {
      "socket": "",
      "coreCount": 0,
      "threadCount": 0,
      "baseClock": 0,
      "boostClock": 0,
      "memoryType": "",
      "pcieSupport": "",
      "cacheSize": 0,
      "tdp": 0,
      "graphicsIntegrated": false,
      "techProc": 0,
      "productivityScore": 0
    },
    "meta": {
      "description": "",
      "imageUrl": "",
      "imageMime": "",
      "imageSize": {
        "w": 0,
        "h": 0
      },
      "createdAt": new Date("2025-04-08T16:52:03.000Z")
    }
}

export interface ProductRequestDTO {
    id_product: number;
    name: string;
    brand: string;
    model: string;
    socket: string;
    core_count: number;
    thread_count: number;
    base_clock: string;
    boost_clock: string;
    memory_type: string;
    pcie_support: string;
    cache_size: number;
    tdp: number;
    has_integrated_graphics: boolean;
    techproc: number;
    productivity: number;
    slug: string;
    desc: string;
    SKU: string;
    image: string;
    image_mime: string;
    image_size: string;
    status: string;
    id_category: number;
    price: string;
    id_discount: number;
    created_at: string;
    modified_at: string;
    deleted_at: string | null;
    inventory_quantity: number;
    product_category: number;
    "product_category.name": string;
    "discount.id_discount": number;
    "discount.percentage": string;
}