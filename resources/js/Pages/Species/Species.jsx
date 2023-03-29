import { AdminLayout } from "@/Layouts/AdminLayout";
import { Head, useForm } from '@inertiajs/react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState } from "react";
import { Button } from 'primereact/button';
import { Link } from '@inertiajs/react';


export default function Species(props) {
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
        <Link href={route('species.create')}>
          <Button type="button" icon="pi pi-plus" label="Tambah" severity="success" />
        </Link>

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
    return <div className="grid grid-cols-2 gap-1">
      <Link href={route('species.edit', rowData.id)}><Button onClick={() => rowColumnClick(rowData)} icon="pi pi-pencil" label="Edit" severity="warning" /></Link>
      <Link><Button onClick={() => deleteSpecies(rowData)} icon="pi pi-trash" label="Hapus" severity="danger" /></Link>
    </div>;
  }

  const rowColumnClick = (rowData) => {
    console.log(rowData);
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
          <Column field="access_number" header="Access number" filter filterPlaceholder="Search by name" sortable style={{ minWidth: '12rem' }} />
          <Column field="name" header="Name" filter filterPlaceholder="Search by name" sortable style={{ minWidth: '12rem' }} />
          <Column field="local_name" header="Local name" filter filterPlaceholder="Search by name" sortable style={{ minWidth: '12rem' }} />
          <Column field="famili.name" header="Famili" filter filterPlaceholder="Search by name" sortable style={{ minWidth: '12rem' }} />
          <Column field="collection_origin" header="Collection origin" filter filterPlaceholder="Search by name" sortable style={{ minWidth: '12rem' }} />
          <Column field="planting_date" header="Planting date" filter filterPlaceholder="Search by name" sortable style={{ minWidth: '12rem' }} />
          <Column field="modifiedTime" header="Action" body={(e) => actionTemplate(e)} style={{ minWidth: '15rem' }} />
        </DataTable>
      </div>
    </AdminLayout>
  )
}
