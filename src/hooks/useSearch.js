import React, { useMemo, useState } from 'react'

export const useSearch = (productsData) => {

    const [query, setQuery] = useState('');

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return productsData;

        return productsData.filter(
        ({ name, category, company }) =>
            name.toLowerCase().includes(q) ||
            category.toLowerCase().includes(q) ||
            company.toLowerCase().includes(q)
        );
    }, [query, productsData]);

    return {
        filtered, 
        query,
        setQuery 
    }
}
