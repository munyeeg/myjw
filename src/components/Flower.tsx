import Image from "next/image";

export default function Flower() {
  return (
    <div className="absolute mt-[calc(-19vw)] md:mt-[-150px] ml-[calc(-30vw)] md:ml-[-200px] w-full h-full z-10 select-none">
      <Image
        className="w-[calc(73vw)] h-[calc(73vw)] md:w-[550px] md:h-[550px]"
        src="/flower.png"
        alt="Flower"
        width={480}
        height={500}
      />
    </div>
  );
}
