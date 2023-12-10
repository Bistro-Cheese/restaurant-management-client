import { OrderLineType } from '.';

type Order = {
    id: number;
    tableId: number;
    orderLines: OrderLineType[];
};

export default Order;
