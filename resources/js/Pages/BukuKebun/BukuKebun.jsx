import { AdminLayout } from "@/Layouts/AdminLayout";
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import TemplateBukuKebun from '@/Components/TemplateBukuKebun';
import { Dropdown } from 'primereact/dropdown';
import React, { useState, useRef, useCallback } from "react";
import { useReactToPrint } from 'react-to-print';

export default function BukuKebun(props) {
  const [loading, setLoading] = useState(false);
  console.log(props.plots[0])
  const [selectedPlot, setSelectedPlot] = useState(props.plots[0])
  const componentRef = useRef(null);
  // console.log(selectedPlot);

  const handlePrint = useReactToPrint({
    removeAfterPrint: true,
    content: () => componentRef.current,
    documentTitle: "AwesomeFileName",
  });

  return (
    <AdminLayout>
      <Head title="Buku Kebun"/>
      <h2 className="text-2xl font-bold">
        Buku Kebun
      </h2>
      <div className="mt-2 mb-5">
        <div>
          <InputLabel htmlFor="name" value="Pilih Petak" />

          <Dropdown value={selectedPlot} onChange={(e) => setSelectedPlot(e.value)} options={props.plots} optionLabel="name"
            placeholder="Select a Petak" className="w-full md:w-14rem" />
        </div>
        <div>
          <PrimaryButton onClick={handlePrint}>
            Print
          </PrimaryButton>
          {/* <ReactToPrint
            trigger={() => {
              <PrimaryButton>
                Print
              </PrimaryButton>
            }}
            content={() => componentRef.current}
          /> */}
        </div>
        <div>
          <TemplateBukuKebun data={selectedPlot} ref={componentRef} />
        </div>
      </div>
    </AdminLayout>
  )
}
