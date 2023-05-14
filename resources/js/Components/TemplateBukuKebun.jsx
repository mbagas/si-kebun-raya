import { data } from "autoprefixer";
import React, { useState, useRef, useEffect } from "react";



const TemplateBukuKebun = React.forwardRef((props, ref) => {
  const [totalHidup, setTotalHidup] = useState(0);
  const [totalMati, setTotalMati] = useState(0);
  const [totalSakit, setTotalSakit] = useState(0);
  console.log(props)
  useEffect(() => {
    let hidup = 0
    props.data.species.map((item) => {
      hidup += item.plant.reduce((acc, obj) => {
        return obj.status == 'hidup' ? acc + 1 : acc + 0;
      }, 0)
    })
    setTotalHidup(hidup)

    let mati = 0
    props.data.species.map((item) => {
      mati += item.plant.reduce((acc, obj) => {
        return obj.status == 'mati' ? acc + 1 : acc + 0;
      }, 0)
    })
    setTotalMati(mati)

    let sakit = 0
    props.data.species.map((item) => {
      sakit += item.plant.reduce((acc, obj) => {
        return obj.status == 'sakit' ? acc + 1 : acc + 0;
      }, 0)
    })
    setTotalSakit(sakit)

  },[props])

  return (
    <div ref={ref}>
      <style type="text/css" media="print">
        {" \@page {\ size: landscape;\ }\ "}
      </style>

      <div className="flex flex-col gap-3 md:gap-1">
        <div className="grid grid-rows-2 gap-1 h-auto">
          <div className="flex justify-center">
            <h4 className="text-2xl font-bold justify-self-center">BUKU KEBUN</h4>   
          </div>
          <div className="flex justify-center">
            <h4 className="text-2xl font-bold justify-self-center">KEBUN RAYA ITERA</h4>
          </div>

        </div>

        <div className="">
          <h4 className="text-l font-bold">VAK : {props.data.name}</h4>
          <h4 className="text-l font-bold">PETAK/ ANAK PETAK : {props.data.name} {props.data.child_name} "{props.data.latitude} {props.data.longitude}"</h4>
        </div>

        <div>
          <table className="border-collapse border border-black w-full">
            <thead>
              <tr>
                <th className="border border-black">No. URUT</th>
                <th className="border border-black">No. KOLEKSI</th>
                <th className="border border-black">No. KOLEKTOR</th>
                <th className="border border-black">No. AKSES</th>
                <th className="border border-black">DEKSRIPSI KOLEKSI</th>
                <th className="border border-black">KETERANGAN LAIN</th>
              </tr>
            </thead>
            <tbody>
              {
                props.data.species.map((species, index) => {
                  return (
                    <>
                    <tr>
                      <td rowSpan={species.plant.length + 1} className="border border-black p-1"> {index} </td>
                        <td rowSpan={species.plant.length + 1} className="border border-black p-1"> {species.collection_number}{
                          species.plant.length > 0 ? '-' + species.plant.map((item) => ' ' + species.collection_number + item.access_number) : ''
                        }  </td>
                      <td className="border border-black p-1"> {species.collector_number} </td>
                      <td className="border border-black p-1"> {species.access_number} </td>
                      <td className="border border-black p-1">{species.genus} {species.name}; {species.famili.name}; didapatkan dari {species.way_to_collect}; 
                      ditanam oleh {new Set(species.plant.map((plant, index) => ' '+plant.planter+','))} pada {species.planting_date}.</td>
                      <td className="border border-black p-1">-</td>
                    </tr>
                    {species.plant.map((plant, index) => {
                      return (
                        <>
                          {index == 0 ? (
                          <>
                              <tr>
                                <td rowSpan={species.plant.length} className="border border-black p-1">Titik tanam dan kondisi tanaman</td>
                                <td className="border border-black p-1"> {species.collection_number}{plant.access_number} </td>
                                <td className="border border-black p-1"> {plant.coordinate} </td>
                                <td className="border border-black p-1"> {plant.status} </td>
                              </tr>
                          </>
                          ) : (
                          <>
                                <tr>
                                  <td className="border border-black p-1"> {species.collection_number}{plant.access_number} </td>
                                  <td className="border border-black p-1"> {plant.coordinate} </td>
                                  <td className="border border-black p-1"> {plant.status} </td>
                                </tr>
                          </>
                          )}
                        
                        </>
                      )
                    })}
                    </>
                  )
                })
              }
            </tbody>
          </table>
        </div>

        <div className="flex flex-col mt-2">
          <div>
            Jumlah Spesimen tanaman hidup : {totalHidup}
          </div>
          <div>
            Jumlah Spesimen tanaman mati : {totalMati}
          </div>
          <div>
            Jumlah Spesimen tanaman sakit : {totalSakit}
          </div>
          <div>
            <b>Jumlah total spesimen tertanam : {totalHidup+totalMati+totalSakit} </b>
          </div>
          <div>
            Indeterminate : 0
          </div>
          <div>
            Gendub : 0
          </div>
          <div>
            Genus : {new Set(props.data.species.map((item) => item.genus)).size} ( {new Set(props.data.species.map((item) => item.genus+', '))} )
          </div>
          <div>
            Spesies : {props.data.species.length}
          </div>
          <div>
            Masih sp. : 0
          </div>
          
        </div>

      </div>

    </div>
  );
});

export default TemplateBukuKebun;
