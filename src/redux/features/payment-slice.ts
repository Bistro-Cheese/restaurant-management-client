import PaymentType from '@/types/PaymentType';
import { createSlice } from '@reduxjs/toolkit';

export const paymentKey = 'payment';

type PaymentStateType = {
    payment: PaymentType | null;
    payments: PaymentType[];
    isOpenModal: boolean;
};

const initialPaymentState: PaymentStateType = {
    payment: null,
    payments: [],
    isOpenModal: false
};

export const paymentSlice = createSlice({
    name: paymentKey,
    initialState: initialPaymentState,
    reducers: {
        setOpenModal: (state, action) => {
            state.isOpenModal = action.payload;
        },

        setPayment: (state, action) => {
            state.payment = action.payload;
        },

        setPayments: (state, action) => {
            state.payments = action.payload;
        },

        createPayment: (state, action) => {
            state.payments.push(action.payload);
        },

        deletePayment: (state, action) => {
            state.payments = state.payments.filter(
                (payment) => payment.id !== action.payload
            );
        }
    }
});

const paymentReducer = paymentSlice.reducer;

export const {
    setPayments,
    setPayment,
    setOpenModal,
    createPayment,
    deletePayment
} = paymentSlice.actions;

export default paymentReducer;
