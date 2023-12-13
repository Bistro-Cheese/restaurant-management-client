import { EntityId } from '@reduxjs/toolkit';

export type TableStatus = {
    id: string;
    name: string;
};

type Table = {
    id: number;
    tableNumber: number;
    seatNumber: number;
    tableStatus: string;
};

export default Table;
