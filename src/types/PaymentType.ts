import { EntityId } from '@reduxjs/toolkit';

type PaymentType = {
    id: number | EntityId;
    methodType: number;
    methodName: string;
    accountNumber: string;
    accountHolderName: string;
    isActive: boolean;
};

export default PaymentType;
