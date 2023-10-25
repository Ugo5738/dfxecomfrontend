export const getShopURLWithCategory = (categoryName: string) => {
    return `/shop?category=${encodeURIComponent(categoryName)}`;
};
