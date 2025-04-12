import serverInstance from "@/config/api/serverInstance"
import { ProductCpu } from "@/types/index.types";
import { ProductRequestDTO } from "@/views/products-page/types/product.types";
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
            id: cpu['id_product'] || 0,
            sku: Number(cpu['SKU']) || 0,
            slug: cpu['slug'] || 'no-product'
        },
        naming: {
            name: cpu['name'] || 'No name',
            brand: cpu['brand'] || 'No brand',
            model: cpu['model'] || 'No model',
            category: cpu['product_category.name'] || 'No category'
        },
        sales: {
            status: cpu['status'] || 'unknown',
            price: Number(cpu['price']) || 0,
            inventoryQuantity: cpu['inventory_quantity'] || 0,
            discountPercentage: Number(cpu['discount.percentage']) || 0
        },
        specs: {
            socket: cpu['socket'] || 'No data',
            coreCount: cpu['core_count'] || 0,
            threadCount: cpu['thread_count'] || 0,
            baseClock: Number(cpu['base_clock']) || 0,
            boostClock: Number(cpu['boost_clock']) || 0,
            memoryType: cpu['memory_type'] || 'No data',
            pcieSupport: cpu['pcie_support'] || 'No data',
            cacheSize: cpu['cache_size'] || 0,
            tdp: cpu['tdp'] || 0,
            graphicsIntegrated: Boolean(cpu['has_integrated_graphics']) || false,
            techProc: cpu['techproc'] || 0,
            productivityScore: cpu['productivity'] || 0
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
        console.error("Could not fetch product by id.", error);
        return EMPTY_CPU_PRODUCT;
    }
}

export const fetchAllProducts = async (): Promise<ProductCpu[]> => {
    try {
        const response = await serverInstance.get<ProductRequestDTO[]>(
            `/products`
        );

        return response.data.map((product) => mapCpuProduct(product));
    } catch (error) {
        console.error("Could not fetch all products.", error);
        return [];
    }
}