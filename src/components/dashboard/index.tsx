"use client";

// Custom Components
import CardComponent from "@/components/card";

// Redux Imports
import { useAppSelector } from "@/store/store";
import { BetList } from "@/store/slices/betSlice";

export default function Dashboard() {
  const betData = useAppSelector((state: any) => state.betSlice);

  return (
    <>
        {/* Live bets section */}
      <div>
        <div className="w-fit h-7 justify-center text-white font-bold text-base leading-5 shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex items-center uppercase mb-4 px-2.5 py-1 rounded-sm bg-[red]">
          live <p> ●</p>
        </div>
        <div className="block md:grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {betData.availableBet
            .filter((val: BetList) => val.isLive)
            .map((val: BetList, index: number) => (
              <div key={'betData_' + index}>
                <CardComponent betDetails={val} />
              </div>
            ))}
        </div>
      </div>

      {/* Today bets section */}
      <div className="mt-4">
        <div className="w-fit h-7 justify-center text-white font-bold text-base leading-5 shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex items-center uppercase mb-4 px-2.5 py-1 rounded-sm bg-[#1b2842]">
          TODAY
        </div>
        <div className="block md:grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {betData.availableBet
            .filter((val: BetList) => val.isToday)
            .map((val: BetList, index: number) => (
              <div key={'betData_' + index}>
                <CardComponent betDetails={val} />
              </div>
            ))}
        </div>
      </div>

      {/* Upcoming bets section */}
      <div className="mt-4">
        <div className="w-fit h-7 justify-center text-white font-bold text-base leading-5 shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex items-center uppercase mb-4 px-2.5 py-1 rounded-sm bg-[#1b2842]">
          UPCOMING
        </div>
        <div className="block md:grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {betData.availableBet
            .filter((val: BetList) => !val.isToday && !val.isLive)
            .map((val: BetList, index: number) => (
              <div key={'betData_' + index}>
                <CardComponent betDetails={val} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
