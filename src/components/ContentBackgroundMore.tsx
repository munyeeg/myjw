import Image from "next/image";

export default function ContentBackgroundMore() {
  return (
    <div className="absolute top-0 left-[-1vw] md:left-[-30px] z-[-1]">
      <Image
        src="/paper-center.png"
        alt="paper-center"
        width={800}
        height={800}
        className="min-w-[calc(110%)] md:min-w-[780px] rotate-180"
      />
      <Image
        src="/paper-center.png"
        alt="paper-center"
        width={800}
        height={800}
        className="min-w-[calc(110%)] md:min-w-[780px] rotate-180"
      />
    </div>
  );
}
