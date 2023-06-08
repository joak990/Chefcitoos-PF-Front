import { Card, Title, DonutChart } from "@tremor/react";
import React from 'react'



const Products = [
  {
    name: "Hamburguesas",
    sales: 28000,
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
      className="mt-6"
      data={Products}
      category="sales"
      index="name"
      valueFormatter={valueFormatter}
      colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
    />
  </Card>
);
export default Chardonut

