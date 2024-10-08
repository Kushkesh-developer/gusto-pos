"use client"
import React ,{useState,useEffect}from "react";
import { Typography, Divider, Stack } from "@mui/material";
import GSTable from "@/components/widgets/table/GSTable";
import GSTableControls from "@/components/widgets/table/GSTableControls";
import { theme } from "@/theme/theme";
import { useLocalization } from "@/context/LocalizationProvider";
import { ColumnType } from "@/types/table-types";
import { mockResponse } from "@/mock/delivery";
import SelectInput from "@/components/widgets/inputs/GSSelectInput";

const groupOptions = [
  { label: "Hot", value: "hot" },
  { label: "Cold", value: "cold" },
];
const columnNames:ColumnType[]=[
    {label:"Name",key:"Name",visible:true},
    {label:"Phone",key:"Phone",visible:true},
    {label:"Email",key:"Email",visible:true},
    {label:"Location",key:"Location",visible:true},
    {label:"status",key:"status",visible:true},
    {label:"Action",key:"action",visible:true,isAction:true,
        actions:[
            {
                type:"edit",
                 // eslint-disable-next-line no-console
                 handler:()=>console.log("edit"),
            },
            {
                type:"delete",
                 // eslint-disable-next-line no-console
                handler:()=>console.log("Delete")
            }
        ]
    }
];

const Page=()=>{
    const{translate} = useLocalization();
    const[response]=useState(mockResponse);
    const[filteredUsers,setFilteredUsers]=useState(mockResponse);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const filteredRows = response.filter((item) => {
          const itemName = `${item.Name}`.toLowerCase();
          const sanitizedSearch = searchQuery.toLowerCase().trim();
          return itemName.includes(sanitizedSearch);
        });
        setFilteredUsers(filteredRows);
      }, [searchQuery, response]);
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
      const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
      const [columns, setColumns] = useState(columnNames);

      return(
        <Stack padding={3} spacing={2}>
            <Typography variant="h4" gutterBottom color={theme.palette.primary.main}> 
               {translate("view_drivers")}  
            </Typography>
            <Divider/>
            <Stack marginTop={2}>
               <GSTableControls
                 setSearchQuery={setSearchQuery}
                 setColumnsVisibility={(newColumns) => setColumns(newColumns)}
                 columns={columns}
                 renderFilterElement={
                    <Stack direction="row" spacing={2}> 
                           <SelectInput
                            options={groupOptions}
                            placeholder={translate("FilterByOutlet")}
                           height="40px"
                           sx={{ width: "auto" ,mr:2}}
              />
                    </Stack>
                 }
                  TableTitle="Add Driver"
                 href="/discount/add-discount-options"
                   showPrint
                  showExcel
                  showPdf
                showFilter
        />
      </Stack>
          <GSTable
             columns={columns}
              filteredUsers={filteredUsers}
             currentItems={currentItems}
            currentPage={currentPage}
            totalPages={totalPages}
              handlePageChange={(e, page) => setCurrentPage(page)}
              keyMapping={Object.fromEntries(
              columns.map((col) => [col.label, col.key]),
           )}
      />
        </Stack>
      )
}
export default Page;