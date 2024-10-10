import GSSwitchButton from "@/components/widgets/switch/GSSwitchButton";
import { Input } from "@mui/material";
import Image from "next/image";

export const mockResponse = [
    {
     No:1,	
      RewardName: "Student discount",
      image: <Image alt=".." src="/images/product.jpg" width={80} height={80} />,
      Pointsrequiredtoclaim: 20,
      RewardValidPeriod	: <Input type="date" />,
      ShowPOS: <GSSwitchButton/>,
     
    },
    {
        No:2,
      RewardName: "Student discount",
      image: <Image alt=".." src="/images/product.jpg" width={80} height={80} />,
      Pointsrequiredtoclaim: 20,
      RewardValidPeriod	: <Input type="date" />,
      ShowPOS: <GSSwitchButton/>,
     
    },
  
    // Add more mock data if needed
  ];