/* eslint-disable */

"use client";

import { catchy, inkfree, name as NameFont } from "@/fonts";
import { cn } from "@/lib/utils";
import { IconCheck } from "@tabler/icons-react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { getCookie, setCookie } from "cookies-next";

export default function RSVP() {
  const rsvpId = getCookie("rsvpId");

  const [isAttending, setIsAttending] = useState<boolean | null>(null);
  const [isAttendingRom, setIsAttendingRom] = useState<boolean | null>(null);
  const [name, setName] = useState<string>("");
  const [numberOfGuests, setNumberOfGuests] = useState<number | null>(null);
  const [contactNumber, setContactNumber] = useState<number | null>(null);
  const [cookieId, setCookieId] = useState<string>("");
  const [existingRsvp, setExistingRsvp] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [isNameValid, setIsNameValid] = useState<boolean>(true);
  const [isAttendingRomValid, setIsAttendingRomValid] = useState<boolean>(true);
  const [isNumberOfGuestsValid, setIsNumberOfGuestsValid] =
    useState<boolean>(true);
  const [isContactNumberValid, setIsContactNumberValid] =
    useState<boolean>(true);

  const checkExisting = async () => {
    setIsLoadingData(true);
    const formData = new FormData();
    formData.append("CookieId", rsvpId as string);
    const response = await fetch("/api/check-existing", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.status === 200) {
      setExistingRsvp(result.data);
    }

    setIsLoadingData(false);
  };

  const showConfetti = () => {
    const end = Date.now() + 1 * 1000; // 3 seconds
    const colors = ["#F55583", "#00DEFF", "#00B580", "#FFD13B"];
    const shape = confetti.shapeFromPath({
      path: "M3.71431076,0 L16.5143108,0 C16.5143108,0 12.3968413,10.5894765 12.3968413,16 C12.3968413,21.4105235 16.5143108,32 16.5143108,32 L3.71431076,32 C3.71431076,32 0.448890145,21.3975151 0.448890145,16 C0.448890145,10.6024849 3.71431076,0 3.71431076,0 Z",
    });

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 4,
        angle: 60,
        spread: 45,
        startVelocity: 60,
        origin: { x: 0, y: 0.7 },
        colors: colors,
        shapes: [shape],
        scalar: 1.5,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 45,
        startVelocity: 60,
        origin: { x: 1, y: 0.7 },
        colors: colors,
        shapes: [shape],
        scalar: 1.5,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  useEffect(() => {
    if (!rsvpId) {
      const newRsvpId = uuidv4();
      setCookie("rsvpId", newRsvpId);
      setCookieId(newRsvpId);
    }
  }, []);

  useEffect(() => {
    if (!_.isEmpty(rsvpId)) {
      setCookieId(rsvpId as string);
      checkExisting();
    }
  }, [rsvpId]);

  useEffect(() => {
    if (existingRsvp) {
      setName(existingRsvp.name);
      setIsAttending(existingRsvp.attending === "TRUE");
      setNumberOfGuests(existingRsvp.numberOfGuests);
      setContactNumber(existingRsvp.phone);
      setIsAttendingRom(existingRsvp.rom === "TRUE");
    }
  }, [existingRsvp]);

  const OnFormSubmit = async () => {
    if (isSubmitting) return;

    const formData = new FormData();

    setIsNameValid(true);
    setIsNumberOfGuestsValid(true);
    setIsContactNumberValid(true);
    setIsAttendingRomValid(true);

    if (name.length === 0) {
      setIsNameValid(false);
      return;
    }

    if (isAttending !== null && isAttending) {
      if (numberOfGuests === null || numberOfGuests?.toString().length === 0) {
        setIsNumberOfGuestsValid(false);
        return;
      }

      if (contactNumber === null || contactNumber?.toString().length === 0) {
        setIsContactNumberValid(false);
        return;
      }

      if (isAttendingRom === null) {
        setIsAttendingRomValid(false);
        return;
      }
    }

    formData.append("CookieId", cookieId);
    formData.append("name", name);
    formData.append("attending", isAttending ? "TRUE" : "FALSE");
    formData.append("phone", contactNumber?.toString() ?? "");
    formData.append("numberOfGuests", numberOfGuests?.toString() ?? "");
    formData.append("animated", isAttending ? "TRUE" : "FALSE");
    formData.append(
      "rom",
      !_.isNull(isAttendingRom) ? (isAttendingRom ? "TRUE" : "FALSE") : "MAYBE"
    );

    if (!_.isUndefined(existingRsvp?.row)) {
      formData.append("row", existingRsvp.row);
    }

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/rsvp", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setIsEditing(false);

      console.log(existingRsvp);
      console.log(isAttending);
      console.log(existingRsvp?.animated);
      if (
        isAttending &&
        (existingRsvp?.animated === "FALSE" || !existingRsvp?.animated)
      ) {
        showConfetti();
      }
      checkExisting();
    } catch (error) {
      console.error("Error submitting RSVP:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      <div className="relative px-[calc(5vw)] pt-[calc(1.5vw)] md:px-10 md:pt-3">
        <Image
          src="/flower-2.png"
          alt="flower"
          width={138}
          height={220}
          className="rotate-[-15deg] scale-x-[-1] absolute top-[calc(15vw)] right-[calc(-3.5vw)] w-[calc(18vw)] h-[calc(28.7vw)] md:top-[100px] md:right-[-25px] md:w-[138px] md:h-[220px] select-none"
        />
        <Image
          src="/flower-2.png"
          alt="flower"
          width={138}
          height={220}
          className="rotate-[-23deg] absolute top-[calc(-2vw)] right-[calc(10vw)] w-[calc(18vw)] h-[calc(28.7vw)] md:top-[-22px] md:right-[75px] md:w-[138px] md:h-[220px] select-none"
        />
        <motion.div
          animate={{
            height: "auto",
          }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-t-full"
        >
          <div className="relative left-0 w-full h-full flex flex-col items-center text-[#717171]">
            <div
              className={cn(
                "text-[calc(7vw)] md:text-[50px] text-center text-black tracking-[calc(1.5vw)] md:tracking-[7px] pb-[calc(10vw)] md:pb-[20px] pt-[calc(14vw)] md:pt-[90px]",
                NameFont.className
              )}
            >
              RSVP
              <div
                className={cn(
                  "text-[calc(2vw)]  pt-[calc(1.5vw)] tracking-[calc(1.5vw)] md:text-[14px] md:pt-[10px] md:tracking-[12px] pb-[calc(1vw)] md:pb-[45px]",
                  catchy.className
                )}
              >
                BY 31 AUGUST, 2025
              </div>
            </div>
            <>
              {existingRsvp && !isEditing && !isLoadingData ? (
                <div
                  className={cn(
                    "flex flex-col items-center justify-center h-full text-[calc(9vw)] md:text-[70px] mb-[calc(6vw)] md:mb-[50px] tracking-[calc(1.5vw)] md:tracking-[12px]"
                  )}
                >
                  <div
                    className={cn(
                      "text-[calc(4vw)] md:text-[20px] text-[#7B6853] flex flex-col items-center gap-2",
                      inkfree.className
                    )}
                  >
                    <div className="text-[#7B6853] uppercase font-bold">
                      {isAttending ? "See you there!" : "We'll miss you!"}
                    </div>
                    <div className="flex items-center gap-2 px-[calc(1vw)] md:px-[10px] w-fit">
                      <div
                        className={cn(
                          "text-[#7B6853] text-center pt-[calc(1vw)] md:pt-[10px] font-bold"
                        )}
                      >
                        {existingRsvp.name.toUpperCase()}
                      </div>
                      <Image
                        src="/love.png"
                        alt="love"
                        width={30}
                        height={30}
                        className="h-[calc(3vw)] w-[calc(3vw)] md:h-[22px] md:w-[22px]"
                      />
                    </div>
                  </div>
                  <div className={cn("flex justify-center")}>
                    <div
                      className={cn(
                        "text-[calc(1.8vw)] md:text-[13px] bg-[#7B6853] px-[calc(3vw)] md:px-4 py-[calc(1.5vw)] md:py-2 rounded-md text-white tracking-[calc(1vw)] md:tracking-[5px] cursor-pointer mt-[calc(6vw)] md:mt-[50px] z-30 w-fit flex justify-center"
                      )}
                      onClick={() => {
                        setIsEditing(true);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <div>EDIT</div>
                      </div>
                    </div>
                  </div>
                  {/* <div
                    className={cn(
                      "text-[calc(4vw)] md:text-[20px] text-[#5f5f5f] flex flex-col items-center gap-2 pt-[calc(7vw)] md:pt-[50px]",
                      inkfree.className
                    )}
                  >
                    <div className="pb-[calc(1.5vw)] md:pb-[10px]">
                      Contact us at
                    </div>
                    <div
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => {
                        window.open(
                          `https://api.whatsapp.com/send?phone=60165329486`,
                          "_blank"
                        );
                      }}
                    >
                      <Image
                        src="/whatsapp.png"
                        alt="whatsapp"
                        width={20}
                        height={20}
                        className="h-[calc(7vw)] w-[calc(7vw)] md:h-[40px] md:w-[40px]"
                      />
                      <div className="text-[calc(2.6vw)] md:text-[15px] leading-[16px]">
                        <div>Mun Yee</div>
                        <div>016-5329486</div>
                      </div>
                    </div>
                    <div
                      className="flex items-center gap-2 pt-[10px] cursor-pointer"
                      onClick={() => {
                        window.open(
                          `https://api.whatsapp.com/send?phone=60176603530}`,
                          "_blank"
                        );
                      }}
                    >
                      <Image
                        src="/whatsapp.png"
                        alt="whatsapp"
                        width={20}
                        height={20}
                        className="h-[calc(7vw)] w-[calc(7vw)] md:h-[40px] md:w-[40px]"
                      />
                      <div className="text-[calc(2.6vw)] md:text-[15px] leading-[16px]">
                        <div>Jia Wei</div>
                        <div>017-6603530</div>
                      </div>
                    </div>
                    <div className="pb-[calc(1.5vw)] md:pb-[10px] pt-[calc(6vw)] md:pt-[40px]">
                      How to get there?
                    </div>
                    <div className="flex items-center gap-10 pt-[calc(1.5vw)] md:pt-[10px] pb-[calc(1.5vw)] md:pb-[10px]">
                      <Image
                        src="/waze.png"
                        alt="waze"
                        width={100}
                        height={100}
                        className="h-[calc(7vw)] w-[calc(7vw)] md:h-[40px] md:w-[40px] rounded-md shadow-md cursor-pointer"
                        onClick={() => {
                          window.open(
                            `https://waze.com/ul/hw282rfmjq`,
                            "_blank"
                          );
                        }}
                      />
                      <Image
                        src="/google.png"
                        alt="google"
                        width={100}
                        height={100}
                        className="h-[calc(7vw)] w-[calc(7vw)] md:h-[40px] md:w-[40px] rounded-md shadow-md cursor-pointer"
                        onClick={() => {
                          window.open(
                            `https://maps.app.goo.gl/1cs5a84MTcT29L5o7`,
                            "_blank"
                          );
                        }}
                      />
                    </div>
                  </div> */}
                </div>
              ) : (
                <>
                  {(!isLoadingData || isEditing) && (
                    <div>
                      <input
                        className={cn(
                          "text-left text-[calc(3.5vw)] md:text-[30px] px-[calc(2vw)] md:px-4 mb-[calc(1.5vw)] md:mb-2 border-b border-[#c9c9c9] outline-none w-[calc(60vw)] md:w-[calc(430px)] uppercase tracking-[calc(1.2vw)] md:tracking-[5px] caret-[#7B6853]",
                          catchy.className
                        )}
                        value={name}
                        type="text"
                        placeholder=""
                        onChange={(e) => {
                          setName(e.currentTarget.value);
                        }}
                      />
                      <motion.div
                        className={cn(
                          "text-[calc(2vw)] md:text-[14px] text-left w-[calc(60vw)] md:w-[calc(430px)] tracking-[calc(1.2vw)] md:tracking-[5px]",
                          !isNameValid && "text-red-400"
                        )}
                      >
                        NAME
                      </motion.div>
                      <div className="flex gap-[calc(8vw)] md:gap-[80px] w-[calc(60vw)] md:w-[calc(430px)] pt-[calc(6vw)] md:pt-[35px] tracking-[calc(1.2vw)] md:tracking-[5px] text-[calc(2vw)] md:text-[14px]">
                        <div
                          className="flex items-center gap-[calc(1.5vw)] md:gap-3 cursor-pointer"
                          onClick={() => setIsAttending(true)}
                        >
                          <div
                            className={cn(
                              "relative h-[calc(3vw)] w-[calc(3vw)] md:h-[18px] md:w-[18px] rounded-full border border-[#717171]"
                            )}
                          >
                            {isAttending === true && (
                              <IconCheck
                                className="absolute top-[40%] left-[70%] -translate-x-1/2 -translate-y-1/2 size-[3.5vw] md:size-[22px]"
                                color="#7B6853"
                              />
                            )}
                          </div>
                          <div>ACCEPTS</div>
                        </div>
                        <div
                          className="flex items-center gap-[calc(1vw)] md:gap-2 cursor-pointer"
                          onClick={() => setIsAttending(false)}
                        >
                          <div
                            className={cn(
                              "relative h-[calc(3vw)] w-[calc(3vw)] md:h-[18px] md:w-[18px] rounded-full border border-[#717171]"
                            )}
                          >
                            {isAttending === false && (
                              <IconCheck
                                className="absolute top-[40%] left-[70%] -translate-x-1/2 -translate-y-1/2 size-[3.5vw] md:size-[22px]"
                                color="#7B6853"
                              />
                            )}
                          </div>
                          <div>REGRETS</div>
                        </div>
                      </div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: isAttending ? 1 : 0,
                          height: isAttending ? "auto" : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col overflow-hidden"
                      >
                        <input
                          className={cn(
                            "text-left text-[calc(3.5vw)] md:text-[30px] px-[calc(2vw)] md:px-4 mb-[calc(1.5vw)] md:mb-2 pt-[calc(6vw)] md:pt-[35px] border-b border-[#c9c9c9] outline-none w-[calc(60vw)] md:w-[calc(430px)] uppercase tracking-[calc(1.2vw)] md:tracking-[5px] caret-[#7B6853]",
                            catchy.className
                          )}
                          value={numberOfGuests ?? ""}
                          placeholder=""
                          onInput={(e) => {
                            e.currentTarget.value =
                              e.currentTarget.value.replace(/[^0-9]/g, "");
                          }}
                          onChange={(e: any) => {
                            setNumberOfGuests(e.currentTarget.value);
                          }}
                        />
                        <div
                          className={cn(
                            "text-[calc(2vw)] md:text-[14px] text-left w-[calc(60vw)] md:w-[calc(430px)] tracking-[calc(1.2vw)] md:tracking-[5px]",
                            !isNumberOfGuestsValid && "text-red-400"
                          )}
                        >
                          NUMBER OF GUESTS
                        </div>
                        <input
                          className={cn(
                            "text-left text-[calc(3.5vw)] md:text-[30px] px-[calc(2vw)] md:px-4 mb-[calc(1.5vw)] md:mb-2 pt-[calc(6vw)] md:pt-[35px] border-b border-[#c9c9c9] outline-none w-[calc(60vw)] md:w-[calc(430px)] uppercase tracking-[calc(1.2vw)] md:tracking-[5px] caret-[#7B6853]",
                            catchy.className
                          )}
                          value={contactNumber ?? ""}
                          type="tel"
                          placeholder=""
                          onInput={(e) => {
                            e.currentTarget.value =
                              e.currentTarget.value.replace(/[^0-9]/g, "");
                          }}
                          onChange={(e: any) => {
                            setContactNumber(e.currentTarget.value);
                          }}
                        />
                        <div
                          className={cn(
                            "text-[calc(2vw)] md:text-[14px] text-left w-[calc(60vw)] md:w-[calc(430px)] tracking-[calc(1.2vw)] md:tracking-[5px]",
                            !isContactNumberValid && "text-red-400"
                          )}
                        >
                          CONTACT NUMBER
                        </div>
                      </motion.div>
                      {isAttending && (
                        <>
                          <div
                            className={cn(
                              "pt-[calc(6vw)] md:pt-[35px] text-[calc(2vw)] md:text-[14px] text-left w-[calc(60vw)] md:w-[calc(430px)] tracking-[calc(1.2vw)] md:tracking-[5px]",
                              !isAttendingRomValid && "text-red-400"
                            )}
                          >
                            ATTENDING ROM?
                          </div>
                          <div className="flex gap-[calc(8vw)] md:gap-[80px] w-[calc(60vw)] md:w-[calc(430px)] pt-[calc(3vw)] md:pt-[17px] tracking-[calc(1.2vw)] md:tracking-[5px] text-[calc(2vw)] md:text-[14px]">
                            <div
                              className="flex items-center gap-[calc(1.5vw)] md:gap-3 cursor-pointer"
                              onClick={() => setIsAttendingRom(true)}
                            >
                              <div
                                className={cn(
                                  "relative h-[calc(3vw)] w-[calc(3vw)] md:h-[18px] md:w-[18px] rounded-full border border-[#717171]"
                                )}
                              >
                                {isAttendingRom === true && (
                                  <IconCheck
                                    className="absolute top-[40%] left-[70%] -translate-x-1/2 -translate-y-1/2 size-[3.5vw] md:size-[22px]"
                                    color="#7B6853"
                                  />
                                )}
                              </div>
                              <div>YES</div>
                            </div>
                            <div
                              className="flex items-center gap-[calc(1vw)] md:gap-2 cursor-pointer"
                              onClick={() => setIsAttendingRom(false)}
                            >
                              <div
                                className={cn(
                                  "relative h-[calc(3vw)] w-[calc(3vw)] md:h-[18px] md:w-[18px] rounded-full border border-[#717171]"
                                )}
                              >
                                {isAttendingRom === false && (
                                  <IconCheck
                                    className="absolute top-[40%] left-[70%] -translate-x-1/2 -translate-y-1/2 size-[3.5vw] md:size-[22px]"
                                    color="#7B6853"
                                  />
                                )}
                              </div>
                              <div>NO</div>
                            </div>
                          </div>
                        </>
                      )}
                      <div className="flex justify-center">
                        <div
                          className={cn(
                            "text-[calc(1.8vw)] md:text-[13px] bg-[#7B6853] px-[calc(3vw)] md:px-4 py-[calc(1.5vw)] md:py-2 rounded-md text-white tracking-[calc(1vw)] md:tracking-[5px] cursor-pointer mt-[calc(6vw)] md:mt-[50px] mb-[calc(7vw)] md:mb-[60px] z-30 w-fit flex justify-center"
                          )}
                          onClick={OnFormSubmit}
                        >
                          <div className="flex items-center gap-2">
                            <div>SUBMIT</div>
                            {isSubmitting && (
                              <div className="w-4 h-4 border-t-transparent border-b-transparent border-r-transparent border-l-white rounded-full border-2 animate-spin" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {isLoadingData && (
                    <div className="flex flex-col items-center justify-center h-full mb-[calc(5vw)] md:mb-[50px] min-h-[calc(250px)] md:min-h-[350px]">
                      <div className="w-[calc(4vw)] h-[calc(4vw)] md:w-8 md:h-8 border-t-transparent border-b-transparent border-r-transparent border-l-[#585858] rounded-full border-2 animate-spin" />
                    </div>
                  )}
                </>
              )}
            </>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
