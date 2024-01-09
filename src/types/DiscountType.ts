type Discount = {
    id: string;
    name: string;
    type: string;
    value: number;
    startDate: string;
    endDate: string;
    usesMax: number;
    usesCount: number;
    isActive: boolean;
};

export default Discount;
