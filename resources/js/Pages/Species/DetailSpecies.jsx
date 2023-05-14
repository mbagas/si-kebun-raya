import { AdminLayout } from "@/Layouts/AdminLayout";
import { Head, Link, useForm } from '@inertiajs/react';
import { Image } from 'primereact/image';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { useState, useRef } from "react";
import { router } from '@inertiajs/react'
import { Dialog } from 'primereact/dialog';
import { QRCodeCanvas } from 'qrcode.react';
import { Calendar } from 'primereact/calendar';


export default function AddSpecies(props) {
  const [loading, setLoading] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [plantPhoto, setPlantPhoto] = useState([,]);
  const [filters, setFilters] = useState({
    access_number: { value: null, matchMode: FilterMatchMode.CONTAINS },
    coordinate: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { value: null, matchMode: FilterMatchMode.CONTAINS }
  })

  const { data, setData, post, delete: destroy, processing, errors, reset } = useForm({
    id: '',
    accessNumber: '',
    coordinate: '',
    status: '',
    speciesId: props.species.id,
    image: '',
    planter: '',
    plantingDate: new Date(),
    inspectionDate: new Date(),
  });

  const handleOnChange = (event) => {
    setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
  };

  const submitAdd = (e) => {
    e.preventDefault();

    post(route('plants.store'), {
      onFinish: () => { setFormVisible(false) }
    });
  };

  const submitEdit = (e) => {
    e.preventDefault();
    console.log(data);
    post(route('plants.update', data.id, {
      _method: 'patch',
    }), {
      onFinish: () => {
        setFormVisible(false);
      }
    });
  };

  function deletePlant(plant) {
    console.log(plant);
    if (confirm("Are you sure you want to delete this plant?")) {
      destroy(route("plants.destroy", plant.id), {
        resetOnSuccess: true,
        preserveScroll: true,
      });
    }
  }

  const addPlant = () => {
    setIsEditing(false);
    setData({
      accessNumber: '',
      coordinate: '',
      status: '',
      speciesId: props.species.id,
      image: '',
      planter: '',
      plantingDate: new Date(),
      inspectionDate: new Date(),
    });
    setFormVisible(true);
  }

  const editPlant = (rowData) => {
    setIsEditing(true);
    console.log(rowData);
    setPlantPhoto(rowData.image);
    setData({
      id: rowData.id,
      accessNumber: rowData.access_number,
      coordinate: rowData.coordinate,
      status: rowData.status,
      speciesId: rowData.species_id,
      image: '',
      planter: rowData.planter ? rowData.planter : '',
      plantingDate: rowData.planting_date ? rowData.planting_date : new Date(),
      inspectionDate: rowData.inspection_date ? rowData.inspection_date : new Date(),
      _method: 'patch',
    });

    setFormVisible(true);
  }

  const onUploadImage = (e) => {

    setPlantPhoto(
      [URL.createObjectURL(e.target.files[0]), true]
    );
    // setPlantPhoto([1, URL.createObjectURL(e.target.files[0])]);
    // setPlantPhoto[2](URL.createObjectURL(plantPhoto[2]));
  }

  const renderHeader = () => {
    return (
      <div className="flex justify-item-end">
        <Button type="button" icon="pi pi-plus" label="Tambah" severity="success" onClick={() => addPlant()} />

      </div>
    );
  };

  const header = renderHeader();

  const actionTemplate = (rowData, column) => {
    return <div className="grid grid-cols-2 gap-1">
      <Button icon="pi pi-pencil" onClick={() => editPlant(rowData)} severity="warning" />
      <Link><Button onClick={() => deletePlant(rowData)} icon="pi pi-trash" severity="danger" /></Link>
    </div>;
  }

  const qrRef = useRef();
  const downloadQRCode = () => {
    let canvas = qrRef.current.querySelector("canvas");
    let image = canvas.toDataURL("image/png");
    let anchor = document.createElement("a");
    anchor.href = image;
    anchor.download = `qr-code.png`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  return (
    <AdminLayout>
      <Head title="Add Species" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4">
        {/* Data Species */}
        <div className="grid grid-cols-1 gap-y-2 px-4 py-5 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-bold">
            Detail Species
          </h2>
          <div className="grid grid-cols-2 gap-x-2">
            <div>
              <label className="font-medium text-sm text-gray-700">
                QR Code :
              </label>
            </div>
            <div className="grid grid-row-2 gap-y-2">
              <div ref={qrRef}>
                <QRCodeCanvas
                  id="qrCode"
                  value={props.speciesUrl}
                  size={150}
                  level={"H"}
                  imageSettings={{
                    src: "/logo-kebun.png",
                    x: undefined,
                    y: undefined,
                    height: 24,
                    width: 24,
                    excavate: true,
                  }}
                />
              </div>
              <div>
                <Button onClick={downloadQRCode} icon="pi pi-trash" label="Download" />

              </div>

            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-2">
            <div>
              <label className="font-medium text-sm text-gray-700">
                Gambar :
              </label>
            </div>
            <div>
              <Image src={props.species.image[0]} onError={(e) => e.target.src = "https://webcolours.ca/wp-content/uploads/2020/10/webcolours-unknown.png"} alt="Image" width="250" preview />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-2">
            <div>
              <label className="font-medium text-sm text-gray-700">
                No Koleksi :
              </label>
            </div>
            <div>
              <label className="font-medium text-sm text-gray-700">
                {props.species.collection_number}{
                  props.species.plant.length > 0 ? '-' + props.species.plant.map((item) => ' ' + props.species.collection_number + (item.access_number ? item.access_number: '')) : ''
                }
              </label>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-2">
            <div>
              <label className="font-medium text-sm text-gray-700">
                No Akses :
              </label>
            </div>
            <div>
              <label className="font-medium text-sm text-gray-700">
                {props.species.access_number}
              </label>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-2">
            <div>
              <label className="font-medium text-sm text-gray-700">
                No Kolektor :
              </label>
            </div>
            <div>
              <label className="font-medium text-sm text-gray-700">
                {props.species.collector_number}
              </label>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-2">
            <div>
              <label className="font-medium text-sm text-gray-700">
                Nama Species :
              </label>
            </div>
            <div>
              <label className="font-medium text-sm text-gray-700">
                {props.species.genus} {props.species.name}
              </label>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-2">
            <div>
              <label className="font-medium text-sm text-gray-700">
                Nama Lokal :
              </label>
            </div>
            <div>
              <label className="font-medium text-sm text-gray-700">
                {props.species.local_name}
              </label>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-2">
            <div>
              <label className="font-medium text-sm text-gray-700">
                Famili :
              </label>
            </div>
            <div>
              <label className="font-medium text-sm text-gray-700">
                {props.species.famili.name}
              </label>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-2">
            <div>
              <label className="font-medium text-sm text-gray-700">
                Petak :
              </label>
            </div>
            <div>
              <label className="font-medium text-sm text-gray-700">
                {props.species.plot.name}
              </label>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-2">
            <div>
              <label className="font-medium text-sm text-gray-700">
                Tanggal Tanam :
              </label>
            </div>
            <div>
              <label className="font-medium text-sm text-gray-700">
                {props.species.planting_date}
              </label>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-2">
            <div>
              <label className="font-medium text-sm text-gray-700">
                Asal Koleksi :
              </label>
            </div>
            <div>
              <label className="font-medium text-sm text-gray-700">
                {props.species.collection_origin}
              </label>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-2">
            <div>
              <label className="font-medium text-sm text-gray-700">
                Jumlah di Pembibitan :
              </label>
            </div>
            <div>
              <label className="font-medium text-sm text-gray-700">
                {props.species.amount_in_nurseries}
              </label>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-2">
            <div>
              <label className="font-medium text-sm text-gray-700">
                Jumlah di Lapangan :
              </label>
            </div>
            <div>
              <label className="font-medium text-sm text-gray-700">
                {props.species.amount_in_field}
              </label>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-2">
            <div>
              <label className="font-medium text-sm text-gray-700">
                Total :
              </label>
            </div>
            <div>
              <label className="font-medium text-sm text-gray-700">
                {props.species.total}
              </label>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-2">
            <div>
              <label className="font-medium text-sm text-gray-700">
                Koordinat Tanam :
              </label>
            </div>
            <div>
              <label className="font-medium text-sm text-gray-700">
                {props.species.planting_coordinate}
              </label>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-2">
            <div>
              <label className="font-medium text-sm text-gray-700">
                Deskripsi :
              </label>
            </div>
            <div>
              <label className="font-medium text-sm text-gray-700">
                {props.species.description}
              </label>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-2">
            <div>
              <label className="font-medium text-sm text-gray-700">
                Manfaat :
              </label>
            </div>
            <div>
              <label className="font-medium text-sm text-gray-700">
                {props.species.benefit}
              </label>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-2">
            <div>
              <label className="font-medium text-sm text-gray-700">
                Cara Mendapatkan :
              </label>
            </div>
            <div>
              <label className="font-medium text-sm text-gray-700">
                {props.species.way_to_collect}
              </label>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-2">
            <div>
              <label className="font-medium text-sm text-gray-700">
                Jenis Tertera :
              </label>
            </div>
            <div>
              <label className="font-medium text-sm text-gray-700">
                {props.species.type_exist}
              </label>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-2">
            <div>
              <label className="font-medium text-sm text-gray-700">
                Spesies Tidak Tertera :
              </label>
            </div>
            <div>
              <label className="font-medium text-sm text-gray-700">
                {props.species.sp_exist}
              </label>
            </div>
          </div>

        </div>
        {/* Koleksi Spesimen */}
        <div className="px-4 py-5 bg-white rounded-lg shadow">
          <h4 className="text-xl font-bold">
            Koleksi Spesimen
          </h4>
          <div className="mt-2">
            <DataTable value={props.species.plant} paginator rows={10} dataKey="id" filters={filters} filterDisplay="row" loading={loading}
              globalFilterFields={['access_number', 'coordinate', 'status']} header={header} emptyMessage="No data found."
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries" rowsPerPageOptions={[10, 25, 50]}>
              <Column field="access_number" header="No Akses" filter filterPlaceholder="Search by access_number" sortable style={{ minWidth: '12rem' }} />
              <Column field="coordinate" header="Koordinat" filter filterPlaceholder="Search by coordinate" sortable style={{ minWidth: '12rem' }} />
              <Column field="status" header="Status" filter filterPlaceholder="Search by status" sortable style={{ minWidth: '12rem' }} />
              <Column field="modifiedTime" header="Action" body={(e) => actionTemplate(e)} style={{ minWidth: '12rem' }} />
            </DataTable>
          </div>

          {/* Plant Form */}
          <Dialog header={isEditing ? 'Edit Tanaman' : 'Tambah Tanaman'} visible={formVisible} style={{ maxWidth: '90vw', minWidth: '50vw' }} onHide={() => setFormVisible(false)}>
            <form onSubmit={isEditing ? submitEdit : submitAdd}>
              <div>
                <InputLabel htmlFor="name" value="No Akses" />

                <TextInput
                  id="name"
                  name="accessNumber"
                  value={data.accessNumber}
                  className="mt-1 block w-full"
                  autoComplete="name"
                  isFocused={true}
                  onChange={handleOnChange}
                />

                <InputError message={errors.accessNumber} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="genus" value="Koordinat Tanam" />

                <TextInput
                  id="coordinate"
                  name="coordinate"
                  value={data.coordinate}
                  className="mt-1 block w-full"
                  autoComplete="Koordinat tanam"
                  onChange={handleOnChange}
                  required
                />

                <InputError message={errors.genus} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="genus" value="Status Tanaman" />

                <Dropdown value={data.status} optionValue="name" onChange={(e) => setData('status', e.value)} options={[{ name: 'mati' }, { name: 'hidup' }, { name: 'sakit' }]} optionLabel="name"
                  placeholder="Select status" className="w-full md:w-14rem" />

                <InputError message={errors.genus} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="genus" value="Gambar Tanaman" />
                {
                  isEditing ? <Image src={plantPhoto[0]} onError={(e) => e.target.src = "https://webcolours.ca/wp-content/uploads/2020/10/webcolours-unknown.png"} alt="Image" width="250" preview /> : ''
                }

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
                    setData("image", e.target.files[0]);
                    onUploadImage(e)
                  }
                  }
                  accept="image/*"
                />

                <InputError message={errors.genus} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="genus" value="Penanam" />

                <TextInput
                  id="planter"
                  name="planter"
                  value={data.planter}
                  className="mt-1 block w-full"
                  autoComplete="Penanam"
                  onChange={handleOnChange}
                  required
                />

                <InputError message={errors.planter} className="mt-2" />
              </div>
              {
                isEditing ? (<>
                  <div className="mt-4">
                    <InputLabel htmlFor="inspectionDate" value="Tanggal Tanam" />

                    <Calendar value={new Date(data.plantingDate)} onChange={(e) => setData('plantingDate', e.value)} dateFormat="yy-mm-dd" />

                    <InputError message={errors.name} className="mt-2" />
                  </div>
                  <div className="mt-4">
                    <InputLabel htmlFor="inspectionDate" value="Tanggal Inspeksi" />

                    <Calendar value={new Date(data.inspectionDate)} onChange={(e) => setData('inspectionDate', e.value)} dateFormat="yy-mm-dd" />

                    <InputError message={errors.name} className="mt-2" />
                  </div>
                </>) : (
                  <div className="mt-4">
                    <InputLabel htmlFor="inspectionDate" value="Tanggal Tanam" />

                    <Calendar value={new Date(data.plantingDate)} onChange={(e) => setData('plantingDate', e.value)} dateFormat="yy-mm-dd" />

                    <InputError message={errors.name} className="mt-2" />
                  </div>
                )
              }


              <div className="flex items-center justify-end mt-4">

                <PrimaryButton className="ml-4" disabled={processing}>
                  Save
                </PrimaryButton>
              </div>
            </form>
          </Dialog>
        </div>
      </div>

    </AdminLayout>
  )
}
