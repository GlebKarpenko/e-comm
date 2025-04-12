import { Metrics } from "./parse.enum";

// Example: "4 - 5 GHz" -> [4, 5]
// Example: "< 5 Mb"    -> [0, 5]
// Example: "> 165 W"   -> [165, INF]
export function parseRange(str: string, metric: Metrics): [number, number] {
    const parts = str.split(" - ");

    if (parts.length === 1) {
        if (parts[0].startsWith('<')) {
            const valueStr = parts[0].replace('<', '');
            const upper = parseValue(valueStr, metric);

            return [0, upper];
        }
        const valueStr = parts[0].replace('>', '');
        const lower = parseValue(valueStr, metric);

        return [lower, Number.MAX_SAFE_INTEGER];
    }

    return [
        parseValue(parts[0], metric), 
        parseValue(parts[1], metric)
    ];
}

export function parseValue(str: string, metric: Metrics): number {
    str = str.replace(metric, '').trim();
    return parseFloat(str) || 0;
}