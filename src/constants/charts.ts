import { convertPriceToString } from '@/utils';
import abbrNum from '@/utils/abbreviator-number';

export const barChartDataTotalCustomers = [
    {
        name: 'Customers',
        data: [
            3231, 3232, 1132, 1032, 2062, 2262, 3262, 2532, 2432, 2332, 2332,
            2332
        ]
    }
];

export const barChartOptionsTotalCustomers = {
    chart: {
        toolbar: {
            show: true
        }
    },
    tooltip: {
        style: {
            fontSize: '12px',
            fontFamily: 'Noto Sans JP, sans-serif',
            backgroundColor: '#000000'
        },
        onDatasetHover: {
            style: {
                fontSize: '12px',
                fontFamily: 'Noto Sans JP, sans-serif'
            }
        },
        theme: 'dark'
    },
    xaxis: {
        categories: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ],
        show: false,
        labels: {
            show: true,
            style: {
                colors: '#70798a',
                fontSize: '12px',
                fontWeight: '500',
                fontFamily: 'Noto Sans JP, sans-serif'
            }
        },
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false
        }
    },
    yaxis: {
        show: true,
        color: 'black',
        labels: {
            show: true,
            style: {
                colors: '#70798a',
                fontSize: '12px',
                fontWeight: '500',
                fontFamily: 'Noto Sans JP, sans-serif'
            },
            offsetX: -15,
            formatter: (value: number) => {
                return abbrNum(value, 2);
            }
        }
    },
    grid: {
        show: true,
        strokeDashArray: 5,
        yaxis: {
            lines: {
                show: true
            }
        },
        xaxis: {
            lines: {
                show: false
            }
        },
        padding: {
            left: -5
        }
    },
    fill: {
        type: 'gradient',
        gradient: {
            type: 'vertical',
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            colorStops: [
                [
                    {
                        offset: 0,
                        color: '#D9BB65',
                        opacity: 0.8
                    },
                    {
                        offset: 100,
                        color: '#D9BB65',
                        opacity: 0.2
                    }
                ]
            ]
        }
    },
    dataLabels: {
        enabled: false
    },
    plotOptions: {
        bar: {
            borderRadius: 8,
            columnWidth: '20px',
            borderRadiusApplication: 'end'
        }
    }
};

export const pieChartOptions = {
    labels: ['Your files', 'System', 'Empty'],
    colors: ['#4318FF', '#6AD2FF', '#EFF4FB'],
    chart: {
        width: '50px'
    },
    states: {
        hover: {
            filter: {
                type: 'none'
            }
        }
    },
    legend: {
        show: false
    },
    dataLabels: {
        enabled: false
    },
    hover: { mode: null },
    plotOptions: {
        donut: {
            expandOnClick: false,
            donut: {
                labels: {
                    show: false
                }
            }
        }
    },
    fill: {
        colors: ['#4318FF', '#6AD2FF', '#EFF4FB']
    },
    tooltip: {
        enabled: true,
        theme: 'dark',
        style: {
            fontSize: '12px',
            fontFamily: 'Noto Sans JP, sans-serif',
            backgroundColor: '#000000'
        }
    }
};

export const pieChartData = [63, 25, 12];

export const barChartDataWeeklyRevenue = [
    {
        name: 'PRODUCT A',
        data: [400, 370, 330, 390, 320, 350, 360, 320, 380],
        color: '#6AD2Fa'
    },
    {
        name: 'PRODUCT B',
        data: [400, 370, 330, 390, 320, 350, 360, 320, 380],
        color: '#4318FF'
    },
    {
        name: 'PRODUCT C',
        data: [400, 370, 330, 390, 320, 350, 360, 320, 380],
        color: '#EFF4FB'
    }
];

export const barChartOptionsWeeklyRevenue = {
    chart: {
        stacked: true,
        toolbar: {
            show: false
        }
    },
    // colors:['#ff3322','#faf']
    tooltip: {
        style: {
            fontSize: '12px',
            fontFamily: 'Noto Sans JP, sans-serif',
            backgroundColor: '#000000'
        },
        theme: 'dark',
        onDatasetHover: {
            style: {
                fontSize: '12px',
                fontFamily: 'Noto Sans JP, sans-serif'
            }
        }
    },
    xaxis: {
        categories: ['17', '18', '19', '20', '21', '22', '23', '24', '25'],
        show: false,
        labels: {
            show: true,
            style: {
                colors: '#A3AED0',
                fontSize: '14px',
                fontWeight: '500'
            }
        },
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false
        }
    },
    yaxis: {
        show: false,
        color: 'black',
        labels: {
            show: false,
            style: {
                colors: '#A3AED0',
                fontSize: '14px',
                fontWeight: '500'
            }
        }
    },

    grid: {
        borderColor: 'rgba(163, 174, 208, 0.3)',
        show: true,
        yaxis: {
            lines: {
                show: false,
                opacity: 0.5
            }
        },
        row: {
            opacity: 0.5
        },
        xaxis: {
            lines: {
                show: false
            }
        }
    },
    fill: {
        type: 'solid',
        colors: ['#5E37FF', '#6AD2FF', '#E1E9F8']
    },
    legend: {
        show: false
    },
    colors: ['#5E37FF', '#6AD2FF', '#E1E9F8'],
    dataLabels: {
        enabled: false
    },
    plotOptions: {
        bar: {
            borderRadius: 10,
            columnWidth: '20px'
        }
    }
};

export const lineAreaChartDataTotalRevenue = [
    {
        name: 'Revenue',
        data: [
            120389000, 220479000, 90479000, 80479000, 120479000, 130479000,
            230479000, 180479000, 170479000, 165479000, 365479000, 265479000
        ],
        color: '#D9BB65'
    }
    // {
    //     name: 'Profit',
    //     data: [30, 40, 24, 46, 20, 46],
    //     color: '#F0E4C1'
    // }
];

export const lineChartOptionsTotalRevenue = {
    legend: {
        show: false
    },

    theme: {
        mode: 'light'
    },
    chart: {
        type: 'line',

        toolbar: {
            show: false
        }
    },

    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth'
    },

    tooltip: {
        style: {
            fontSize: '12px',
            fontFamily: 'Noto Sans JP, sans-serif',
            backgroundColor: '#000000'
        },
        theme: 'dark',
        x: {
            format: 'dd/MM/yy HH:mm'
        }
    },
    grid: {
        show: false
    },
    xaxis: {
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false
        },
        labels: {
            style: {
                colors: '#A3AED0',
                fontSize: '12px',
                fontWeight: '500'
            }
        },
        type: 'text',
        range: undefined,
        categories: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan']
    },

    yaxis: {
        show: false
    }
};

export const lineAreaChartOptionsTotalRevenue = {
    legend: {
        show: false
    },

    theme: {
        mode: 'light'
    },
    chart: {
        type: 'area',
        // height: 350,
        // zoom: {
        //     enabled: false
        // },

        toolbar: {
            show: true
        }
    },

    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth'
    },

    tooltip: {
        style: {
            fontSize: '12px',
            fontFamily: 'Noto Sans JP, sans-serif',
            backgroundColor: '#000000'
        },
        theme: 'dark',
        x: {
            format: 'dd/MM/yy HH:mm'
        }
    },
    grid: {
        show: true,
        borderColor: '#e6e6e6',
        strokeDashArray: 5,
        position: 'back',
        // xaxis: {
        //     lines: {
        //         show: false
        //     }
        // },
        yaxis: {
            lines: {
                show: true
            }
        },
        // row: {
        //     colors: undefined,
        //     opacity: 0.5
        // },
        // column: {
        //     colors: undefined,
        //     opacity: 0.5
        // },
        padding: {
            left: -5
        }
    },
    fill: {
        type: 'gradient',
        gradient: {
            type: 'vertical',
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            colorStops: [
                [
                    {
                        offset: 0,
                        color: '#D9BB65',
                        opacity: 0.7
                    },
                    {
                        offset: 100,
                        color: '#D9BB65',
                        opacity: 0.1
                    }
                ]
            ]
        }
    },
    xaxis: {
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false
        },
        labels: {
            style: {
                colors: '#70798a',
                fontSize: '12px',
                fontWeight: '500',
                fontFamily: 'Noto Sans JP, sans-serif'
            }
        },
        type: 'text',
        range: undefined,
        categories: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ]
    },

    yaxis: {
        show: true,
        labels: {
            style: {
                colors: '#70798a',
                fontSize: '12px',
                fontWeight: '500',
                fontFamily: 'Noto Sans JP, sans-serif'
            },
            offsetX: -15,
            formatter: (value: number) => {
                return abbrNum(value, 2);
            }
        }
    }
};

export const radialBarChartDataInventory = (value: number) => [value];

export const radialBarChartOptionsInventory = {
    colors: ['#D9BB65'],

    chart: {
        type: 'radialBar'
    },

    plotOptions: {
        radialBar: {
            inverseOrder: false,
            startAngle: 0,
            endAngle: 360,
            offsetX: 0,
            offsetY: -10,
            hollow: {
                margin: 5,
                size: '30%',
                background: 'transparent',
                // image: undefined,
                // imageWidth: 150,
                // imageHeight: 150,
                // imageOffsetX: 0,
                // imageOffsetY: 0,
                // imageClipped: true,
                position: 'front',
                dropShadow: {
                    enabled: false,
                    top: 0,
                    left: 0,
                    blur: 3,
                    opacity: 0.5
                }
            },
            track: {
                show: true,
                startAngle: undefined,
                endAngle: undefined,
                background: '#f2f2f2',
                strokeWidth: '97%',
                opacity: 1,
                margin: 5,
                dropShadow: {
                    enabled: false,
                    top: 0,
                    left: 0,
                    blur: 3,
                    opacity: 0.5
                }
            },
            dataLabels: {
                show: true,
                name: {
                    show: false,
                    fontSize: '12px',
                    fontFamily: 'Noto Sans JP, sans-serif',
                    fontWeight: 600,
                    color: undefined,
                    offsetY: -10
                },
                value: {
                    show: true,
                    fontSize: '12px',
                    fontFamily: 'Noto Sans JP, sans-serif',
                    fontWeight: 500,
                    color: '#70798a',
                    offsetY: 4,
                    formatter: function (val: number) {
                        return Math.round(val);
                    }
                }
            }
        }
    },
    stroke: {
        lineCap: 'round'
    }
};
