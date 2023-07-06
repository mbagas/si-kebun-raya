import { AdminLayout } from "@/Layouts/AdminLayout";
import { Head, useForm } from '@inertiajs/react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState } from "react";
import { Button } from 'primereact/button';
import { Link } from '@inertiajs/react';
import moment from 'moment'

export default function DataRequest(props) {
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    email: { value: null, matchMode: FilterMatchMode.CONTAINS },
    institute: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { value: null, matchMode: FilterMatchMode.CONTAINS },
  })
  console.log(props);
  const actionTemplate = (rowData, column) => {
    return <div className="grid grid-cols-2 gap-1">
      <Link href={route('data-request.show', rowData.id)}><Button icon="pi pi-eye" severity="success" /></Link>
    </div>;
  }

  const timeCreated = (rowData, column) => {
    return <div className="grid grid-cols-2 gap-1">
      <p>{moment(rowData.created_at).format('yyyy-MM-DD HH:m')}</p>
    </div>;
  }

  return (
    <AdminLayout dataRequestCount={props.dataRequestCount}>
      <Head title="Permintaan Data" />
      <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold">
          Permintaan Data
        </h2>
        <div className="mt-2">
          <DataTable value={props.dataRequest} paginator rows={10} dataKey="id" filters={filters} filterDisplay="row" loading={loading}
            globalFilterFields={['name', 'email', 'institute']} emptyMessage="No data found."
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries" rowsPerPageOptions={[10, 25, 50]}>
            <Column field="name" header="Nama" filter filterPlaceholder="Search by name" sortable style={{ minWidth: '12rem' }} />
            <Column field="email" header="Email" filter filterPlaceholder="Search by email" sortable style={{ minWidth: '12rem' }} />
            <Column field="institute" header="Institusi" filter filterPlaceholder="Search by institute" sortable style={{ minWidth: '12rem' }} />
            <Column field="status" header="Status" filter filterPlaceholder="Search by status" sortable style={{ minWidth: '12rem' }} />
            <Column field="created_at" header="Tanggal" body={(e) => timeCreated(e)} filter filterPlaceholder="Search by Tanggal" sortable style={{ minWidth: '12rem' }} />
            <Column field="modifiedTime" header="Action" body={(e) => actionTemplate(e)} style={{ minWidth: '10rem' }} />
          </DataTable>
        </div>
      </div>
    </AdminLayout>
  )
}
