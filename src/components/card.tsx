// Next Imports
import Image from "next/image";

// Reduc Imports
import {BetList} from "@/store/slices/betSlice";
import { addBet } from "@/store/thunk/betThunk";
import { useAppDispatch } from "@/store/store";

// Custom Assets
import MedalImage from "@/assets/Images/medal.png";
import PowerUpImage from "@/assets/Images/powerup.png";
import MedalStackImage from "@/assets/Images/medalStack.png";

interface propInterface {
  betDetails: BetList
}

export default function CardComponent(props:propInterface) {
  const {betDetails} = props;
  const dispatch = useAppDispatch();

  // Called when add bet button clickes
  const addMyBet = () =>{
    dispatch(addBet({data: betDetails}))
  }
  
  return (
    <>
      <div className="rounded-[10px] p-[20px]  bg-[#17243e] shadow-[4px_4px_4px_0px_rgba(31,46,77,0.62)_inset] gradiant-bg">
        <div className="flex justify-between">
          <div className="flex">
            <Image
              src={MedalImage}
              alt="Vercel Logo"
              className="dark:invert"
              height={24}
              width="0"
              priority
            />
            <h5 className="ml-1">{betDetails.league} </h5>
          </div>
          <div className="flex items-center">
            <div className="text-[13px]">{betDetails.date}</div>
            <div className="text-[#ff5353] text-[13px] ml-[5px]">{betDetails.isLive ? 'LIVE' :""}</div>
          </div>
        </div>
        <div className="px-6 py-4 flex justify-between">
          <div>
            <Image
              src={MedalStackImage}
              alt="Vercel Logo"
              width={25}
              height={25}
              priority
              className="mx-auto my-0"
            />
            <p className="my-2">{betDetails.teams[0].name}</p>
            <button onClick={addMyBet} className="w-[50px] h-8 text-lg leading-[25px] bg-red-600 rounded-[3px]">
            {betDetails.teams[0].price}
            </button>
          </div>
          <div>
            <Image
              src={PowerUpImage}
              alt="Vercel Logo"
              width={25}
              height={25}
              priority
              className="mx-auto my-0"
            />
            <p className="my-2">{betDetails.teams[1].name}</p>
            <button onClick={addMyBet} className="w-[50px] h-8 text-lg leading-[25px] bg-red-600 rounded-[3px]">
              {betDetails.teams[1].price}
            </button>
          </div>
        </div>

        {/* Bet details section */}
        <div className="text-center text-[13px]">
          <p>{betDetails.description}</p>
        </div>
      </div>
    </>
  );
}
