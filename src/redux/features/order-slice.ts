import { TableType } from '@/types';
import { EntityId, PayloadAction, createSlice } from '@reduxjs/toolkit';

export const tableKey = 'table';

export interface OrderState {
    tables: TableType[];
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

const initialState: OrderState = {
    tables: []
};

export const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        addToOrder: (state, action) => {
            const orderLine = state.tables.find(
                (orderLine) => orderLine.id === action.payload.id
            );
        },
        increaseQuantity: (
            state,
            action: PayloadAction<IncreaseQuantityPayload>
        ) => {},
        decreaseQuantity: (
            state,
            action: PayloadAction<DecreaseQuantityPayload>
        ) => {},
        setQuantity: (state, action: PayloadAction<SetQuantityPayload>) => {},
        removeOrderLine: (
            state,
            action: PayloadAction<RemoveOrderLinePayload>
        ) => {}
    }
});

export const {
    addToOrder,
    increaseQuantity,
    decreaseQuantity,
    setQuantity,
    removeOrderLine
} = tableSlice.actions;
