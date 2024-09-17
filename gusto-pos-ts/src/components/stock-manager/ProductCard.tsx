import { Card, Chip, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

interface CardButtonData {
  image: string;
  tests: string;
  title: string;
  price: string;
  onClick: () => void;
}

export default function ProductCard(props: CardButtonData) {
  return (
    <Card
      sx={{ width: 140, p: 0, position: "relative" }}
      position="relative"
      onClick={() => props.onClick()}
      variant="outlined"
    >
      <Image src={props.image} width={140} height={140} alt="product" />
      <Chip
        variant="filled"
        color={"primary"}
        label={props.tests}
        sx={{ position: "absolute", top: 4, left: 4, fontSize: 12, height: 28 }}
      />
      <Stack alignItems={"flex-start"} mx={1}>
        <Typography variant="body2">{props.title}</Typography>
        <Typography mt={2} mb={1}>
          {props.price}
        </Typography>
      </Stack>
    </Card>
  );
}
