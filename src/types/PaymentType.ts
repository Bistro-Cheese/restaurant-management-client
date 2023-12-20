import { EntityId } from '@reduxjs/toolkit';

type PaymentType = {
    id: string | EntityId;
    methodType: number;
    methodName: string;
    accountNumber: string;
    accountHolderName: string;
    isActive: boolean;
};

export default PaymentType;
