import { OrderLineType } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const orderKey = 'order';

export interface OrderState {
    tableId: number;
    orderLines: OrderLineType[];
}

interface IncreaseQuantityPayload {
    foodId: string;
}

interface DecreaseQuantityPayload {
    foodId: string;
}

interface SetQuantityPayload {
    foodId: string;
    inputValue: number;
}

interface RemoveOrderLinePayload {
    foodId: string;
}

interface SetInitialOrderPayload {
    tableId: number;
    orderLines: OrderLineType[];
}

const initialState: OrderState = {
    tableId: -1,
    orderLines: []
};

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addToOrder: (state, action) => {
            const orderLine = state.orderLines.find(
                (orderLine) => orderLine.id === action.payload.foodId
            );

            if (orderLine) {
                orderLine.quantity = Number(orderLine.quantity) + 1;
            } else {
                state.orderLines.push({
                    ...action.payload,
                    quantity: 1
                });
            }
        },
        increaseQuantity: (
            state,
            action: PayloadAction<IncreaseQuantityPayload>
        ) => {
            const orderLine = state.orderLines.find(
                (orderLine) => orderLine.id === action.payload.foodId
            );

            if (orderLine) {
                orderLine.quantity = Number(orderLine.quantity) + 1;
            }
        },
        decreaseQuantity: (
            state,
            action: PayloadAction<DecreaseQuantityPayload>
        ) => {
            const orderLine = state.orderLines.find(
                (orderLine) => orderLine.id === action.payload.foodId
            );

            if (orderLine) {
                if (orderLine.quantity === 1) {
                    const updatedOrderLines = state.orderLines.filter(
                        (orderLine) => orderLine.id !== action.payload.foodId
                    );
                    state.orderLines = updatedOrderLines;

                    return;
                }

                orderLine.quantity = Number(orderLine.quantity) - 1;
            }
        },
        setQuantity: (state, action: PayloadAction<SetQuantityPayload>) => {
            const orderLine = state.orderLines.find(
                (orderLine) => orderLine.id === action.payload.foodId
            );

            if (orderLine) {
                if (!isNaN(action.payload.inputValue)) {
                    orderLine.quantity = action.payload.inputValue;
                } else {
                    orderLine.quantity = Number('');
                }
            }
        },
        removeOrderLine: (
            state,
            action: PayloadAction<RemoveOrderLinePayload>
        ) => {
            const removeOrderLine = state.orderLines.filter(
                (orderLine) => orderLine.id !== action.payload.foodId
            );

            state.orderLines = removeOrderLine;
        },
        setInitialOrder: (
            state,
            action: PayloadAction<SetInitialOrderPayload>
        ) => {
            state.tableId = action.payload.tableId;
            state.orderLines = action.payload.orderLines;
        }
    }
});

export const {
    addToOrder,
    increaseQuantity,
    decreaseQuantity,
    setQuantity,
    removeOrderLine,
    setInitialOrder
} = orderSlice.actions;
