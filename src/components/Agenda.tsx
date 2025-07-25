import { catchy, playlist } from "@/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Agenda() {
  return (
    <div className="p-8 py-[calc(10vw)] md:p-10 md:py-[80px] !pb-[calc(6vw)] md:!pb-[50px]">
      <div
        className={cn(
          "text-[calc(4vw)] md:text-[35px] text-center text-[#585858] tracking-[calc(2.4vw)] md:tracking-[15px] pb-[calc(3vw)] md:pb-[20px]",
          playlist.className
        )}
      >
        TIMELINE
      </div>
      <div className="pt-[calc(8vw)] md:pt-[50px]">
        <div
          className={cn(
            "relative tracking-[calc(0.9vw)] md:tracking-[4px]",
            catchy.className
          )}
        >
          {/* items */}
          <div className="grid grid-cols-3 mt-[-4.5vw] md:mt-[-30px] justify-items-center">
            <div className="flex flex-col gap-5 w-fit items-center">
              <div className="text-[calc(2.3vw)] md:text-[16px]">5:00 PM</div>
              <Image
                src="/ring.png"
                alt="rom"
                width={50}
                height={50}
                className="h-[calc(8vw)] md:h-[50px] object-fit w-fit"
              />
              <div className="text-[calc(2.8vw)] md:text-[22px]">ROM**</div>
            </div>
            <div className="flex flex-col gap-5 w-fit items-center">
              <div className="text-[calc(2.3vw)] md:text-[16px]">6:00 PM</div>
              <Image
                src="/wine.png"
                alt="rom"
                width={50}
                height={50}
                className="h-[calc(8vw)] md:h-[50px] object-fit w-fit"
              />
              <div className="text-[calc(2.8vw)] md:text-[22px]">COCKTAIL</div>
            </div>
            <div className="flex flex-col gap-5 w-fit items-center">
              <div className="text-[calc(2.3vw)] md:text-[16px]">7:00 PM</div>
              <Image
                src="/dinner.png"
                alt="rom"
                width={50}
                height={50}
                className="h-[calc(8vw)] md:h-[50px] object-fit w-fit"
              />
              <div className="text-[calc(2.8vw)] md:text-[22px]">DINNER</div>
            </div>
          </div>
          <div className="text-[calc(2.1vw)] md:text-[15px] text-center tracking-[5px] pt-[calc(2vw)] md:pt-[20px] text-[#5b5b5b]">
            **Limited Seat. First Come First Serve.
          </div>
        </div>
      </div>
    </div>
  );
}
