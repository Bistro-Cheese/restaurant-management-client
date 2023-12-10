export const convertPriceToString = (price: number) => {
    return price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');
};
