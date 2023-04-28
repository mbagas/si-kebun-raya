import { AdminLayout } from "@/Layouts/AdminLayout";
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from 'primereact/button';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import React, { useState, useRef, useCallback } from "react";

export default function DetailDataRequest(props) {
  const [loading, setLoading] = useState(false);
  const {data, setData, patch, reset, errors} = useForm({
    id: props.dataRequest.id,
    name: props.dataRequest.name,
    email: props.dataRequest.email,
    institute: props.dataRequest.institute,
    family_id: props.dataRequest.family_id,
    species_id: props.dataRequest.species_id,
    status: props.dataRequest.status,
    reason: props.dataRequest.reason,
  });

  const dataRequestValidate = () => {
    setLoading(true);

    setData('status','Diterima');
    patch(route('data-request.update', props.dataRequest.id), {
      preserveScroll: true,
      onSuccess: () => setLoading(false),
    });
  };

  const dataRequestReject = () => {
    setLoading(true);

    setData('status','Ditolak');
    patch(route('data-request.update', props.dataRequest.id), {
      preserveScroll: true,
      onSuccess: () => setLoading(false),
    });
  }
  console.log(props);
  return (
    <AdminLayout>
      <Head title="Detail Data Request" />
      <h2 className="text-2xl font-bold">
        Detail Permintaan Data Tanaman
      </h2>
      <div className="flex flex-col w-full md:w-80">
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
                  {props.dataRequest.species.famili.genus} {props.dataRequest.species.name}
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
              Status :
            </label>
          </div>
          <div className="col-span-2">
            <label className="font-medium text-sm text-gray-700">
              {props.dataRequest.status}
            </label>
          </div>
        </div>
        
        
      </div>
      <div className="mt-6  grid justify-items-stretch">
        <label className="font-medium text-sm text-gray-700 justify-self-center">
          Note : Setelah divalidasi data akan langsung dikirimkan melalui email yang dicantumkan.
        </label>
      </div>
      <div className="grid grid-cols-2 gap-x-4 mt-10 justify-items-start">
        <div className="justify-self-center md:justify-self-end">
          <Button type="button" onClick={dataRequestValidate} label="Validasi" severity="success" />
        </div>
        <div className="justify-self-center md:justify-self-start">
          <Button type="button" onClick={dataRequestReject} outlined label="Tolak" severity="danger" />
        </div>
      </div>
    </AdminLayout>
  )
}
