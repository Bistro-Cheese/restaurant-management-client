const tableStatus = {
    free: {
        name: 'Free',
        outlineColor: '#9CA3AF',
        bgColor: '#f8f6f6'
    },
    pending: {
        name: 'Pending',
        outlineColor: '#F59E0B',
        bgColor: '#FFFBEB'
    },
    complete: {
        name: 'Complete',
        outlineColor: '#059669',
        bgColor: '#ECFDF5'
    }
};

function TableCard({ table, status }: { table: number; status: number }) {
    return (
        <div
            className={`flex h-40 rounded bg-[${getTableStatus(status)
                ?.outlineColor}] pl-2`}
        >
            <div
                className={`flex w-full flex-col justify-between bg-[${getTableStatus(
                    status
                )?.bgColor}] py-2 pl-2`}
            >
                {/* Table Number */}
                <h2 className='text-xl font-bold'>{table}</h2>

                <span>{getTableStatus(status)?.name}</span>
            </div>
        </div>
    );
}

function getTableStatus(status: number) {
    switch (status) {
        case 0:
            return tableStatus.free;
        case 1:
            return tableStatus.pending;
        case 2:
            return tableStatus.complete;
    }
}

export default TableCard;
