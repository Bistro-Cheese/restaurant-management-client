import { EntityId } from '@reduxjs/toolkit';

export type TableStatus = {
    id: string;
    name: string;
};

type Table = {
    id: string;
    tableNumber: number;
    seatNumber: number;
    tableStatus: string;
};

export default Table;
