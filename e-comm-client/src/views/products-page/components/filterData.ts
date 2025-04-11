const filterData = {
    rangeSelectors: [
        {
            label: 'products-page.filters.price',
            min: 0,
            max: 100000,
            initialRange: [3000, 25000]
        },
        {
            label: 'products-page.filters.perfomance',
            min: 0,
            max: 100000,
            initialRange: [0, 100000]
        }
    ],

    checkBoxFilters: [
        { label: 'products-page.filters.brand',        options: ["AMD", "Intel"] },
        { label: 'products-page.filters.socket',       options: ["Socket 1851", "Socket 1700", "Socket 1200", "Socket 1151-V2", "Socket 1151", "Socket 1155", "Socket AM3+", "Socket AM4", "Socket AM5", "Socket AM4", "Socket TR5"] },
        { label: 'products-page.filters.pcie_support', options: ["PCIe 5.0", "PCIe 4.0", "PCIe 3.0"] },
        { label: 'products-page.filters.memory_type',  options: ["DDR5", "DDR4", "DDR3", "LPDDR5", "LPDDR4"]},
        { label: 'products-page.filters.cores',        options: ["2", "4", "6", "8", "10", "12", "16", "24", "32", "64"] },
        { label: 'products-page.filters.threads',      options: ["4", "8", "12", "16", "20", "24", "32", "48", "64", "128"] },
        { label: 'products-page.filters.clock',        options: ["< 2 GHz", "2.1 - 2.5 GHz", "2.6 - 3 GHz", "3.1 - 3.6 GHz", "3.7 - 4.2 GHz", "4.3 - 4.7 GHz"] },
        { label: 'products-page.filters.tdp',          options: ["< 35W", "35-65W", "66-95W", "96-125W", "126-165W", "> 165W"] },
        { label: 'products-page.filters.cache_size',   options: ["< 8MB", "8-16MB", "17-32MB", "33-64MB", "65-96MB", "> 96MB"] },
        { label: 'products-page.filters.graphics',     options: ['+', '-'] },
        { label: 'products-page.filters.tech_proc',    options: ["5nm", "7nm", "10nm", "14nm", "22nm"] },
        { label: 'products-page.filters.category',     optionsKeys: ['budget', 'home-work', 'gaming', 'workstation'].map(key => `products-page.filters.values.usage.${key}`) },
        { label: 'products-page.filters.perfomance',   options: ["< 5000", "5000-8000", "8000-10000", "10000-120000", "12000-16000", "16000-20000", "20000-25000", "> 25000"] },
    ]
};

export default filterData;