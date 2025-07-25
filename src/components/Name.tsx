import { cn } from "@/lib/utils";
import { name } from "@/fonts";

export default function Name() {
  return (
    <div
      className={cn(
        "absolute right-[calc(8.5vw)] md:right-14 mt-[calc(-7vw)] md:mt-[-55px] text-right z-11 select-none",
        name.className
      )}
    >
      <div className="relative text-[calc(11vw)] md:text-[80px]">
        <div className="rotate-[-7deg] pr-[calc(5vw)] md:pr-[40px]">
          Mun Yee &
        </div>
        <div className="absolute right-0 mt-[calc(-4vw)] md:mt-[-35px] rotate-[-3deg]">
          Jia Wei
        </div>
      </div>
    </div>
  );
}
