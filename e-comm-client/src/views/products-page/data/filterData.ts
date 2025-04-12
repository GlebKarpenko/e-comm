const filterData = {
    rangeSelectors: [
        {
            id: "price",
            labelKey: 'products-page.filters.price',
            min: 0,
            max: 100000,
            initialRange: [3000, 25000]
        },
        {
            id: "perfomance_range",
            labelKey: 'products-page.filters.perfomance',
            min: 0,
            max: 100000,
            initialRange: [0, 100000]
        }
    ],

    checkBoxFilters: [
        { 
            id: "brand",           
            labelKey: 'products-page.filters.brand',
            options: ["AMD", "Intel"],
            values: ["AMD", "Intel"]
        },
        {
            id: "socket",          
            labelKey: 'products-page.filters.socket',       
            options: ["Socket 1851", "Socket 1700", "Socket 1200", "Socket 1151-V2", "Socket 1151", "Socket 1155", "Socket AM3+", "Socket AM4", "Socket AM5", "Socket AM4", "Socket TR5"],
            values: ["Socket 1851", "Socket 1700", "Socket 1200", "Socket 1151-V2", "Socket 1151", "Socket 1155", "Socket AM3+", "Socket AM4", "Socket AM5", "Socket AM4", "Socket TR5"],
        },
        { 
            id: "pcie_support",
            labelKey: 'products-page.filters.pcie_support', 
            options: ["PCIe 5.0", "PCIe 4.0", "PCIe 3.0"],
            values: ["PCIe 5.0", "PCIe 4.0", "PCIe 3.0"],
        },
        { 
            id: "memory_type",     
            labelKey: 'products-page.filters.memory_type',  
            options: ["DDR5", "DDR4", "DDR3", "LPDDR5", "LPDDR4"],
            values: ["DDR5", "DDR4", "DDR3", "LPDDR5", "LPDDR4"],
        },
        { 
            id: "cores",   
            labelKey: 'products-page.filters.cores',        
            options: ["2", "4", "6", "8", "10", "12", "16", "24", "32", "64"],
            values: ["2", "4", "6", "8", "10", "12", "16", "24", "32", "64"],
        },
        { 
            id: "threads", 
            labelKey: 'products-page.filters.threads',      
            options: ["4", "8", "12", "16", "20", "24", "32", "48", "64", "128"],
            values: ["4", "8", "12", "16", "20", "24", "32", "48", "64", "128"],
        },
        { 
            id: "clock",       
            labelKey: 'products-page.filters.clock',        
            options: ["< 2 GHz", "2.1 - 2.5 GHz", "2.6 - 3 GHz", "3.1 - 3.6 GHz", "3.7 - 4.2 GHz", "4.3 - 4.7 GHz"],
            values: ["< 2 GHz", "2.1 - 2.5 GHz", "2.6 - 3 GHz", "3.1 - 3.6 GHz", "3.7 - 4.2 GHz", "4.3 - 4.7 GHz"],
        },
        { 
            id: "tdp",         
            labelKey: 'products-page.filters.tdp',          
            options: ["< 35 W", "35 - 65 W", "66 - 95 W", "96 - 12 5W", "126 - 165 W", "> 165 W"],
            values: ["< 35 W", "35 - 65 W", "66 - 95 W", "96 - 12 5W", "126 - 165 W", "> 165 W"],
        },
        { 
            id: "cache_size",       
            labelKey: 'products-page.filters.cache_size',   
            options: ["< 8 MB", "8 - 16 MB", "17 - 32 MB", "33 - 64 MB", "65 - 96 MB", "> 96 MB"],
            values: ["< 8 MB", "8 - 16 MB", "17 - 32 MB", "33 - 64 MB", "65 - 96 MB", "> 96 MB"],
        },
        { 
            id: "graphics",    
            labelKey: 'products-page.filters.graphics',     
            options: ['+', '-'],
            values: ['+', '-'],
        },
        { 
            id: "techproc",    
            labelKey: 'products-page.filters.tech_proc',    
            options: ["5 nm", "7 nm", "10 nm", "14 nm", "22 nm"],
            values: ["5 nm", "7 nm", "10 nm", "14 nm", "22 nm"],
        },
        { 
            id: "category",    
            labelKey: 'products-page.filters.category',     
            optionsKeys: ['budget', 'home-work', 'gaming', 'workstation'].map(key => `products-page.filters.values.usage.${key}`),
            values: ['Бюджетні процесори', 'Домашні/Офісні процесори', 'Ігрові процесори', 'Робочі станції (Workstation) процесори'],
        },
    ]
};

export default filterData;