"use client";

// React Imports
import React, { useState, useEffect } from "react";

// Next Imports
import Image from "next/image";

// Redux Imports
import { useAppSelector, useAppDispatch } from "@/store/store";
import { deleteBet } from "@/store/thunk/betThunk";
import { BetList } from "@/store/slices/betSlice";

// Custom assets
import MedalImage from "@/assets/Images/medal.png";
import PowerUpImage from "@/assets/Images/powerup.png";
import TrashIcon from "@/assets/Images/trash.svg";
import BetslipIcon from "@/assets/Images/betSlipIcon.svg";
import CloseIcon from "@/assets/Images/close.svg";

const HeaderComponent = () => {
  const betData = useAppSelector((state: any) => state.betSlice);
  const dispatch = useAppDispatch();

  // All the states defiens here
  const [isOpen, setIsOpen] = useState(false);
  const [totalBetPrice, setTotalBetPrice] = useState(0);

  useEffect(() => {
    let betPrice = 0;
    betData.myBetList.map((val: BetList, index: number) => {
      betPrice+= val.teams[0].price;
    })
    setTotalBetPrice(betPrice);
    
  }, [betData.myBetList]);

  // Called when close modal click
  const toggleBetListDrawer = () => {
    setIsOpen(!isOpen);
  };

  // Called when close modal click
  const closeButtonClick = () => {
    setIsOpen(false);
  };

  // Called when delete bet button clicks
  const removeMyBet = (val: BetList) => {
    let request = betData.myBetList.filter((row: BetList) => val.id !== row.id);
    dispatch(deleteBet(request));
  };

  return (
    <>
      <div className="fixed w-full left-0 top-0">
        <header className="bg-[#0f1a32] md:px-0 px-5 py-5 container mx-auto my-0">
          <div className="inner-header">
            {/* Navbar component */}
            <nav className="border-gray-200 dark:bgTransparent">
              <div className="md:flex block flex-wrap justify-between items-center">
                {/* Logo and search bar */}
                <div className="justify-between flex items-center md:order-1 order-2 md:w-auto w-full  mt-0 md:mt-0 mb-3 md:mb-0">
                  <div className="md:pr-[61px] pr-0">
                    <span className="self-center text-sm md:text-2xl font-extrabold tracking-wider whitespace-nowrap text-white">
                      MYBET
                    </span>
                  </div>
                  <div className="relative flex items-center rounded-md duration-300 cursor-pointer text-white">
                    <input
                      type="text"
                      placeholder="Team, League, Event..."
                      className="text-[15px] px-3 focus:outline-none bg-[#1A2844] md:h-12 h-10  w-[100%] lg:w-[417px] rounded-[24.65px]text-white"
                    />
                  </div>
                </div>

                {/* Powerup and medal section */}
                <div className="flex md:order-2 order-1 md:w-auto w-full">
                  <div
                    className="order-2 flex md:justify-end justify-center items-center w-full lg:w-auto lg:order-1"
                    id="mobile-menu-2"
                  >
                    <div className="flex flex-row lg:space-x-4 lg:mt-0 items-center">
                      <div className="flex items-center justify-center w-[49px] h-[49px] border rounded-[50%] border-solid border-[#293650] bg-[#1A2844] ml-[5px] ">
                        <Image
                          src={MedalImage}
                          alt="Vercel Logo"
                          width={25}
                          height={25}
                          priority
                        />
                      </div>
                      <div className="flex items-center justify-center w-[49px] h-[49px] border rounded-[50%] border-solid border-[#293650] bg-[#1A2844] ml-[5px] ">
                        <Image
                          src={PowerUpImage}
                          alt="Vercel Logo"
                          width={25}
                          height={25}
                          priority
                        />
                      </div>
                      <div className="flex items-center justify-center w-[120px] h-9">
                        <button
                          onClick={toggleBetListDrawer}
                          className="h-[35px] w-full flex items-center justify-center rounded-[20px] bg-[linear-gradient(137.02deg, #00FFF0 0%, #211EC1 103.79%)] custom-gradient "
                        >
                          <Image
                            src={BetslipIcon}
                            alt="Vercel Logo"
                            width={20}
                            height={20}
                            priority
                            className="mr-[10px]"
                          />
                          Bets: 0
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="md:hidden mt-4 ml-2">
                    <i className="fas fa-bars dark:text-white text-black"></i>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </header>
      </div>

      {/* Drawer to see all the list of selected bets  */}
      {isOpen && (
        <div
          className="relative z-10"
          aria-labelledby="slide-over-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 w-[400px]">
                <div className="pointer-events-auto relative w-screen max-w-md">
                  <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                    <button
                      type="button"
                      onClick={closeButtonClick}
                      className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      <Image
                        src={CloseIcon}
                        alt="CloseIcon"
                        width={25}
                        height={25}
                        priority
                      />
                    </button>
                  </div>
                  <div className="h-full bg-[#101a30] shadow-xl">
                    <div className="p-6 border-b-[#2e4062] border-b border-solid gradiant-sidebar-header">
                      <h2
                        className="text-base font-semibold leading-6 text-white"
                        id="slide-over-title"
                      >
                        BETSLIP
                      </h2>
                    </div>
                    {/* List of selected bets */}
                    <div className="relative pt-6 flex-1 px-4  overflow-auto md:h-[77vh] h-[70px]">
                      <ul>
                        {betData.myBetList.map(
                          (val: BetList, index: number) => (
                            <li
                              key={"betList_" + index}
                              className="rounded-[10px] p-[10px] mb-[20px] bg-[#17243e]  shadow-[4px_4px_4px_0px_rgba(31,46,77,0.62)_inset]"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <Image
                                    src={PowerUpImage}
                                    alt="PowerUpImage"
                                    className="w-[25px] h-[25px] cursor-pointer"
                                  />
                                </div>
                                <div className="w-[70%] text-[13px]">
                                  {val.teams[0].name} VS {val.teams[1].name}
                                </div>
                                <Image
                                  src={TrashIcon}
                                  alt="TrashIcon"
                                  onClick={() => removeMyBet(val)}
                                  className="cursor-pointer"
                                />
                              </div>
                              <div className="flex  justify-between">
                                <div>
                                  <p>Bet Price:</p>
                                </div>
                                <div>${val.teams[0].price}</div>
                              </div>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>

                  {/* Total wager section */}
                  <div className="absolute w-full bottom-0 flex justify-between items-center p-2.5 border-t border-solid bg-[#18243c]">
                    <div>
                      <p>TOTAL WAGER</p>
                      <p>$ {totalBetPrice}</p>
                    </div>
                    <button className="h-[35px] w-[100px] flex items-center justify-center rounded-[20px] bg-[linear-gradient(137.02deg, #00FFF0 0%, #211EC1 103.79%)] custom-gradient ">
                      Login
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default HeaderComponent;
