import { ApexOptions } from 'apexcharts';

export const defaultChartOptions: ApexOptions = {
    chart: {
      height: 250,
      type: 'area',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      type: 'datetime',
    },
  };

export type ChartSeries = {
    name: string;
    data: number[];
  }[];
 
export const defaultChartSeries: ChartSeries = [{ name: '', data: [] }];

export const defaultDonutOptions: ApexOptions = {
    chart: {
      type: 'donut',
    },
    labels:[],
    dataLabels: {
        enabled: true,
        formatter: function (val) {
            return val + "%"
        },
    }

  };


export const defaultDonutSeries: number[] = [0];