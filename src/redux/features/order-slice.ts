import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const orderKey = 'order';

export type OrderStateType = {
    tableId: number;
    customerName: string;
    numberOfCustomer: number;
    phoneNumber: string;
    status: number;
    checkInTime: string;
    orderLines: {
        id: string;
        food_id: string;
        name: string;
        image: string;
        price: number;
        quantity: number;
    }[];
    discountId: number | null;
    isUpdate: boolean;
};

type setCustomerPayload = Omit<
    OrderStateType,
    'tableId' | 'orderLines' | 'discountId' | 'isUpdate'
>;

export const initialOrderState: OrderStateType = {
    tableId: -1,
    customerName: '',
    numberOfCustomer: 0,
    phoneNumber: '',
    status: 1,
    checkInTime: '01/01/2000 00:00:00',
    orderLines: [],
    discountId: null,
    isUpdate: false
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
                    food_id: action.payload.id,
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
            state.tableId = action.payload.tableId;
            state.customerName = action.payload.customerName;
            state.numberOfCustomer = action.payload.numberOfCustomer;
            state.phoneNumber = action.payload.phoneNumber;
            state.status = action.payload.status;
            state.checkInTime = action.payload.checkInTime;
            state.orderLines = action.payload.orderLines;
            state.discountId = action.payload.discountId;
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
            state.discountId = null;
            state.isUpdate = false;
        },

        setDiscountId: (state, action: PayloadAction<number>) => {
            state.discountId = action.payload;
        },

        setIsUpdate: (state, action: PayloadAction<boolean>) => {
            state.isUpdate = action.payload;
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
    setDiscountId,
    setIsUpdate,
    resetOrderState
} = orderSlice.actions;
