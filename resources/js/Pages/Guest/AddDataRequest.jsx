import { GuestsLayout } from "@/Layouts/GuestsLayout";
import { Head, Link, useForm, router } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { useState, useRef } from "react";
import { Toast } from 'primereact/toast';
import { useEffect } from "react";
import { read, utils, writeFileXLSX } from 'xlsx';

export default function AddDataRequest(props) {
  const toast = useRef(null);
  const { data, get, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    institute: '',
    familyId: '',
    speciesId: '',
    reason: '',
    document: '',
    token: '',
    type: 'famili'
  });
  const [token,setToken] = useState();
  console.log(props);

  useEffect(() => {
    if (props.status == '200') {
      toast.current.show({ severity: 'success', summary: 'Token ditemukan' });
      let items =[]
      if(props.dataRequest.family_id != null){
        items = props.dataRequest.famili.species.map((item) => ({
          'Nomor Kolektor': item.collector_number,
          'Nama Spesies': item.genus + ' ' + item.name,
          'Nama Lokal': item.local_name,
          'Famili': item.famili.name,
          'Tanggal Tanam': item.planting_date,
          'Asal Koleksi': item.collection_origin,
          'Jumlah di Pembibitan': item.amount_in_nurseries,
          'Jumlah di Lapangan': item.amount_in_field,
          'Total': item.total,
          'Cara Mendapatkan': item.way_to_collect,
        }));
      } else {
        items = props.dataRequest.species.map((item) => ({
          'Nomor Kolektor': item.collector_number,
          'Nama Spesies': item.genus + ' ' + item.name,
          'Nama Lokal': item.local_name,
          'Famili': item.famili.name,
          'Tanggal Tanam': item.planting_date,
          'Asal Koleksi': item.collection_origin,
          'Jumlah di Pembibitan': item.amount_in_nurseries,
          'Jumlah di Lapangan': item.amount_in_field,
          'Total': item.total,
          'Cara Mendapatkan': item.way_to_collect,
        }));
        console.log(items);
      }

      const ws = utils.json_to_sheet(items);
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, "Data");
      writeFileXLSX(wb, 'exportDataTumbuhan.xlsx');
    } else if (props.status == '205') {
      toast.current.show({ severity: 'error', summary: 'Token tidak ditemukan' });
    } else if (props.status == '204') {
      toast.current.show({ severity: 'error', summary: 'Masa waktu token telah melewati batas waktu 30 hari' });
    }
  },[])

  const handleOnChange = (event) => {
    setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    console.log(data);
    post(route('data-request.store'), {
      onFinish: () => {
        reset();
        toast.current.show({ severity: 'success', summary: 'Data Request Submitted', detail: 'Token akan dikirim melalui email.' });
      }
    });
  }

  const getRequestedData = (e) => {
    router.get(route('dataFilteredByToken', {'token':token}),{
      onSuccess: (data) => {
        console.log(data);
        if(data.status == '200'){
          setRequestedData(data.dataRequest)
          toast.current.show({ severity: 'success', summary: 'Token ditemukan' });
          console.log(data);
        } else {
          toast.current.show({ severity: 'error', summary: 'Token tidak ditemukan' });
        }
      }
    })
  }
  return (
    <GuestsLayout>
      <div>
        <div className="flex justify-center">
          <div>
            <div>
              <h2 className="text-2xl font-semibold">
                Data Request
              </h2>
            </div>
            <div className="grid grid-rows-2 gap-y-4 ">
              <div>
                <InputLabel htmlFor="genus" value="Masukan token untuk mengunduh data" />
                <TextInput
                  id="token"
                  name="token"
                  value={token}
                  className="mt-1 block w-full md:w-96"
                  autoComplete="Masukan token untuk mengunduh data"
                  isFocused={true}
                  onChange={(e)=>setToken(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center justify-center">
                <PrimaryButton className="ml-4" disabled={''} onClick={getRequestedData}>
                  Get Data
                </PrimaryButton>
              </div>
            </div>
          </div>
          
        </div>

        <div>
          <div>
            <h2 className="text-xl">
              Isi data berikut untuk melakukan permintaan data.
            </h2>
            <label>
              Setelah permintaan divalidasi, token akan dikirimkan melalui email.
            </label>
          </div>
          <form onSubmit={submit}>
            <Toast ref={toast} />
            <div className="mt-4">
              <InputLabel htmlFor="name" value="Name*" />

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
            <div className="mt-4">
              <InputLabel htmlFor="name" value="Email*" />

              <TextInput
                id="email"
                name="email"
                value={data.email}
                className="mt-1 block w-full"
                autoComplete="email"
                isFocused={true}
                onChange={handleOnChange}
                type="email"
                required
              />

              <InputError message={errors.name} className="mt-2" />
            </div>
            <div className="mt-4">
              <InputLabel htmlFor="name" value="Institusi*" />

              <TextInput
                id="institute"
                name="institute"
                value={data.institute}
                className="mt-1 block w-full"
                autoComplete="institute"
                isFocused={true}
                onChange={handleOnChange}
                required
              />

              <InputError message={errors.name} className="mt-2" />
            </div>
            <div className="mt-4">
              <InputLabel htmlFor="name" value="Filter By" />

              <div className="flex flex-wrap gap-3">
                <div className="flex align-items-center">
                  <RadioButton inputId="type1" name="type" value="famili" onChange={(e) => setData('type', e.value)} checked={data.type === 'famili'} />
                  <label htmlFor="type1" className="ml-2">Famili</label>
                </div>
                <div className="flex align-items-center">
                  <RadioButton inputId="type2" name="type" value="species" onChange={(e) => setData('type', e.value)} checked={data.type === 'species'} />
                  <label htmlFor="type2" className="ml-2">Species</label>
                </div>
              </div>
            </div>
            {data.type == 'famili' ?
              (<div className="mt-4">
                <InputLabel htmlFor="familyId" value="Famili" />

                <Dropdown value={data.familyId} optionValue="id" onChange={(e) => setData('familyId', e.value)} options={props.families} optionLabel="name"
                  placeholder="Select a Famili" filter className="w-full md:w-14rem" />

                <InputError message={errors.familyId} className="mt-2" />
              </div>) :
              (<div className="mt-4">
                <InputLabel htmlFor="familyId" value="Spesies" />

                <MultiSelect value={data.speciesId} optionValue="id" onChange={(e) => setData('speciesId', e.value)} options={props.species} optionLabel="name"
                  placeholder="Select Species" filter display="chip" maxSelectedLabels={3} className="w-full md:w-14rem" />

                <InputError message={errors.familyId} className="mt-2" />
              </div>)

            }


            <div className="mt-4">
              <InputLabel htmlFor="reason" value="Alasan*" />

              <InputTextarea className="w-full" name="reason" autoResize value={data.reason} onChange={handleOnChange} rows={5} cols={90} />

              <InputError message={errors.reason} className="mt-2" />
            </div>
            <div className="mt-4">
              <InputLabel htmlFor="image" value="Dokumen Pendukung" />

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
                  setData("document", e.target.files[0]);
                }
                }
                accept=".pdf"
              />

              <InputError message={errors.document} className="mt-2" />
            </div>
            <div className="flex items-center justify-end mt-4 mb-10">

              <PrimaryButton className="ml-4" disabled={processing}>
                Submit
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </GuestsLayout>
  )
}
