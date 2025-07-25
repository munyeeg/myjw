import { cn } from "@/lib/utils";
import { catchy, alex } from "@/fonts";
export default function DateAndVenue() {
  return (
    <div className="flex justify-end">
      <div
        className={cn(
          "flex flex-col gap-2 mt-[calc(24vw)] md:mt-[160px] mr-[calc(3vw)] md:mr-[45px] text-[calc(2vw)] md:text-[15px] text-center tracking-[calc(0.9vw)] md:tracking-[5px]",
          catchy.className
        )}
      >
        <div>NOVEMBER</div>
        <div className="flex gap-6 items-center">
          <div>SATURDAY</div>
          <div
            className={cn("text-[calc(5vw)] md:text-[40px]", alex.className)}
          >
            15
          </div>
          <div className="flex gap-2">
            <div>AT </div>
            <div>5</div>
            <div>PM</div>
          </div>
        </div>
        <div className="text-[calc(2.5vw)] md:text-[20px]">2025</div>
        <div>
          <div>{"THE OCHRE"}</div>
          <div className="mt-0 md:mt-[-5px]">{"LENGGENG, NEGERI SEMBILAN"}</div>
        </div>
      </div>
    </div>
  );
}
