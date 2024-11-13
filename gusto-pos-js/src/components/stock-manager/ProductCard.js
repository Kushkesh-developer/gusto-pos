import { Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import ClickableCard from "@/components/widgets/cards/ClickableCard";








export default function ProductCard(props) {
  return (
    <ClickableCard
      sx={{ width: "100%", p: 0, position: "relative" }}
      onClick={() => props.onClick()}
      variant="outlined">

      <Image
        style={{ width: "100%", objectFit: "cover", minHeight: 180 }}
        src={props.image}
        width={100}
        height={180}
        alt="product" />

      <Stack alignItems={"flex-start"} mx={1}>
        <Typography variant="body2">{props.title}</Typography>
        <Typography mt={2} mb={1}>
          L£{props.price}
        </Typography>
      </Stack>
    </ClickableCard>);

}