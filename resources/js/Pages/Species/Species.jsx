import { AdminLayout } from "@/Layouts/AdminLayout";
import { Head, useForm } from '@inertiajs/react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState, useCallback, useEffect } from "react";
import { Button } from 'primereact/button';
import { Link } from '@inertiajs/react';
import { read, utils, writeFileXLSX } from 'xlsx';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import InputLabel from '@/Components/InputLabel';

export default function Species(props) {
  const [loading, setLoading] = useState(false);
  const [exportVisible, setExportVisible] = useState(false);
  const [filters, setFilters] = useState({
    access_number: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    local_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    famili: { value: null, matchMode: FilterMatchMode.CONTAINS },
    collection_origin: { value: null, matchMode: FilterMatchMode.CONTAINS },
    planting_date: { value: null, matchMode: FilterMatchMode.CONTAINS },
  })
  const [filteredData, setFilteredData] = useState();
  const [listAsalKoleksi, setListAsalKoleksi] = useState('Semua');
  const [filterByAsal, setFilterByAsal] = useState('Semua');
  const [filterByCara, setFilterByCara] = useState('Semua');
  

  useEffect(() => {
    setListAsalKoleksi([
      filterByAsal,...new Set(props.species.map((obj) => obj.collection_origin)),
    ]);
    

    const items = props.species.map((item) => ({
      'Nomor Koleksi' : item.collection_number,
      'Nomor Akses' : item.access_number,
      'Nomor Kolektor' : item.collector_number,
      'Nama Spesies' : item.genus + ' ' + item.name,
      'Nama Lokal' : item.local_name,
      'Famili' : item.famili.name,
      'Tanggal Tanam' : item.planting_date,
      'Asal Koleksi' : item.collection_origin,
      'Jumlah di Pembibitan' : item.amount_in_nurseries,
      'Jumlah di Lapangan' : item.amount_in_field,
      'Total' : item.total,
      'Marga' : item.genus_exist,
      'Jenis' : item.type_exist,
      'sp' : item.sp_exist,
      'Lokasi Tanam' : item.planting_coordinate,
      'Cara Mendapatkan': item.way_to_collect,
    }));

    setFilteredData(items);
    
  }, [loading])

  const {
    data,
    setData,
    delete: destroy,
    processing,
    reset,
    errors,
  } = useForm({

  });

  const exportExcel = useCallback(() => {
    console.log(filterByAsal, filterByCara)
    console.log(filteredData.filter((item) => {
      if (filterByAsal == 'Semua' && filterByCara == 'Semua') {
        console.log(item['Asal Koleksi']);
        return true;
      } else if (filterByAsal != 'Semua' && filterByCara == 'Semua') {
        console.log(item['Asal Koleksi']);
        return item['Asal Koleksi'].includes(filterByAsal);
      } else if (filterByAsal == 'Semua' && filterByCara != 'Semua') {
        console.log(item['Cara Mendapatkan']);
        return item['Cara Mendapatkan'].includes(filterByCara);
      } else {
        return item['Asal Koleksi'].includes(filterByAsal) && item['Cara Mendapatkan'].includes(filterByCara)
      }
      return false;
    }))
    const ws = utils.json_to_sheet(filteredData.filter((item) => {
      if (filterByAsal == 'Semua' && filterByCara == 'Semua') {
        console.log(item['Asal Koleksi']);
        return true;
      } else if (filterByAsal != 'Semua' && filterByCara == 'Semua') {
        console.log(item['Asal Koleksi']);
        return item['Asal Koleksi'].includes(filterByAsal);
      } else if (filterByAsal == 'Semua' && filterByCara != 'Semua') {
        return item['Cara Mendapatkan'].includes(filterByCara);
      } else {
        return item['Asal Koleksi'].includes(filterByAsal) && item['Cara Mendapatkan'].includes(filterByCara)
      }
      return false;
    }));
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    writeFileXLSX(wb, "exportExcel.xlsx");
  }, [filteredData, filterByAsal, filterByCara])

  const renderHeader = () => {
    return (
      <div className="flex justify-item-end">
        <Link href={route('species.create')}>
          <Button type="button" icon="pi pi-plus" label="Tambah" severity="success" />
        </Link>
        <div className="ml-4">
          <Button onClick={() => setExportVisible(true)} icon="pi pi-file-excel" label="Export Excel"/>
        </div>
      </div>
    );
  };


  function deleteSpecies(species) {
    console.log(species);
    if (confirm("Are you sure you want to delete this species?")) {
      destroy(route("species.destroy", species.id), {
        preserveScroll: true,
        onFinish: () => reset(),
      });

    }
  }

  const header = renderHeader();

  const actionTemplate = (rowData, column) => {
    return <div className="grid grid-cols-3 gap-1">
      <Link href={route('species.show', rowData.id)}><Button icon="pi pi-eye" severity="success" /></Link>
      <Link href={route('species.edit', rowData.id)}><Button icon="pi pi-pencil" severity="warning" /></Link>
      <Link><Button onClick={() => deleteSpecies(rowData)} icon="pi pi-trash" severity="danger" /></Link>
    </div>;
  }

  

  return (
    <AdminLayout>
      <Head title="species" />
      <h2 className="text-2xl font-bold">
        species
      </h2>
      <div className="mt-2">
        <DataTable value={props.species} paginator rows={10} dataKey="id" filters={filters} filterDisplay="row" loading={loading}
          globalFilterFields={['access_number', 'name', 'local_name', 'famili', 'collection_origin', 'planting_date']} header={header} emptyMessage="No data found."
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries" rowsPerPageOptions={[10, 25, 50]}>
          <Column field="access_number" header="No Akses" filter filterPlaceholder="Search by name" sortable style={{ minWidth: '11rem' }} />
          <Column field="name" header="Nama" filter filterPlaceholder="Search by name" sortable style={{ minWidth: '11rem' }} />
          <Column field="local_name" header="Nama Lokal" filter filterPlaceholder="Search by name" sortable style={{ minWidth: '11rem' }} />
          <Column field="famili.name" header="Famili" filter filterPlaceholder="Search by name" sortable style={{ minWidth: '11rem' }} />
          <Column field="collection_origin" header="Asal Koleksi" filter filterPlaceholder="Search by name" sortable style={{ minWidth: '11rem' }} />
          <Column field="planting_date" header="Tanggal Tanam" filter filterPlaceholder="Search by name" sortable style={{ minWidth: '11rem' }} />
          <Column field="way_to_collect" header="Cara Mendapatkan" filter filterPlaceholder="Search by name" sortable style={{ minWidth: '11rem' }} />
          <Column field="modifiedTime" header="Action" body={(e) => actionTemplate(e)} style={{ minWidth: '15rem' }} />
        </DataTable>
      </div>
      <Dialog header={'Export data spesies'} visible={exportVisible} style={{ maxWidth: '90vw', minWidth: '50vw' }} onHide={() => setExportVisible(false)}>
        <div className="mt-4">
          <InputLabel htmlFor="name" value="Filter Asal Koleksi" />

          <Dropdown value={filterByAsal} onChange={(e) => {setFilterByAsal(e.value)}} options={listAsalKoleksi} 
            placeholder="Select a Famili" className="w-full md:w-14rem" />
        </div>
        <div className="mt-4">
          <InputLabel htmlFor="wayToCollect" value="Filter Cara Mendapatkan" />

          <Dropdown value={filterByCara} onChange={(e) => setFilterByCara(e.value)} options={['Semua', 'hibah' ,'eksplorasi' ,'pertukaran' ]}
            placeholder="Select status" className="w-full md:w-14rem" />
        </div>
        <div className="mt-4">
          <Button onClick={exportExcel} label="Export"/>
        </div>
      </Dialog>
    </AdminLayout>
  )
}
