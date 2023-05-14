import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { AdminLayout } from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import React, { useState, useEffect, useMemo } from 'react';
import { Chart } from 'primereact/chart';
import { Dropdown } from 'primereact/dropdown';
import { InputSwitch } from "primereact/inputswitch";

export default function Dashboard(props) {
  const [chartDataSpeciesByOrigin, setChartDataSpeciesByOrigin] = useState({});
  const [chartDataSpeciesByWayCollect, setChartDataSpeciesByWayCollect] = useState({});
  const [chartOptionsChartPie, setChartOptionsChartPie] = useState({});

  const [displayChartSpeciesByOriginFormat, setDisplayChartSpeciesByOriginFormat] = useState(false); //false = number , true = percent
  const [displayChartSpeciesByWayCollectFormat, setDisplayChartSpeciesByWayCollectFormat] = useState(false); //false = number , true = percent
  
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const years = [...new Set(props.speciesByTime.map(item => item.year))];
  const [chartDataSpeciesByTime, setChartDataSpeciesByTime] = useState({});
  const [chartOptionsChartLine, setChartOptionsChartline] = useState({});

  
  console.log(selectedYear, years);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  console.log(props.speciesByOrigin);

  

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);

    // const dataSpeciesByOrigin = {
    //   labels: props.speciesByOrigin.map(item => item.collection_origin),
    //   datasets: [
    //     {
    //       data: props.speciesByOrigin.map(item => displayChartSpeciesByOriginFormat ? ((item.total / speciesByOriginSum()) * 100).toFixed(2) : item.total),
    //       backgroundColor: generateColors(props.speciesByOrigin.length),
    //     }
    //   ]
    // }
    const optionsChartPie = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true
          }
        }
      }
    };

    // setChartDataSpeciesByOrigin(dataSpeciesByOrigin);
    setChartOptionsChartPie(optionsChartPie);

    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    const dataSpeciesByTime = {
      labels: props.speciesByTime.map(item => monthNames[item.month - 1]),
      datasets: [
        {
          label: 'Species',
          data: props.speciesByTime.map(item => item.total),
          fill: false,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          tension: 0.4
        },
        {
          label: 'Spesimen',
          data: props.plantsByTime.map(item => item.total),
          fill: false,
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          tension: 0.4
        }
      ]
    };
    const optionsChartLine = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        }
      }
    };

    setChartDataSpeciesByTime(dataSpeciesByTime);
    setChartOptionsChartline(optionsChartLine);

  }, []);
  
  const generateColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      colors.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
    }
    return colors;
  }

  const chartDataSum = (data) => data.reduce((a, b) => a + b.total, 0);


  const dataSpeciesByOrigin = useMemo(() => {
    let data = {
      labels: props.speciesByOrigin.map(item => item.collection_origin),
      datasets: [
        {
          data: props.speciesByOrigin.map(item => displayChartSpeciesByOriginFormat ? ((item.total / chartDataSum(props.speciesByOrigin)) * 100).toFixed(2) : item.total),
          backgroundColor: generateColors(props.speciesByOrigin.length),
        }
      ]
    }
    return data
  },[displayChartSpeciesByOriginFormat])

  const dataSpeciesByWayCollect = useMemo(() => { 
    let data = {
      labels: props.speciesByWayCollect.map(item => item.way_to_collect),
      datasets: [
        {
          data: props.speciesByWayCollect.map(item => displayChartSpeciesByWayCollectFormat ? ((item.total / chartDataSum(props.speciesByWayCollect)) * 100).toFixed(2) : item.total),
          backgroundColor: ['#22c55e', '#0ea5e9','#f59e0b'],
        }
      ]
    }
    return data
  }, [displayChartSpeciesByWayCollectFormat])

  

  return (
    <AdminLayout>
      <Head title="Dashboard" />

      <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-5">
        <div className="w-full px-4 py-5 bg-white rounded-lg shadow ">
          <div className="text-sm font-medium text-gray-500 truncate">
            Jumlah Famili
          </div>
          <div className="mt-1 text-3xl font-semibold text-gray-900">
            {props.totalFamili}
          </div>
        </div>
        <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
          <div className="text-sm font-medium text-gray-500 truncate">
            Jumlah Genus
          </div>
          <div className="mt-1 text-3xl font-semibold text-gray-900">
            {props.totalGenus}
          </div>
        </div>
        <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
          <div className="text-sm font-medium text-gray-500 truncate">
            Jumlah Spesies
          </div>
          <div className="mt-1 text-3xl font-semibold text-gray-900">
            {props.totalSpecies}
          </div>
        </div>
        <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
          <div className="text-sm font-medium text-gray-500 truncate">
            Jumlah Spesimen
          </div>
          <div className="mt-1 text-3xl font-semibold text-gray-900">
            {props.totalSpecimens}
          </div>
        </div>
        <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
          <div className="text-sm font-medium text-gray-500 truncate">
            Jumlah Permintaan Data
          </div>
          <div className="mt-1 text-3xl font-semibold text-gray-900">
            {props.totalDataRequests}
          </div>
        </div>
      </div>

      <div className="px-4 py-5 bg-white rounded-lg shadow mb-6 text-center">
        <h2 className="text-2xl font-bold mb-3 ">
          Penambahan Tanaman 
        </h2>
        <Dropdown value={selectedYear} onChange={(e) => setSelectedYear(e.value)} options={years}
          placeholder="Select Year" className="w-full md:w-1/3 mb-3" />

        <Chart type="line" data={chartDataSpeciesByTime} options={chartOptionsChartLine} className=" w-full " />
      </div>

      <div className="w-full px-4 py-5 bg-white rounded-lg shadow grid justify-items-center mb-6">
        <h2 className="text-2xl font-bold">
          Jumlah Tanaman / Asal Koleksi
        </h2>
        <Chart type="pie" data={dataSpeciesByOrigin} options={chartOptionsChartPie} className="w-full md:w-1/3" />
        <div className='mt-4 text-center'>
          <p className='mb-3'>Tampilkan dalam persen ( % )</p>
          <InputSwitch checked={displayChartSpeciesByOriginFormat} onChange={(e) => setDisplayChartSpeciesByOriginFormat(e.value)} />
        </div>
      </div>

      <div className="w-full px-4 py-5 bg-white rounded-lg shadow grid justify-items-center mb-6">
        <h2 className="text-2xl font-bold">
          Jumlah Tanaman / Cara Memperoleh
        </h2>
        <Chart type="pie" data={dataSpeciesByWayCollect} options={chartOptionsChartPie} className="w-full md:w-1/3" />
        <div className='mt-4 text-center'>
          <p className='mb-3'>Tampilkan dalam persen ( % )</p>
          <InputSwitch checked={displayChartSpeciesByWayCollectFormat} onChange={(e) => setDisplayChartSpeciesByWayCollectFormat(e.value)} />
        </div>
      </div>
      
    </AdminLayout>
  );
}
