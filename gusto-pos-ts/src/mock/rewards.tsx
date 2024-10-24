import GSSwitchButton from "@/components/widgets/switch/GSSwitchButton";
import { Input } from "@mui/material";
import Image from "next/image";

export const rewardMock = [
  {
    id: 1,
    No: 1,
    RewardName: "Student Discount",
    image: <Image alt="Student Discount" src="/images/student_discount.jpg" width={80} height={80} />,
    Pointsrequiredtoclaim: 20,
    RewardValidPeriod: <Input type="date" />,
    ShowPOS: <GSSwitchButton />,
  },
  {
    id: 2,
    No: 2,
    RewardName: "Buy One Get One Free",
    image: <Image alt="BOGO Offer" src="/images/bogo_offer.jpg" width={80} height={80} />,
    Pointsrequiredtoclaim: 30,
    RewardValidPeriod: <Input type="date" />,
    ShowPOS: <GSSwitchButton />,
  },
  {
    id: 3,
    No: 3,
    RewardName: "10% Off on Next Purchase",
    image: <Image alt="10% Off" src="/images/ten_percent_off.jpg" width={80} height={80} />,
    Pointsrequiredtoclaim: 25,
    RewardValidPeriod: <Input type="date" />,
    ShowPOS: <GSSwitchButton />,
  },
  {
    id: 4,
    No: 4,
    RewardName: "Free Dessert with Meal",
    image: <Image alt="Free Dessert" src="/images/free_dessert.jpg" width={80} height={80} />,
    Pointsrequiredtoclaim: 40,
    RewardValidPeriod: <Input type="date" />,
    ShowPOS: <GSSwitchButton />,
  },
  {
    id: 5,
    No: 5,
    RewardName: "Exclusive Merchandise",
    image: <Image alt="Exclusive Merchandise" src="/images/merchandise.jpg" width={80} height={80} />,
    Pointsrequiredtoclaim: 50,
    RewardValidPeriod: <Input type="date" />,
    ShowPOS: <GSSwitchButton />,
  },
  {
    id: 6,
    No: 6,
    RewardName: "Loyalty Program Signup Bonus",
    image: <Image alt="Signup Bonus" src="/images/signup_bonus.jpg" width={80} height={80} />,
    Pointsrequiredtoclaim: 15,
    RewardValidPeriod: <Input type="date" />,
    ShowPOS: <GSSwitchButton />,
  },
];
