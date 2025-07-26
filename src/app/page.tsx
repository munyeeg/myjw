"use client";

import Agenda from "@/components/Agenda";
import ContentBackground from "@/components/ContentBackground";
import ContentBackgroundMore from "@/components/ContentBackgroundMore";
import DateAndVenue from "@/components/DateAndVenue";
import Flower from "@/components/Flower";
import Header from "@/components/Header";
import Name from "@/components/Name";
import RSVP from "@/components/RSVP";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center p-3">
        <div className="md:max-w-[700px] overflow-hidden rounded-lg shadow-md relative font-poppins font-light">
          <ContentBackground />
          <Header />
          <Name />
          <Flower />
          <div className="flex flex-col gap-4 relative z-12 pb-10">
            <DateAndVenue />
          </div>
        </div>

        <div className="md:max-w-[700px] overflow-hidden rounded-lg shadow-md relative font-poppins font-light mt-3 w-full">
          <ContentBackgroundMore />
          <Agenda />
          <RSVP />
        </div>
      </div>
    </div>
  );
}
