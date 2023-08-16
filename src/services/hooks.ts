import { useEffect, useState, useMemo } from "react";
import { ProductResultType } from "../utils/types";

export const useDebounce = (value: string, delay: number): string => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

export const useCalculateMinMaxPrice = (
    products: ProductResultType[],
): { current_min_price: number; current_max_price: number } => {
    const result = useMemo(() => {
        if (!products || products.length === 0) {
            return { current_min_price: 0, current_max_price: 0 };
        }

        let minPrice = parseFloat(products[0].store_price);
        let maxPrice = parseFloat(products[0].store_price);

        for (const product of products) {
            const storePrice = parseFloat(product.store_price);
            if (!isNaN(storePrice)) {
                if (storePrice < minPrice) {
                    minPrice = storePrice;
                }
                if (storePrice > maxPrice) {
                    maxPrice = storePrice;
                }
            }
        }

        return { current_min_price: minPrice, current_max_price: maxPrice };
    }, [products]);

    return result;
};
