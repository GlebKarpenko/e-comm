import serverInstance from "@/config/api/serverInstance"
import { ProductCpu, ProductRequestDTO } from "@/views/products-page/types/product.types";
import { EMPTY_CPU_PRODUCT } from "@/views/products-page/types/product.types";

const parseImageSize = (sizeLine: string): { w: number, h: number} => {
    const parts = sizeLine.split('x');

    if (parts.length === 2) {
        const w = parseInt(parts[0], 10);
        const h = parseInt(parts[1], 10);
        if (!isNaN(w) && !isNaN(h)) {
          return { w, h };
        }
    }
    return { w: 0, h: 0};
}

const mapCpuProduct = (cpu: ProductRequestDTO): ProductCpu => {
    return {
        identification: {
            id: cpu['id_product'],
            sku: Number(cpu['SKU']),
            slug: cpu['slug']
        },
        naming: {
            name: cpu['name'],
            brand: cpu['brand'],
            model: cpu['model'],
            category: cpu['product_category.name']
        },
        sales: {
            status: cpu['status'],
            price: Number(cpu['price']) || 0,
            inventoryQuantity: cpu['inventory_quantity'],
            discountPercentage: Number(cpu['discount.percentage'])
        },
        specs: {
            socket: cpu['socket'],
            coreCount: cpu['core_count'],
            threadCount: cpu['thread_count'],
            baseClock: Number(cpu['base_clock']),
            boostClock: Number(cpu['boost_clock']),
            memoryType: cpu['memory_type'],
            pcieSupport: cpu['pcie_support'],
            cacheSize: cpu['cache_size'],
            tdp: cpu['tdp'],
            graphicsIntegrated: Boolean(cpu['has_integrated_graphics']),
            techProc: cpu['techproc'],
            productivityScore: cpu['productivity']
        },
        meta: {
            description: cpu['desc'],
            imageUrl: cpu['image'],
            imageMime: cpu['image_mime'],
            imageSize: parseImageSize(cpu['image_size']),
            createdAt: new Date(cpu['created_at'])
        }
    }
}

export const fetchProduct = async (id: number): Promise<ProductCpu> => {
    try {
        const response = await serverInstance.get<ProductRequestDTO>(
            `/products/${id}`
        );

        return mapCpuProduct(response.data);
    } catch (error) {
        console.error(error);
        return EMPTY_CPU_PRODUCT;
    }
}