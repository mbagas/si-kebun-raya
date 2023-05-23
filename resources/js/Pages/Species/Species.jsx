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
// import route from "vendor/tightenco/ziggy/src/js";

export default function Species(props) {
  const [loading, setLoading] = useState(false);
  const [exportVisible, setExportVisible] = useState(false);
  const [importCsvVisible, setImportCsvVisible] = useState(false);
  const [filters, setFilters] = useState({
    access_number: { value: null, matchMode: FilterMatchMode.CONTAINS },
    genus: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    famili: { value: null, matchMode: FilterMatchMode.CONTAINS },
    collection_origin: { value: null, matchMode: FilterMatchMode.CONTAINS },
    planting_date: { value: null, matchMode: FilterMatchMode.CONTAINS },
  })
  const [filteredData, setFilteredData] = useState();
  const [listAsalKoleksi, setListAsalKoleksi] = useState([
    'Semua', ...new Set(props.species.map((obj) => obj.collection_origin)),
  ]);
  const [listGenus, setListGenus] = useState([
    'Semua', ...new Set(props.species.map((obj) => obj.genus)),
  ]);
  const [filterByAsal, setFilterByAsal] = useState('Semua');
  const [filterByCara, setFilterByCara] = useState('Semua');
  const [filterByFamili, setFilterByFamili] = useState('Semua');
  const [filterByGenus, setFilterByGenus] = useState('Semua');


  useEffect(() => {

    const items = props.species.map((item) => ({
      'Nomor Koleksi': item.collection_number,
      'Nomor Akses': item.access_number,
      'Nomor Kolektor': item.collector_number,
      'Nama Spesies': item.genus + ' ' + item.name,
      'Nama Lokal': item.local_name,
      'Famili': item.famili.name,
      'Tanggal Tanam': item.planting_date,
      'Asal Koleksi': item.collection_origin,
      'Jumlah di Pembibitan': item.amount_in_nurseries,
      'Jumlah di Lapangan': item.amount_in_field,
      'Total': item.total,
      'Marga': item.genus_exist,
      'Jenis': item.type_exist,
      'sp': item.sp_exist,
      'Lokasi Tanam': item.planting_coordinate,
      'Cara Mendapatkan': item.way_to_collect,
    }));

    setFilteredData(items);

  }, [loading])

  const {
    data,
    setData,
    delete: destroy,
    post,
    processing,
    reset,
    errors,
  } = useForm({

  });

  const exportExcel = useCallback(() => {
    console.log(filterByFamili, filterByGenus, filterByCara, filterByAsal)
    console.log(filteredData.filter((item) => {

      if (filterByFamili && item['Famili'] !== filterByFamili && filterByFamili !== 'Semua') {
        return false;
      }
      if (filterByGenus && !item['Nama Spesies'].toLowerCase().includes(filterByGenus.toLowerCase()) && filterByGenus !== 'Semua') {
        return false;
      }
      if (filterByAsal && item['Asal Koleksi'] !== filterByAsal && filterByAsal !== 'Semua') {
        return false;
      }
      if (filterByCara && item['Cara Mendapatkan'] !== filterByCara && filterByCara !== 'Semua') {
        return false
      }
      return true;

    }))
    const ws = utils.json_to_sheet(filteredData.filter((item) => {

      if (filterByFamili && item['Famili'] !== filterByFamili && filterByFamili !== 'Semua') {
        return false;
      }
      if (filterByGenus && !item['Nama Spesies'].toLowerCase().includes(filterByGenus.toLowerCase()) && filterByGenus !== 'Semua') {
        return false;
      }
      if (filterByAsal && item['Asal Koleksi'] !== filterByAsal && filterByAsal !== 'Semua') {
        return false;
      }
      if (filterByCara && item['Cara Mendapatkan'] !== filterByCara && filterByCara !== 'Semua') {
        return false
      }
      return true;

    }));
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    writeFileXLSX(wb, "exportExcel.xlsx");
  }, [filteredData, filterByAsal, filterByCara, filterByFamili, filterByGenus])

  const renderHeader = () => {
    return (
      <div className="flex justify-item-end">
        <Link href={route('species.create')}>
          <Button type="button" icon="pi pi-plus" label="Tambah" severity="success" />
        </Link>
        {/* <div className="ml-4">
          <Button onClick={() => setImportCsvVisible(true)} icon="pi pi-file-excel" label="Import CSV" severity="warning"/>
        </div> */}
        <div className="ml-4">
          <Button onClick={() => setExportVisible(true)} icon="pi pi-file-excel" label="Export Excel" />
        </div>

      </div>
    );
  };


  function deleteSpecies(species) {
    console.log(species);
    if (confirm("Are you sure you want to delete this species?")) {
      destroy(route("species.destroy", species.id));
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

  const importCSV = (e) => {
    e.preventDefault();

    post(route('species.import'));
  }



  return (
    <AdminLayout>
      <Head title="species" />
      <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold">
          species
        </h2>
        <div className="mt-2">
          <DataTable value={props.species} paginator rows={10} dataKey="id" filters={filters} filterDisplay="row" loading={loading}
            globalFilterFields={['access_number', 'name', 'local_name', 'famili', 'collection_origin', 'planting_date']} header={header} emptyMessage="No data found."
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries" rowsPerPageOptions={[10, 25, 50]}>
            <Column field="access_number" header="No Akses" filter filterPlaceholder="Search by name" sortable style={{ minWidth: '11rem' }} />
            <Column field="genus" header="Genus" filter filterPlaceholder="Search by genus" sortable style={{ minWidth: '11rem' }} />
            <Column field="name" header="Nama" filter filterPlaceholder="Search by name" sortable style={{ minWidth: '11rem' }} />
            <Column field="famili.name" header="Famili" filter filterPlaceholder="Search by name" sortable style={{ minWidth: '11rem' }} />
            <Column field="collection_origin" header="Asal Koleksi" filter filterPlaceholder="Search by name" sortable style={{ minWidth: '11rem' }} />
            <Column field="planting_date" header="Tanggal Tanam" filter filterPlaceholder="Search by name" sortable style={{ minWidth: '11rem' }} />
            <Column field="way_to_collect" header="Cara Mendapatkan" filter filterPlaceholder="Search by name" sortable style={{ minWidth: '11rem' }} />
            <Column field="modifiedTime" header="Action" body={(e) => actionTemplate(e)} style={{ minWidth: '15rem' }} />
          </DataTable>
        </div>
      </div>

      <Dialog header={'Export data spesies'} visible={exportVisible} style={{ maxWidth: '90vw', minWidth: '50vw' }} onHide={() => setExportVisible(false)}>
        <div className="mt-4">
          <InputLabel htmlFor="name" value="Filter Famili" />

          <Dropdown value={filterByFamili} onChange={(e) => { setFilterByFamili(e.value) }} options={['Semua', ...props.families.map((item) => item.name)]}
            placeholder="Select a Famili" className="w-full md:w-14rem" />
        </div>
        <div className="mt-4">
          <InputLabel htmlFor="name" value="Filter Genus" />

          <Dropdown value={filterByGenus} onChange={(e) => { setFilterByGenus(e.value) }} options={listGenus}
            placeholder="Select a Genus" className="w-full md:w-14rem" />
        </div>
        <div className="mt-4">
          <InputLabel htmlFor="name" value="Filter Asal Koleksi" />

          <Dropdown value={filterByAsal} onChange={(e) => { setFilterByAsal(e.value) }} options={listAsalKoleksi}
            placeholder="Select a Famili" className="w-full md:w-14rem" />
        </div>
        <div className="mt-4">
          <InputLabel htmlFor="wayToCollect" value="Filter Cara Mendapatkan" />

          <Dropdown value={filterByCara} onChange={(e) => setFilterByCara(e.value)} options={['Semua', 'hibah', 'eksplorasi', 'pertukaran']}
            placeholder="Select status" className="w-full md:w-14rem" />
        </div>
        <div className="flex items-center justify-end mt-4">
          <Button onClick={exportExcel} label="Export" />
        </div>
      </Dialog>

      <Dialog header={'Export data spesies dengan CSV'} visible={importCsvVisible} style={{ maxWidth: '90vw', minWidth: '50vw' }} onHide={() => setImportCsvVisible(false)}>
        <form onSubmit={importCSV}>
          <div className="mt-4">
            <InputLabel htmlFor="image" value="File CSV" />

            <input
              type="file"
              className="block w-full text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-violet-700
            hover:file:bg-violet-100"
              label="File"
              name="file"
              onChange={(e) => {
                setData("file", e.target.files[0]);
              }
              }
              accept=".csv"
            />
          </div>
          <div className="mt-4">
            <p>
              <i className="italic font-semibold">note :</i>
              <ul className="list-disc ml-6">
                <li>File csv harus sesuai dengan format yang telah ditentukan</li>
                <li>Data Famili dan VAK beserta anak petak yang blum tedaftar pada master data harus diinputkan terlebih dahulu pada master data</li>
                <li>
                  <p>Contoh format CSV : </p>
                  <table className="border-collapse border border-black w-full">
                    <thead>
                      <th className="border border-black p-1">nomor koleksi</th>
                      <th className="border border-black p-1">nomor akses</th>
                      <th className="border border-black p-1">nomor kolektor</th>
                      <th className="border border-black p-1">nama spesies</th>
                      <th className="border border-black p-1">genus</th>
                      <th className="border border-black p-1">nama lokal</th>
                      <th className="border border-black p-1">famili</th>
                      <th className="border border-black p-1">vak</th>
                      <th className="border border-black p-1">anak petak</th>
                      <th className="border border-black p-1">tanggal tanam</th>
                      <th className="border border-black p-1">asal koleksi</th>
                      <th className="border border-black p-1">jumlah di pembibitan</th>
                      <th className="border border-black p-1">jumlah di lapangan</th>
                      <th className="border border-black p-1">total</th>
                      <th className="border border-black p-1">terdapat genus</th>
                      <th className="border border-black p-1">terdapat spesies</th>
                      <th className="border border-black p-1">tidak terdapat spesies</th>
                      <th className="border border-black p-1">koordinat tanam</th>
                      <th className="border border-black p-1">cara mendapatkan</th>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-black p-1">1</td>
                        <td className="border border-black p-1">IT2021120013</td>
                        <td className="border border-black p-1">DM. 3366</td>
                        <td className="border border-black p-1">palembanica</td>
                        <td className="border border-black p-1">Intsia</td>
                        <td className="border border-black p-1">Merbau</td>
                        <td className="border border-black p-1">Fabaceae</td>
                        <td className="border border-black p-1">V</td>
                        <td className="border border-black p-1">A</td>
                        <td className="border border-black p-1">22 Juli 2020</td>
                        <td className="border border-black p-1">Kebun Raya Bogor</td>
                        <td className="border border-black p-1">4</td>
                        <td className="border border-black p-1">0</td>
                        <td className="border border-black p-1">4</td>
                        <td className="border border-black p-1">1</td>
                        <td className="border border-black p-1">1</td>
                        <td className="border border-black p-1">0</td>
                        <td className="border border-black p-1">"-5.36578 105.30878" "-5.36586 105.30869"</td>
                        <td className="border border-black p-1">Hibah</td>

                      </tr>
                    </tbody>
                  </table>
                </li>
              </ul>

            </p>
          </div>
          <div className="flex items-center justify-end mt-4">
            <Button type="submit" label="Import" />
          </div>
        </form>

      </Dialog>
    </AdminLayout>
  )
}
