import  { ReactNode } from "react";
import Divider from "@/components/Divider/Divider";
import Button from "@/components/Button/Button";

const CardWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col gap-2 p-3 bg-white border border-gray-200 rounded-md ">
        <h2 className="text-sm font-semibold font-body">Agregar Partido</h2>
        <Divider/>
        <Button>hola</Button>
        <Button variant='secondary' onClick={()=>console.log('hey')}>hola</Button>

      {children}
    </div>
  );
};

export default CardWrapper;
