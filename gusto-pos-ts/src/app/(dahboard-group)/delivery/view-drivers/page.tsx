import React from "react";
import { Typography, Divider, Stack } from "@mui/material";
import GSTable from "@/components/widgets/table/GSTable";
import GSTableControls from "@/components/widgets/table/GSTableControls";
import { theme } from "@/theme/theme";
import { ColumnType } from "@/types/Table-types";

const columnNames:ColumnType[]=[
    {label:"Name",key:"Name",visible:true},
    {label:"Phone",key:"Phone",visible:true},
    {label:"Email",key:"Email",visible:true},
    {label:"Location",key:"Location",visible:true}
]