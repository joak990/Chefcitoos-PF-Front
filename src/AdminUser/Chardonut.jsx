import { Card, Title, DonutChart } from "@tremor/react";
import React from 'react'


const valueFormatter = (number) =>
  `$ ${Intl.NumberFormat("us").format(number).toString()}`;
  

const Chardonut = ({ donutProductos }) => {
  return (
    <Card className="max-w-sm lg:max-w-lg">
      <Title>Ventas</Title>
      <DonutChart
        className=""
        data={donutProductos}
        category="sales"
        index="name"
        valueFormatter={valueFormatter}
        colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
      />
      <div className="gap-2 flex flex-wrap justify-center items-center mt-4 ">
        <h1 className="bg-slate-400 text-center w-32 font-semibold px-2 rounded-md">Hambuguesas</h1>
        <h1 className="bg-cyan-400 text-center w-32 font-semibold rounded-md">Otros Platos</h1>
        <h1 className="bg-rose-400 text-center w-32 font-semibold rounded-md">Sandwitches</h1>
        <h1 className="bg-indigo-400 text-center w-32 font-semibold rounded-md">Burritos</h1>
        <h1 className="bg-violet-400 text-center  w-32 font-semibold rounded-md">Perritos</h1>
        <h1 className="bg-amber-400 text-center  w-32 font-semibold rounded-md">Bebidas</h1>
      </div>

    </Card>
  );
}
export default Chardonut

