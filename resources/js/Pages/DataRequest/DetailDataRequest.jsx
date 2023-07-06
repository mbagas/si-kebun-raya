import { AdminLayout } from "@/Layouts/AdminLayout";
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from 'primereact/button';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import React, { useState, useRef, useEffect } from "react";
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';

export default function DetailDataRequest(props) {
  const [formVisible, setFormVisible] = useState(false);
  const { data, setData, patch, reset, errors } = useForm({
    id: props.dataRequest.id,
    name: props.dataRequest.name,
    email: props.dataRequest.email,
    institute: props.dataRequest.institute,
    family_id: props.dataRequest.family_id,
    species_id: props.dataRequest.species_id,
    status: props.dataRequest.status,
    reason: props.dataRequest.reason,
    type: props.dataRequest.type,
    declineReason: '',
  });

  useEffect(() => {
    console.log(data);
    if (data.status != 'Pending' && props.dataRequest.token == null && props.dataRequest.decline_reason == null) {
      patch(route('data-request.update', props.dataRequest.id), {
        preserveScroll: true,
      });
    }
  }, [data])

  const handleOnChange = (event) => {
    setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
  };


  console.log(props);
  return (
    <AdminLayout dataRequestCount={props.dataRequestCount}>
      <Head title="Detail Data Request" />
      <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold">
          Detail Permintaan Data Tanaman
        </h2>
        <div className="flex flex-col w-full md:w-3/5">
          <div className="grid grid-cols-3 gap-x-2">
            <div>
              <label className="font-medium text-sm text-gray-700">
                Nama :
              </label>
            </div>
            <div className="col-span-2">
              <label className="font-medium text-sm text-gray-700">
                {props.dataRequest.name}
              </label>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-x-2">
            <div>
              <label className="font-medium text-sm text-gray-700">
                Email :
              </label>
            </div>
            <div className="col-span-2">
              <label className="font-medium text-sm text-gray-700">
                {props.dataRequest.email}
              </label>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-x-2">
            <div>
              <label className="font-medium text-sm text-gray-700">
                Institusi :
              </label>
            </div>
            <div className="col-span-2">
              <label className="font-medium text-sm text-gray-700">
                {props.dataRequest.institute}
              </label>
            </div>
          </div>
          {
            props.dataRequest.family_id ? (
              <div className="grid grid-cols-3 gap-x-2">
                <div>
                  <label className="font-medium text-sm text-gray-700">
                    Famili :
                  </label>
                </div>
                <div className="col-span-2">
                  <label className="font-medium text-sm text-gray-700">
                    {props.dataRequest.famili.name}
                  </label>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-x-2">
                <div>
                  <label className="font-medium text-sm text-gray-700">
                    Spesies :
                  </label>
                </div>
                <div className="col-span-2">
                  <label className="font-medium text-sm text-gray-700">
                    {
                      props.dataRequest.species.map((item, index) => {
                        return item.genus + ' ' + item.name + (index !== props.dataRequest.species.length - 1 ? ', ' : '')
                      })
                    }
                  </label>
                </div>
              </div>
            )
          }

          <div className="grid grid-cols-3 gap-x-2">
            <div>
              <label className="font-medium text-sm text-gray-700">
                Alasan :
              </label>
            </div>
            <div className="col-span-2">
              <label className="font-medium text-sm text-gray-700">
                {props.dataRequest.reason}
              </label>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-x-2">
            <div>
              <label className="font-medium text-sm text-gray-700">
                Dokumen Pendukung :
              </label>
            </div>
            <div className="col-span-2">
              {
                props.dataRequest.document[1] == "" ? (<label className="font-medium text-sm text-gray-700">Tidak ada dokumen pendukung</label>) : (<a className="font-semibold text-blue-700" href={props.dataRequest.document[0]} download>download dokumen</a>)
              }
             
            </div>
          </div>

          <div className="grid grid-cols-3 gap-x-2">
            <div>
              <label className="font-medium text-sm text-gray-700">
                Status :
              </label>
            </div>
            <div className="col-span-2">
              <label className="font-bold text-sm text-gray-700">
                {props.dataRequest.status}
              </label>
            </div>
          </div>

          {
            props.dataRequest.status === 'Ditolak' && props.dataRequest.status != 'Pending' ? (
              <div className="grid grid-cols-3 gap-x-2">
                <div>
                  <label className="font-medium text-sm text-gray-700">
                    Alasan ditolak :
                  </label>
                </div>
                <div className="col-span-2">
                  <label className="font-medium text-sm text-gray-700">
                    {props.dataRequest.decline_reason}
                  </label>
                </div>
              </div>
            ) : props.dataRequest.status === 'Diterima' && props.dataRequest.status != 'Pending' ? (
                <div className="grid grid-cols-3 gap-x-2">
                  <div>
                    <label className="font-medium text-sm text-gray-700">
                      Token :
                    </label>
                  </div>
                  <div className="col-span-2">
                    <label className="font-medium text-sm text-gray-700">
                      {props.dataRequest.token}
                    </label>
                  </div>
                </div>
            ) : ''
          }


        </div>
        <div className="mt-6  grid justify-items-stretch">
          <label className="font-medium text-sm text-gray-700 justify-self-center">
            Note : Setelah divalidasi data akan langsung dikirimkan melalui email yang dicantumkan.
          </label>
        </div>
        <div className="grid grid-cols-2 gap-x-4 mt-10 justify-items-start">
          <div className="justify-self-center md:justify-self-end">
            <Button type="button" onClick={() => setData('status', 'Diterima')} label="Validasi" severity="success" />
          </div>
          <div className="justify-self-center md:justify-self-start">
            <Button type="button" onClick={() => setFormVisible(true)} outlined label="Tolak" severity="danger" />
          </div>
        </div>
      </div>
      <Dialog header="Tolak Permintaan" visible={formVisible} onHide={() => setFormVisible(false)}>
        <div className="flex flex-col w-full md:w-80">
          <div className="mb-4 mt-4">
            <InputLabel htmlFor="inspectionDate" value="Alasan ditolak" />
            <InputTextarea
              id="declineReason"
              name="declineReason"
              value={data.declineReason}
              className="mt-1 block w-full"
              autoComplete="A"
              isFocused={true}
              onChange={handleOnChange} />
          </div>
          <div className="flex items-center justify-end gap-3">
            <Button type="button" onClick={() => {
              setData('status', 'Ditolak');
            }} label="Tolak" severity="danger" />
            <Button type="button" onClick={() => setFormVisible(false)} outlined label="Batal" severity="secondary" />
          </div>
        </div>
      </Dialog>
    </AdminLayout>
  )
}
