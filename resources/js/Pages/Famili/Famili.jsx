import { AdminLayout } from "@/Layouts/AdminLayout";
import { Head, useForm } from '@inertiajs/react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState } from "react";
import { Button } from 'primereact/button';
import { Link } from '@inertiajs/react';


export default function Famili(props) {
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    genus: { value: null, matchMode: FilterMatchMode.CONTAINS }
  })
  console.log(props);

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
        <Link href={route('families.create')}>
          <Button type="button" icon="pi pi-plus" label="Tambah" severity="success" />
        </Link>

      </div>
    );
  };


  function deletefamili(famili) {
    console.log(famili);
    if (confirm("Are you sure you want to delete this famili?")) {
      destroy(route("families.destroy", famili.id), {
        onFinish: () => reset(),
      });
    }
  }

  const header = renderHeader();

  const actionTemplate = (rowData, column) => {
    return <div className="grid grid-cols-2 gap-1">
      <Link href={route('families.edit', rowData.id)}><Button icon="pi pi-pencil" severity="warning" /></Link>
      <Button onClick={() => deletefamili(rowData)} icon="pi pi-trash" severity="danger" />
    </div>;
  }

  return (
    <AdminLayout dataRequestCount={props.dataRequestCount}>
      <Head title="famili" />
      <div className="w-full px-4 py-5 bg-white rounded-lg shadow ">


        <h2 className="text-2xl font-bold">
          Famili
        </h2>
        <div className="mt-2">
          <DataTable value={props.families} paginator rows={10} dataKey="id" filters={filters} filterDisplay="row" loading={loading}
            globalFilterFields={['name', 'genus']} header={header} emptyMessage="No data found."
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries" rowsPerPageOptions={[10, 25, 50]}>
            <Column field="name" header="Name" filter filterPlaceholder="Search by name" sortable style={{ minWidth: '12rem' }} />
            <Column field="modifiedTime" header="Action" body={(e) => actionTemplate(e)} style={{ minWidth: '10rem' }} />
          </DataTable>
        </div>
      </div>
    </AdminLayout>
  )
}
