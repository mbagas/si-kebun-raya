import React, { useState, useRef } from "react";



const TemplateBukuKebun = React.forwardRef((props, ref) => {
  console.log(props)
  return (
    <div ref={ref}>
      <style type="text/css" media="print">
        {" \@page {\ size: landscape;\ }\ "}
      </style>

      <div className="flex flex-col gap-3 md:gap-1">
        <div className="grid grid-rows-3 gap-1 h-auto">
          <div className="flex justify-center">
            <h4 className="text-2xl font-bold justify-self-center">BUKU KEBUN</h4>   
          </div>
          <div className="flex justify-center">
            <h4 className="text-2xl font-bold justify-self-center">KEBUN RAYA ITERA</h4>
          </div>

        </div>

        <div className="">
          <h4 className="text-l font-bold">VAK : V</h4>
          <h4 className="text-l font-bold">PETAK/ ANAK PETAK : V A "12512512515"</h4>
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
                <th className="border border-black">PERUBAHAN NAMA & KETERANGAN LAIN</th>
              </tr>
            </thead>
            <tbody>
              {
                props.data.species.map((species, index) => {
                  return (
                    <>
                    <tr>
                      <td rowSpan={species.plant.length + 1} className="border border-black p-1"> {index} </td>
                      <td rowSpan={species.plant.length + 1} className="border border-black p-1"> {species.collection_number} </td>
                      <td className="border border-black p-1"> {species.collector_number} </td>
                      <td className="border border-black p-1"> {species.collection_number} </td>
                      <td className="border border-black p-1">fabaecae margarin; myraetace; hibah dari eksplorasi dari bogor;</td>
                      <td className="border border-black p-1">-</td>
                    </tr>
                    {species.plant.map((plant, index) => {
                      return (
                        <>
                          {index == 0 ? (
                          <>
                              <tr>
                                <td rowSpan={species.plant.length} className="border border-black p-1">Titik tanam dan kondisi tanaman</td>
                                <td className="border border-black p-1"> {plant.access_number} </td>
                                <td className="border border-black p-1"> {plant.coordinate} </td>
                                <td className="border border-black p-1"> {plant.status} </td>
                              </tr>
                          </>
                          ) : (
                          <>
                                <tr>
                                  <td className="border border-black p-1"> {plant.access_number} </td>
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

              {/* <tr>
                <td rowSpan='4' className="border border-black p-1">1</td>
                <td rowSpan='4' className="border border-black p-1">1</td>
                <td className="border border-black p-1">-</td>
                <td className="border border-black p-1">IT12451</td>
                <td className="border border-black p-1">fabaecae margarin; myraetace; hibah dari eksplorasi dari bogor;</td>
                <td className="border border-black p-1">-</td>
              </tr> */}

              {/* <tr>
                <td rowSpan='3' className="border border-black p-1">Titik tanam dan kondisi tanaman</td>
                <td className="border border-black p-1">1a</td>
                <td className="border border-black p-1">Koordinat -12525125</td>
                <td className="border border-black p-1">Hidup</td>
              </tr>
              <tr>
                <td className="border border-black p-1">1b</td>
                <td className="border border-black p-1">Koordinat -12525125</td>
                <td className="border border-black p-1">Hidup</td>
              </tr>
              <tr>
                <td className="border border-black p-1">1c</td>
                <td className="border border-black p-1">Koordinat -12525125</td>
                <td className="border border-black p-1">Hidup</td>
              </tr> */}

            </tbody>
          </table>
        </div>

        <div className="flex flex-col">
          <div>
            Jumlah Spesimen tanaman hidup : 0
          </div>
          <div>
            Jumlah Spesimen tanaman mati : 0
          </div>
          <div>
            <b>Jumlah total spesimen tertanam : 0 </b>
          </div>
          <div>
            Indeterminate : 0
          </div>
          <div>
            Gendub : 0
          </div>
          <div>
            Genus : 1
          </div>
          <div>
            Spesies : 1
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
