import { useI18n } from "vue-i18n";

export function useFilters() {
    const { t } = useI18n({ useScope: 'global' });
    const I18Namespace = 'products-page.filters';
    const usageNamespace = I18Namespace + ".values.usage";

    return {
        rangeSelectors: {
            price: {
                label: t(`${I18Namespace}.price`),
                min: 0,
                max: 100000,
                initialRange: [3000, 25000]
            },
            perfomance: {
                label: t(`${I18Namespace}.perfomance`),
                min: 0,
                max: 100000,
                initialRange: [0, 100000]
            }
        },
        checkBoxFilters: [
            { label: t(`${I18Namespace}.brand`),        options: ["AMD", "Intel"] },
            { label: t(`${I18Namespace}.socket`),       options: ["Socket 1851", "Socket 1700", "Socket 1200", "Socket 1151-V2", "Socket 1151", "Socket 1155", "Socket AM3+", "Socket AM4", "Socket AM5", "Socket AM4", "Socket TR5"] },
            { label: t(`${I18Namespace}.pcie_support`), options: ["PCIe 5.0", "PCIe 4.0", "PCIe 3.0"] },
            { label: t(`${I18Namespace}.memory_type`),  options: ["DDR5", "DDR4", "DDR3", "LPDDR5", "LPDDR4"]},
            { label: t(`${I18Namespace}.cores`),        options: ["2", "4", "6", "8", "10", "12", "16", "24", "32", "64"] },
            { label: t(`${I18Namespace}.threads`),      options: ["4", "8", "12", "16", "20", "24", "32", "48", "64", "128"] },
            { label: t(`${I18Namespace}.clock`),        options: ["< 2 GHz", "2.1 - 2.5 GHz", "2.6 - 3 GHz", "3.1 - 3.6 GHz", "3.7 - 4.2 GHz", "4.3 - 4.7 GHz"] },
            { label: t(`${I18Namespace}.tdp`),          options: ["< 35W", "35-65W", "66-95W", "96-125W", "126-165W", "> 165W"] },
            { label: t(`${I18Namespace}.cache_size`),   options: ["< 8MB", "8-16MB", "17-32MB", "33-64MB", "65-96MB", "> 96MB"] },
            { label: t(`${I18Namespace}.graphics`),     options: ['+', '-'] },
            { label: t(`${I18Namespace}.tech_proc`),    options: ["5nm", "7nm", "10nm", "14nm", "22nm"] },
            { label: t(`${I18Namespace}.category`),     options: [t(`${usageNamespace}.budget`), t(`${usageNamespace}.home-work`), t(`${usageNamespace}.gaming`), t(`${usageNamespace}.workstation`) ] },
            { label: t(`${I18Namespace}.perfomance`),   options: ["< 5000", "5000-8000", "8000-10000", "10000-120000", "12000-16000", "16000-20000", "20000-25000", "> 25000"] },
        ]
    }
}