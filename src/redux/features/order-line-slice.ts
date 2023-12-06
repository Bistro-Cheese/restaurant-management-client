import { OrderLineType } from '@/types';
import { EntityId, PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface OrderLineState {
    orderLines: OrderLineType[];
}

interface IncreaseQuantityPayload {
    id: EntityId;
}

interface DecreaseQuantityPayload {
    id: EntityId;
}

const initialState: OrderLineState = {
    orderLines: []
};

interface RemoveOrderLinePayload {
    id: EntityId;
}

const orderLineSlice = createSlice({
    name: 'orderLines',
    initialState,
    reducers: {
        addToOrder: (state, action) => {
            const orderLine = state.orderLines.find(
                (orderLine) => orderLine.id === action.payload.id
            );

            if (orderLine) {
                orderLine.quantity += 1;
            } else {
                state.orderLines.push({ ...action.payload, quantity: 1 });
            }
        },
        increaseQuantity: (
            state,
            action: PayloadAction<IncreaseQuantityPayload>
        ) => {
            const orderLine = state.orderLines.find(
                (orderLine) => orderLine.id === action.payload.id
            );

            if (orderLine) {
                orderLine.quantity++;
            }
        },
        decreaseQuantity: (
            state,
            action: PayloadAction<DecreaseQuantityPayload>
        ) => {
            const orderLine = state.orderLines.find(
                (orderLine) => orderLine.id === action.payload.id
            );

            if (orderLine) {
                if (orderLine.quantity === 1) {
                    const removeOrderLine = state.orderLines.filter(
                        (item) => item.id !== action.payload.id
                    );

                    state.orderLines = removeOrderLine;

                    return;
                }

                orderLine.quantity = Math.max(1, orderLine.quantity - 1);
            }
        },
        setQuantity: (
            state,
            action: PayloadAction<{ id: EntityId; quantity: number }>
        ) => {
            const { id, quantity } = action.payload;
            const orderLine = state.orderLines.find(
                (orderLine) => orderLine.id === id
            );
            if (orderLine) {
                orderLine.quantity = Math.max(1, quantity);
            }
        },
        removeOrderLine: (
            state,
            action: PayloadAction<RemoveOrderLinePayload>
        ) => {
            const removeOrderLine = state.orderLines.filter(
                (item) => item.id !== action.payload.id
            );

            state.orderLines = removeOrderLine;
        }
    }
});

export const orderLinesReducer = orderLineSlice.reducer;

export const {
    addToOrder,
    increaseQuantity,
    decreaseQuantity,
    removeOrderLine
} = orderLineSlice.actions;
