import { AdminLayout } from "@/Layouts/AdminLayout";
import { Head, useForm } from '@inertiajs/react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState } from "react";
import { Button } from 'primereact/button';
import { Link } from '@inertiajs/react';


export default function Plot(props) {
  const [loading, setLoading] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [filters, setFilters] = useState({
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    childName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    latitude: { value: null, matchMode: FilterMatchMode.CONTAINS },
    longitude: { value: null, matchMode: FilterMatchMode.CONTAINS }
  })

  const {
    data,
    setData,
    delete: destroy,
    processing,
    reset,
    errors,
  } = useForm({

  });

  const renderHeader = () => {
    return (
      <div className="flex justify-item-end">
        <Link href={route('plots.create')}>
          <Button type="button" icon="pi pi-plus" label="Tambah" severity="success" />
        </Link>
      </div>
    );
  };


  function deletePlot(plot) {
    console.log(plot);
    if (confirm("Are you sure you want to delete this plot?")) {
      destroy(route("plots.destroy", plot), {
        onFinish: () => reset(),
      });
    }
  }

  const header = renderHeader();

  const actionTemplate = (rowData, column) => {
    return <div className="grid grid-cols-2 gap-1">
      <Link href={route('plots.edit', rowData.id)}><Button icon="pi pi-pencil" severity="warning" /></Link>
      <Link><Button onClick={() => deletePlot(rowData)} icon="pi pi-trash" severity="danger" /></Link>
    </div>;
  }

  return (
    <AdminLayout>
      <Head title="Petak" />
      <h2 className="text-2xl font-bold">
        Petak
      </h2>
      <div className="mt-2">
        <DataTable value={props.plots} paginator rows={10} dataKey="id" filters={filters} filterDisplay="row" loading={loading}
          globalFilterFields={['name', 'latitude', 'longitude']} header={header} emptyMessage="No data found."
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries" rowsPerPageOptions={[10, 25, 50]}>
          <Column field="name" header="VAK" filter filterPlaceholder="Search by VAK" sortable style={{ minWidth: '12rem' }} />
          <Column field="child_name" header="Anak Petak" filter filterPlaceholder="Search by Anak Petak" sortable style={{ minWidth: '12rem' }} />
          <Column field="latitude" header="Latitude" filter filterPlaceholder="Search by latitude" sortable style={{ minWidth: '12rem' }} />
          <Column field="longitude" header="Longitude" filter filterPlaceholder="Search by longitude" sortable style={{ minWidth: '12rem' }} />
          <Column field="modifiedTime" header="Action" body={(e) => actionTemplate(e)} style={{ minWidth: '10rem' }} />
        </DataTable>
      </div>
    </AdminLayout>
  )
}
