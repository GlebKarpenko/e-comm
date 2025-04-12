import { ProductCpu } from "../types/product.types";
import { FilterState } from "../types/filter.types";
import { Metrics } from "@/utils/parse.enum";
import { parseRange } from "@/utils/parse";

export function applyFilters (
    products: ProductCpu[], 
    filters: FilterState
): ProductCpu[] {
    return products.filter(product => {
        if (filters.price 
            && !isInRange(product.sales.price, filters.price)
        ) return false;

        if (filters.perfomance_range 
            && !isInRange(product.specs.productivityScore, filters.perfomance_range)
        ) return false;

        const filterPairs: FilterPair[] = [
            { filter: filters.brand,        value: product.naming.brand.split(' ')[0]},
            { filter: filters.socket,       value: product.specs.socket              },
            { filter: filters.pcie_support, value: product.specs.pcieSupport         },
            { filter: filters.memory_type,  value: product.specs.memoryType          },
            { filter: filters.cores,        value: String(product.specs.coreCount)   },
            { filter: filters.threads,      value: String(product.specs.threadCount) },
            { filter: filters.techproc,     value: String(product.specs.techProc)    },
            { filter: filters.category,     value: product.naming.category           },
        ];
        if (!pairsMatch(filterPairs))
            return false;

        if (filters.clock 
            && !rangesIncludeValue(filters.clock, product.specs.baseClock, Metrics.GHZ)
        ) return false;

        if (filters.tdp 
            && !rangesIncludeValue(filters.tdp, product.specs.baseClock, Metrics.WT)
        ) return false;

        if (filters.cache_size 
            && !rangesIncludeValue(filters.cache_size, product.specs.cacheSize, Metrics.MB)
        ) return false;

        return true;
    });
}

function isInRange(value: number, range: [number, number]) {
    const [min, max] = range;

    if (min >= max)
        return false;

    return (value >= min && value <= max);
}

interface FilterPair {
    filter: string[] | undefined,
    value: string
}

function pairsMatch(matchPairs: FilterPair[]): boolean {
    return !matchPairs
            .some(pair => pair.filter 
                          && !pair.filter.includes(pair.value));
}

function rangesIncludeValue(ranges: string[], value: number, metric: Metrics) {
    for (const rangeStr of ranges) {
        const cmpRange: [number, number] = parseRange(rangeStr, metric);
        
        if (isInRange(value, cmpRange)) {
            return true;
        }
    }

    return false;
}