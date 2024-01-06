'use client';

// components
import TotalReport from '../_components/TotalReport';
import TotalCustomers from '../_components/TotalCustomers';
import InventoryWarehouse from '../_components/InventoryWarehouse';
import TotalRevenue from '../_components/TotalRevenue';

const DashboardPage: React.FC = () => {
    return (
        <div className='pb-4'>
            {/* Reports */}
            <TotalReport />

            {/* Charts */}
            <div className='mt-5 grid grid-cols-1 gap-5 md:grid-cols-2'>
                <TotalRevenue />

                <TotalCustomers />
            </div>

            <div className='mt-5 grid grid-cols-1 gap-5 xl:grid-cols-1'>
                <InventoryWarehouse />

                {/* <div className='grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2'>
                    <PieChartCard />

                    <div className='grid grid-cols-1 rounded-[20px]'>
                        <MiniCalendar />
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default DashboardPage;
