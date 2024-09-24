import { Chip, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import ClickableCard from "@/components/widgets/cards/ClickableCard";

interface CardButtonData {
  image: string;
  tests: string;
  title: string;
  price: number;
  onClick: () => void;
}

export default function ProductCard(props: CardButtonData) {
  return (
    <ClickableCard
      sx={{ width: "100%", p: 0, position: "relative" }}
      onClick={() => props.onClick()}
    >
      <Image
        style={{ width: "100%", objectFit: "cover" }}
        src={props.image}
        width={140}
        height={180}
        alt="product"
      />
      <Chip
        variant="filled"
        color={"primary"}
        label={props.tests}
        sx={{ position: "absolute", top: 4, left: 4, fontSize: 12, height: 28 }}
      />
      <Stack alignItems={"flex-start"} mx={1}>
        <Typography variant="body2">{props.title}</Typography>
        <Typography mt={2} mb={1}>
          L£{props.price}
        </Typography>
      </Stack>
    </ClickableCard>
  );
}
