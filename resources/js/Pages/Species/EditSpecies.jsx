import { AdminLayout } from "@/Layouts/AdminLayout";
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { Image } from 'primereact/image';

import { useState } from "react";
import { router } from '@inertiajs/react'

export default function AddSpecies(props) {
  let date = new Date(props.species.planting_date)
  console.log(date)
  console.log(props.species)
  const { data, setData, post, processing, errors, reset } = useForm({
    _method: 'patch',
    collectionNumber: props.species.collection_number,
    accessNumber: props.species.access_number,
    collectorNumber: props.species.collector_number,
    name: props.species.name,
    genus: props.species.genus,
    localName: props.species.local_name,
    familyId: props.species.family_id,
    plotId: props.species.plot_id,
    plantingDate: props.species.planting_date,
    planter: props.species.planter,
    collectionOrigin: props.species.collection_origin,
    amountInNurseries: props.species.amount_in_nurseries,
    amountInField: props.species.amount_in_field,
    total: props.species.total,
    plantingCoordinate: props.species.planting_coordinate,
    image: '',
    description: props.species.description,
    benefit: props.species.benefit,
    wayToCollect: props.species.way_to_collect,
    userId: props.species.user_id,
  });

  const handleOnChange = (event) => {
    setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    post(route('species.update', props.species.id, {
      _method: 'patch',
      // image: data.image,
    }));
    // router.post(route('species.update', props.species.id, {
    //   _method: 'patch',
    //   image: data.image,
    // }))
  };
  console.log(data);
  return (
    <AdminLayout>
      <Head title="Add Species" />
      <h2 className="text-2xl font-bold">
        Tambah Species
      </h2>
      <form onSubmit={submit}>
        <div>
          <InputLabel htmlFor="collectionNumber" value="Nomor Koleksi" />

          <TextInput
            id="collectionNumber"
            name="collectionNumber"
            value={data.collectionNumber}
            className="mt-1 block w-full"
            autoComplete="collectionNumber"
            isFocused={true}
            onChange={handleOnChange}
            required
          />

          <InputError message={errors.collectionNumber} className="mt-2" />
        </div>
        <div>
          <InputLabel htmlFor="accessNumber" value="Nomor Akses" />

          <TextInput
            id="accessNumber"
            name="accessNumber"
            value={data.accessNumber}
            className="mt-1 block w-full"
            autoComplete="accessNumber"
            isFocused={true}
            onChange={handleOnChange}
            required
          />

          <InputError message={errors.accessNumber} className="mt-2" />
        </div>
        <div>
          <InputLabel htmlFor="collectorNumber" value="Nomor Kolektor" />

          <TextInput
            id="collectorNumber"
            name="collectorNumber"
            value={data.collectorNumber}
            className="mt-1 block w-full"
            autoComplete="collectorNumber"
            isFocused={true}
            onChange={handleOnChange}
            required
          />

          <InputError message={errors.collectorNumber} className="mt-2" />
        </div>
        <div className="mt-4">
          <InputLabel htmlFor="genus" value="genus" />

          <TextInput
            id="genus"
            name="genus"
            value={data.genus}
            className="mt-1 block w-full"
            autoComplete="familiname"
            onChange={handleOnChange}
            required
          />

          <InputError message={errors.genus} className="mt-2" />
        </div>
        <div>
          <InputLabel htmlFor="name" value="Nama Spesies" />

          <TextInput
            id="name"
            name="name"
            value={data.name}
            className="mt-1 block w-full"
            autoComplete="name"
            isFocused={true}
            onChange={handleOnChange}
            required
          />

          <InputError message={errors.name} className="mt-2" />
        </div>
        
        <div>
          <InputLabel htmlFor="localName" value="Nama Lokal Spesies" />

          <TextInput
            id="localName"
            name="localName"
            value={data.localName}
            className="mt-1 block w-full"
            autoComplete="localName"
            isFocused={true}
            onChange={handleOnChange}
            required
          />

          <InputError message={errors.localName} className="mt-2" />
        </div>
        <div>
          <InputLabel htmlFor="familyId" value="Famili" />

          <Dropdown value={data.familyId} optionValue="id" onChange={(e) => setData('familyId', e.value)} options={props.families} optionLabel="name"
            placeholder="Select a Famili" filter className="w-full md:w-14rem" />

          <InputError message={errors.familyId} className="mt-2" />
        </div>

        <div>
          <InputLabel htmlFor="plotId" value="Petak" />

          <Dropdown value={data.plotId} optionValue="id" onChange={(e) => setData('plotId', e.value)} options={props.plots} optionLabel="name"
            placeholder="Select a Petak" filter className="w-full md:w-14rem" />

          <InputError message={errors.plotId} className="mt-2" />
        </div>
        <div>
          <InputLabel htmlFor="plantingDate" value="Tanggal Tanam" />

          <Calendar value={new Date(data.plantingDate)} onChange={(e) => setData('plantingDate',  e.value)} dateFormat="yy-mm-dd" />

          <InputError message={errors.name} className="mt-2" />
        </div>
        <div>
          <InputLabel htmlFor="planter" value="Penanam" />

          <TextInput
            id="planter"
            name="planter"
            value={data.planter}
            className="mt-1 block w-full"
            autoComplete="planter"
            isFocused={true}
            onChange={handleOnChange}
            required
          />

          <InputError message={errors.planter} className="mt-2" />
        </div>
        <div>
          <InputLabel htmlFor="collectionOrigin" value="Asal Koleksi" />

          <TextInput
            id="collectionOrigin"
            name="collectionOrigin"
            value={data.collectionOrigin}
            className="mt-1 block w-full"
            autoComplete="collectionOrigin"
            isFocused={true}
            onChange={handleOnChange}
            required
          />

          <InputError message={errors.collectionOrigin} className="mt-2" />
        </div>
        <div>
          <InputLabel htmlFor="amountInNurseries" value="Jumlah di Pembibitan" />

          <InputNumber name="amountInNurseries" value={data.amountInNurseries} onValueChange={handleOnChange} />

          <InputError message={errors.amountInNurseries} className="mt-2" />
        </div>
        <div>
          <InputLabel htmlFor="amountInField" value="Jumlah di Lapangan" />

          <InputNumber name="amountInField" value={data.amountInField} onValueChange={handleOnChange} />

          <InputError message={errors.amountInField} className="mt-2" />
        </div>
        <div>
          <InputLabel htmlFor="total" value="Total" />

          <InputNumber name="total" value={data.total = data.amountInNurseries + data.amountInField} disabled onValueChange={handleOnChange} />

          <InputError message={errors.total} className="mt-2" />
        </div>
        <div>
          <InputLabel htmlFor="plantingCoordinate" value="Lokasi Koordinat Tanam" />

          <TextInput
            id="plantingCoordinate"
            name="plantingCoordinate"
            value={data.plantingCoordinate}
            className="mt-1 block w-full"
            autoComplete="plantingCoordinate"
            onChange={handleOnChange}
            required
          />

          <InputError message={errors.plantingCoordinate} className="mt-2" />
        </div>
        <div>
          <InputLabel htmlFor="image" value="Gambar Tanaman" />
          <Image src={props.species.image[0]} alt="Image" width="250" preview />
          <input
            type="file"
            className="block w-full text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-violet-700
            hover:file:bg-violet-100"
            label="image"
            name="image"
            onChange={(e) => {
              setData("image", e.target.files[0]);
              console.log(e.target.files[0]);
            }
            }
            accept="image/*"
          />

          <InputError message={errors.image} className="mt-2" />
        </div>
        <div>
          <InputLabel htmlFor="description" value="Deskripsi" />

          <InputTextarea name="description" autoResize value={data.description} onChange={handleOnChange} rows={5} cols={90} />

          <InputError message={errors.description} className="mt-2" />
        </div>
        <div>
          <InputLabel htmlFor="benefit" value="Manfaat" />

          <InputTextarea name="benefit" autoResize value={data.benefit} onChange={handleOnChange} rows={5} cols={90} />

          <InputError message={errors.benefit} className="mt-2" />
        </div>
        <div className="mt-4">
          <InputLabel htmlFor="wayToCollect" value="Cara Mendapatkan" />

          <Dropdown value={data.wayToCollect} optionValue="name" onChange={(e) => setData('wayToCollect', e.value)} options={[{ name: 'hibah' }, { name: 'eksplorasi' }, { name: 'pertukaran' }]} optionLabel="name"
            placeholder="Select status" className="w-full md:w-14rem" />

          <InputError message={errors.wayToCollect} className="mt-2" />
        </div>


        <div className="flex items-center justify-end mt-4">

          <PrimaryButton className="ml-4" disabled={processing}>
            Save
          </PrimaryButton>
        </div>
      </form>
    </AdminLayout>
  )
}
