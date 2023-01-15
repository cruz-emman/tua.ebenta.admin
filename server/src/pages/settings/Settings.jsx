import React, { useEffect, useState } from 'react'
import Banner from './banner.jpg'
import './settings.scss'
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import BeatLoader from "react-spinners/BeatLoader";
import { publicRequest } from "../../publicRequest";
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import { Box, Button, Container, Divider, TextField, Typography } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
  } from 'firebase/storage'
  import {storage} from '../../firebase'
  import app from '../../firebase'



const Settings = () => {

    const [loading, setLoading] = useState(true)
    const [itemName, setItemName] = useState({
        headerImage: ''
    })


    const [imgUrl, setImgUrl] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);

    useEffect(() =>{

        setLoading(false)
    },[setLoading])


    const handleClick = async (e) =>{
        e.preventDefault();
        try {
             await publicRequest.post('/header/', itemName)
             window.alert("Successfully Change!")
        } catch (error) {
            
        }
    }

    const [uploadProduct,setUploadProduct] = useState(null)

    const uploadCSVProduct = async (e) =>{
        e.preventDefault();
       const file = e.target[0]?.files[0]
       console.log(file)
       if(!file) return
    
       try {
        const res = await publicRequest.post('/product/addcsv')
        console.log(res.data)
       } catch (error) {
        console.log(error)
       }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const file = e.target[0]?.files[0]
        if (!file) return;
        const storageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
    
        uploadTask.on("state_changed",
          (snapshot) => {
            const progress =
              Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgresspercent(progress);
          },
          (error) => {
            alert(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setItemName({headerImage: downloadURL})
              setImgUrl(downloadURL)
            });
          }
        );
      }

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
            :
            (
                <div className='settings'>
                <Sidebar />
                    <div className="settingsContainer">
                        <Navbar />
                        <Box p={4} sx={{display:'flex', gap: 2}}>
                        


                            <Box sx={{display: 'flex', flexDirection:'column',  alignItems:'start', gap: 2, boxShadow: 2, width: 300, padding:2,width: '100%'}}>
                                <Typography variant="h5" fontWeight={700} color="text.secondary">UPDATE CLIENT-SIDE</Typography>
                                <Box sx={{dispay: 'flex', alignItems:'center', justifyContent:'space-between'}}>
                                    <Box sx={{display:'flex', alignItems:'start', gap: 2, flexDirection: 'row'}}>
                                        <Box sx={{padding: 4,margin: 2, width: '300px', boxShadow:3}}>
                                            <Box sx={{width: {xs: 150, md: "50%"} }}>
                                            {imgUrl  && 
                                            <Box component="img" src={imgUrl ? imgUrl : Banner} sx={{height:'100%', width: '100%', objectFit: 'contain',borderRadius: '16px'}}   />
                                            }
                    
                                        </Box>
                                        </Box>
                                        <form onSubmit={handleSubmit} className='form'>
                                            <input type='file' multiple />
                                            <Button variant='contained' endIcon={<PhotoCamera />}  size="small" type='submit'>Upload</Button>
                                        </form>
                                            {
                                            !imgUrl &&
                                            <div className='outerbar'>
                                                <div className='innerbar' style={{ width: `${progresspercent}%` }}>{progresspercent}%</div>
                                            </div>
                                            }

                                        
                                    </Box>
                                    
                                </Box>
                                <Button onClick={handleClick} type="submit" color="secondary" variant='contained'>Submit</Button>
                            </Box>
                        </Box>
                    </div>
                </div>
            )
        }
    </>
  )
}

export default Settings