import { OrderLineType } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const tableOrderKey = 'tableOrder';

interface TableOrderType {
    tableId: number;
    orderLines: OrderLineType[];
}

export interface TableOrderState {
    tableOrders: TableOrderType[];
}

interface CreateOrderPayload {
    tableId: number;
    orderLines: OrderLineType[];
}

interface DeleteOrderPayload {
    tableId: number;
}

const initialState: TableOrderState = {
    tableOrders: []
};

export const tableOrderSlice = createSlice({
    name: 'tableOrder',
    initialState,
    reducers: {
        createTableOrder: (
            state,
            action: PayloadAction<CreateOrderPayload>
        ) => {
            const tableOrder = state.tableOrders.find(
                (tableOrder) => tableOrder.tableId === action.payload.tableId
            );

            if (tableOrder) {
                tableOrder.orderLines = action.payload.orderLines;
            } else {
                state.tableOrders.push({
                    tableId: action.payload.tableId,
                    orderLines: action.payload.orderLines
                });
            }
        },
        deleteTableOrder: (
            state,
            action: PayloadAction<DeleteOrderPayload>
        ) => {
            const emptyTableOrder = state.tableOrders.find(
                (tableOrder) => tableOrder.tableId === action.payload.tableId
            );

            if (emptyTableOrder) {
                let filteredTableOrders = state.tableOrders.filter(
                    (tableOrder) =>
                        tableOrder.tableId !== action.payload.tableId
                );

                state.tableOrders = filteredTableOrders;
            }
        },
        resetTableState: (state) => {
            state.tableOrders = [];
        }
    }
});

export const { createTableOrder, deleteTableOrder, resetTableState } =
    tableOrderSlice.actions;
