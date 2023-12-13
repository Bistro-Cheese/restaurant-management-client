import { OrderLineType } from '.';

type Order = {
    id: string;
    tableId: number;
    orderLines: OrderLineType[];
};

export default Order;
