import { GuestsLayout } from "@/Layouts/GuestsLayout";
import { Head } from "@inertiajs/react";
import TextInput from '@/Components/TextInput';
import { Dropdown } from 'primereact/dropdown';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { Image } from 'primereact/image';
import { useState, useMemo, useEffect } from "react";
import { Link } from '@inertiajs/react';

export default function Landing(props) {
  const [filterData, setFilterData] = useState();
  const [speciesList, setSpeciesList] = useState(props.species);

  useEffect(() => {
    setSpeciesList(() => {
      if (!filterData) {
        return props.species;
      }
      return props.species.filter((species) => {
        return species.famili.name.toLowerCase().includes(filterData.toLowerCase()) || species.name.toLowerCase().includes(filterData.toLowerCase()) || species.famili.genus.toLowerCase().includes(filterData.toLowerCase());
      });
    })
  }, [filterData]);

  return (
    <GuestsLayout>
      <Head title="Kebun Raya"/>
      <div className="text-center mt-2">
        <h2 className="text-2xl font-bold">
          KEBUN RAYA ITERA
        </h2>
      </div>
      <div className="grid grid-rows-3 gap-1 h-auto w-100 justify-items-center mt-4">
        <div className="w-72">
          <InputLabel htmlFor="Famili" value="Search" />
          <TextInput value={filterData} onChange={(e) => setFilterData(e.target.value)}
             className="w-full md:w-14rem" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 h-auto">
        {
          speciesList.map((species) => {
            return(
              <Link href={route('species.show', species.id)}>
                <div className="shadow-lg rounded-md m-8 flex flex-col gap-3 h-auto justify-center bg-white">
                  <div className="h-72 justify-self-center text-center object-contain">
                    <Image className="object-contain" src={species.image[0]} alt="Image" width="100%" />
                  </div>
                  <div className="h-auto justify-self-center text-center mb-4">
                    <h2 className="text-base font-semibold">
                      {species.famili.genus} {species.name}
                    </h2>
                    <h2 className="text-base">
                      {species.famili.name}
                    </h2>
                  </div>
                </div>
              </Link>
              
            )
          })
        }
      </div>
    </GuestsLayout>
    
  )
}
