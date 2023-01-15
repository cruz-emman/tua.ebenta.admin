import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import { userRequest } from "../../publicRequest"
import { useDispatch, useSelector
 } from "react-redux"
import BeatLoader from "react-spinners/BeatLoader";
import { getOrder } from "../../redux/apiCalls"
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const ListOrder = ({columns}) => {
  const dispatch = useDispatch()
  const {isFetching, orders} = useSelector((state) => state.order)
  const location = useLocation()
  const id = location.pathname.split('/')[1]
 

 
  const [orderComplete, setOrderComplete] = useState([])
  const [orderPending, setOrderPending] = useState([])
  const [orderdCanceled, setOrderdCanceled] = useState([])

  useEffect(() => {
    let complete = orders.filter((prod) => prod.status === 'complete')
    setOrderComplete(complete)

    let pending = orders.filter((prod) => prod.status === 'pending')
    setOrderPending(pending)

    let canceled = orders.filter((prod) => prod.status === 'canceled')
    setOrderdCanceled(canceled)

    getOrder(dispatch)
  },[dispatch])


  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
   <>
    {!isFetching ? (
                <BeatLoader 
                color="#36d7b7" 
                loading={isFetching}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
              />

    ) : (
       <div className="list">
       <Sidebar/>
       <div className="listContainer">
         <Navbar/>
         
         <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Completed Orders" value="1" />
              <Tab label="Pending Orders" value="2" />
              <Tab label="Cancelled Orders" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Datatable columns={columns} id={id} data={orderComplete} />
          </TabPanel>
          <TabPanel value="2">
            <Datatable columns={columns} id={id} data={orderPending} />
          </TabPanel>
          <TabPanel value="3">
            <Datatable columns={columns} id={id} data={orderdCanceled} />
          </TabPanel>
        </TabContext>
       </div>
     </div>
    )}
   </>
  )
}

export default ListOrder