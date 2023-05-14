import { Image } from 'primereact/image';
import InputLabel from '@/Components/InputLabel';
import { useState, useRef } from "react";
import { GuestsLayout } from "@/Layouts/GuestsLayout";
import { Head } from "@inertiajs/react";

export default function DetailSpeciesGuest(props) {
  console.log(props);

  const handleImageError = (event) => {
    event.target.src = '/no_image.jpg';
  };

  return (
    <GuestsLayout>
      <div className="grid grid-rows-auto justify-items-center gap-y-4">

        <div>
          <div className="shadow-lg md:w-64 rounded-md m-8 flex flex-col gap-3 h-auto justify-center bg-white">
            <div className="h-auto justify-self-center text-center">
              {/* <Image src={props.species.image[0]} onError={handleImageError} alt="Image" width="100%" preview /> */}
              <Image className="object-fill" src={props.species.image[0]} onError={handleImageError} alt="Image" width="100%" preview />
            </div>
            <div className="h-auto justify-self-center text-center mb-4">
              <h2 className="text-base font-semibold">
                {props.species.genus} {props.species.name}
              </h2>
              <h2 className="text-base">
                {props.species.famili.name}
              </h2>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-2 w-72">
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

        <div className="grid grid-cols-2 gap-x-2 w-72">
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

        <div className="grid grid-cols-2 gap-x-2 w-72">
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

        <div className="grid grid-cols-2 gap-x-2 w-72">
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

        <div className="grid grid-cols-2 gap-x-2 w-72">
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

        <div className="grid grid-cols-2 gap-x-2 w-72">
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

        <div className="grid grid-cols-2 gap-x-2 w-72">
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

        <div className="grid grid-cols-2 gap-x-2 w-72">
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

        <div className="grid grid-cols-2 gap-x-2 w-72">
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

        <div className="grid grid-cols-2 gap-x-2 w-72">
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


        
      </div>
    </GuestsLayout>
  )
}
