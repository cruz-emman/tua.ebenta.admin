import "./table.scss";
import React, {useEffect, useState} from "react";
import InventoryIcon from '@mui/icons-material/Inventory';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import BackspaceIcon from '@mui/icons-material/Backspace';
import TabContext from '@mui/lab/TabContext';
import { Box, Tab } from "@mui/material";
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import BeatLoader from "react-spinners/BeatLoader";
import SellIcon from '@mui/icons-material/Sell';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { canceledOrder, complete, completeSell, pendingData } from "./datasource";


const TableTransact = ({recentBuy, soldItems}) => {  
  const[loading, setLoading] = useState(true)
  const [value, setValue] = useState('1');
  const [completed, setCompleted] = useState([])
  
  const [completedSold, setCompletedSold] = useState([])
  const [pending, setPending] = useState([])
  const [cancelled, setCancelled] = useState([])

  console.log(soldItems)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() =>{

    let completedStatus = recentBuy.filter((prod) => prod.status === 'complete')
    setCompleted(completedStatus)

    let completedSoldItems = soldItems.filter((prod) => prod.status === 'complete')
    console.log(completedSoldItems)
    setCompletedSold(completedSoldItems)

    let pendingStatus = soldItems.filter((prod) => prod.status === 'pending')
    setPending(pendingStatus)

    let cancelStatus = soldItems.filter((prod) => prod.status === 'canceled')
    setCancelled(cancelStatus)


    setLoading(false)
  },[recentBuy,setLoading,setValue])


  return (
    <>
    {loading ? 
    (
      <BeatLoader 
      color="#36d7b7" 
      loading={loading}
      size={50}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
    )
    : (

      <Box>
      <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab icon={<InventoryIcon />} iconPosition="start" label="Sold Item" value="1" />
            <Tab icon={<SellIcon />} iconPosition="start" label="Bought Item" value="2" />
            <Tab icon={<PendingActionsIcon />} iconPosition="start" label="Pending" value="3" />
            <Tab icon={<BackspaceIcon />} iconPosition="start" label="Cancelled" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
         <Box sx={{height: "600px"}}>
          <DataGrid 
            {...completedSold}
            rows={loading ? [] : completedSold}
            getRowId={(row) => row._id}
            columns={complete}
            pageSize={9}
            rowsPerPageOptions={[9]}
            components={{ Toolbar: GridToolbar }}
            componentsProps={{
            toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
          }}
          />
          </Box>
        </TabPanel>
        <TabPanel value="2">
          <Box sx={{height: "600px"}}>
          <DataGrid 
            {...completed}
            rows={loading ? [] : completed}
            getRowId={(row) => row._id}
            columns={completeSell}
            pageSize={9}
            rowsPerPageOptions={[9]}
            components={{ Toolbar: GridToolbar }}
            componentsProps={{
            toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
          }}
          />
          </Box>
        </TabPanel>
        <TabPanel value="3">
        <Box sx={{height: "600px"}}>
          <DataGrid 
            {...pending}
            rows={loading ? [] : pending}
            getRowId={(row) => row._id}
            columns={pendingData}
            pageSize={9}
            rowsPerPageOptions={[9]}
            components={{ Toolbar: GridToolbar }}
            componentsProps={{
            toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
          }}
          />
          </Box>
        </TabPanel>
        <TabPanel value="4">
        <Box sx={{height: "600px"}}>
          <DataGrid 
            {...cancelled}
            rows={loading ? [] : cancelled}
            getRowId={(row) => row._id}
            columns={canceledOrder}
            pageSize={9}
            rowsPerPageOptions={[9]}
            components={{ Toolbar: GridToolbar }}
            componentsProps={{
            toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
          }}
          />
          </Box>
        </TabPanel>
      </TabContext>
    </Box>
      )}
    </>
  );
};  

export default TableTransact;
