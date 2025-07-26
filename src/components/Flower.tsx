import Image from "next/image";

export default function Flower() {
  return (
    <div className="absolute mt-[calc(-20vw)] md:mt-[-150px] ml-[calc(-34vw)] md:ml-[-200px] w-full h-full z-10 select-none">
      <Image
        className="w-[calc(80vw)] h-[calc(80vw)] md:w-[550px] md:h-[550px]"
        src="/flower.png"
        alt="Flower"
        width={480}
        height={500}
      />
    </div>
  );
}
