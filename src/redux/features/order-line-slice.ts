import { OrderLineType } from '@/types';
import { EntityId, PayloadAction, createSlice } from '@reduxjs/toolkit';

export const orderLineKey = 'orderLine';

export interface OrderLineState {
    orderLines: OrderLineType[];
}

interface IncreaseQuantityPayload {
    id: EntityId;
}

interface DecreaseQuantityPayload {
    id: EntityId;
}

interface SetQuantityPayload {
    id: EntityId;
    inputValue: number;
}

interface RemoveOrderLinePayload {
    id: EntityId;
}

interface SetInitialOrderLinesPayload {
    orderLines: OrderLineType[];
}

const initialState: OrderLineState = {
    orderLines: []
};

export const orderLineSlice = createSlice({
    name: 'orderLine',
    initialState,
    reducers: {
        addToOrder: (state, action) => {
            const orderLine = state.orderLines.find(
                (orderLine) => orderLine.id === action.payload.id
            );

            if (orderLine) {
                orderLine.quantity = Number(orderLine.quantity) + 1;
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
                orderLine.quantity = Number(orderLine.quantity) + 1;
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
                    const updatedOrderLines = state.orderLines.filter(
                        (orderLine) => orderLine.id !== action.payload.id
                    );
                    state.orderLines = updatedOrderLines;

                    return;
                }

                orderLine.quantity = Number(orderLine.quantity) - 1;
            }
        },
        setQuantity: (state, action: PayloadAction<SetQuantityPayload>) => {
            const orderLine = state.orderLines.find(
                (orderLine) => orderLine.id === action.payload.id
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
                (orderLine) => orderLine.id !== action.payload.id
            );

            state.orderLines = removeOrderLine;
        },
        setInitialOrderLines: (
            state,
            action: PayloadAction<SetInitialOrderLinesPayload>
        ) => {
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
    setInitialOrderLines
} = orderLineSlice.actions;
