import React from "react";
import hamburguesa from "../img/hamburguesa.jpg";
import perritocaliente from "../img/perritocaliente.jpg";
import CardMenu from "../components/CardMenu";

function Menu() {
  return (
    <div className="flex flex-col p-2 gap-3">
      <div>
      <h1 className="text-start font-bold ">Hamburguesas</h1>
      <div className="flex flex-row flex-wrap justify-center pb-6 gap-14" >
        
        <CardMenu />
        <CardMenu />
        <CardMenu />
        <CardMenu />
      </div>
      </div>
      <div className="">
      <h1 className="text-start font-bold ">Perritos Calientes</h1>
      <div className="flex flex-row flex-wrap justify-center  gap-14  pb-6">
        
        <CardMenu />
        <CardMenu />
        <CardMenu />
        <CardMenu />
      </div>
      </div>
      <div>
      <h1 className="text-start font-bold ">Sandwitches</h1>
      <div className="flex flex-row flex-wrap justify-center gap-14  pb-6">
        
        <CardMenu />
        <CardMenu />
        <CardMenu />
        <CardMenu />
      </div>
      </div>
      <div>
      <h1 className="text-start font-bold ">Burritos</h1>
      <div className="flex flex-row flex-wrap justify-center gap-14  pb-6">
        
        <CardMenu />
        <CardMenu />
        <CardMenu />
        <CardMenu />
      </div>
      </div>
      
     
    </div>
  );
}

export default Menu;
