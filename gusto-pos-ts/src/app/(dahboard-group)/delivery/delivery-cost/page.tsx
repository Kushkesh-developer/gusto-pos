import PageHeader from "@/components/widgets/headers/PageHeader";
import { Box } from "@mui/material";
import DeliveryCostForm from "@/components/delivery/DeliveryCostForm";
import React from "react";

export default function DeliveryCost(){
    return(
        <Box p={3}>
            <PageHeader title="Delivery Cost" hideSearch={true}/>
            <DeliveryCostForm/>
        </Box>
    )
}