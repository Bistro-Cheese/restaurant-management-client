import { OrderLineType } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const orderKey = 'order';

export type OrderStateType = {
    tableId: number;
    customerName: string;
    numberOfCustomer: number;
    phoneNumber: string;
    status: number;
    checkInTime: string;
    orderLines: OrderLineType[];
};

type setCustomerPayload = Omit<OrderStateType, 'tableId' | 'orderLines'>;

export const initialOrderState: OrderStateType = {
    tableId: -1,
    customerName: '',
    numberOfCustomer: 0,
    phoneNumber: '',
    status: 1,
    checkInTime: '01/01/2000 00:00:00',
    orderLines: []
};

export const orderSlice = createSlice({
    name: 'order',
    initialState: initialOrderState,
    reducers: {
        addToOrder: (state, action) => {
            const orderLine = state.orderLines.find(
                (orderLine) => orderLine.id === action.payload.id
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

        increaseQuantity: (state, action) => {
            const orderLine = state.orderLines.find(
                (orderLine) => orderLine.id === action.payload.foodId
            );

            if (orderLine) {
                orderLine.quantity = Number(orderLine.quantity) + 1;
            }
        },

        decreaseQuantity: (state, action) => {
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

        setQuantity: (
            state,
            action: PayloadAction<{
                foodId: string;
                inputValue: number;
            }>
        ) => {
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

        removeOrderLine: (state, action: PayloadAction<{ foodId: string }>) => {
            const removeOrderLine = state.orderLines.filter(
                (orderLine) => orderLine.id !== action.payload.foodId
            );

            state.orderLines = removeOrderLine;
        },

        setOrder: (state, action: PayloadAction<OrderStateType>) => {
            state = action.payload;
        },

        setTableId: (state, action: PayloadAction<number>) => {
            state.tableId = action.payload;
        },

        setCustomer: (state, action: PayloadAction<setCustomerPayload>) => {
            state.customerName = action.payload.customerName;
            state.numberOfCustomer = action.payload.numberOfCustomer;
            state.phoneNumber = action.payload.phoneNumber;
            state.status = action.payload.status;
            state.checkInTime = action.payload.checkInTime;
        },

        resetOrderState: (state) => {
            state.customerName = '';
            state.numberOfCustomer = 0;
            state.phoneNumber = '';
            state.status = 1;
            state.checkInTime = '01/01/2000 00:00:00';
            state.orderLines = [];
        }
    }
});

export const {
    addToOrder,
    increaseQuantity,
    decreaseQuantity,
    setQuantity,
    removeOrderLine,
    setOrder,
    setTableId,
    setCustomer,
    resetOrderState
} = orderSlice.actions;
