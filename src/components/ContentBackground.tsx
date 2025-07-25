import Image from "next/image";

export default function ContentBackground() {
  return (
    <div className="absolute top-[calc(57vw)] md:top-[405px] left-[-1vw] md:left-[-30px] z-5">
      <Image
        src="/paper-top.png"
        alt="paper-top"
        width={800}
        height={800}
        className="min-w-[calc(110%)] md:min-w-[780px]"
      />
      <Image
        src="/paper-center.png"
        alt="paper-center"
        width={800}
        height={800}
        className="min-w-[calc(110%)] md:min-w-[780px] rotate-180"
      />
      <Image
        src="/paper-top.png"
        alt="paper-bottom"
        width={800}
        height={800}
        className="min-w-[calc(110%)] md:min-w-[780px] rotate-180"
      />
    </div>
  );
}
