'use client';
import dynamic from 'next/dynamic';

// import Chart from 'react-apexcharts';
const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false
});

const RadialBarChart: React.FC<{
    chartData: any;
    dimensions?: number;
    chartOptions: any;
    [x: string]: any;
}> = (props) => {
    const { chartData, chartOptions, dimensions } = props;

    return (
        <Chart
            options={chartOptions}
            type='radialBar'
            width={dimensions ? dimensions : 100}
            height={dimensions ? dimensions : 100}
            series={chartData}
        />
    );
};

export default RadialBarChart;
