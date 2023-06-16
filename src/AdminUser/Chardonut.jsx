import { Card, Title, DonutChart } from "@tremor/react";
import React from 'react'



const Products = [
  {
    name: "Hamburguesas",
    sales: 3000,
  },
  {
    name: "Perritos",
    sales: 4567,
  },
  {
    name: "Burritos",
    sales: 3908,
  },
  {
    name: "Sandwitches",
    sales: 3908,
  },
  {
    name: "Otros Platos",
    sales: 3908,
  },
 
];

const valueFormatter = (number) =>
  `$ ${Intl.NumberFormat("us").format(number).toString()}`;

const Chardonut = () => (
  <Card className="max-w-lg">
    <Title>Ventas</Title>
    <DonutChart
      className=""
      data={Products}
      category="sales"
      index="name"
      valueFormatter={valueFormatter}
      colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
    />
    <div className="gap-2 flex mt-4 ">
    <h1 className="bg-slate-400 text-center w-32 font-semibold">hambuguesas</h1>
    <h1 className="bg-cyan-400 text-center w-32 font-semibold">Otros Platos</h1>
    <h1 className="bg-rose-400 text-center w-32 font-semibold">Sandwitches</h1>
    <h1 className="bg-indigo-400 text-center w-32 font-semibold">Burritos</h1>
    <h1 className="bg-violet-400 text-center  w-32 font-semibold">Perritos</h1>
    </div>
    
  </Card>
);
export default Chardonut

