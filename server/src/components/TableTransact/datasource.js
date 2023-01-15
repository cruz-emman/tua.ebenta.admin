
import dayjs from 'dayjs';
import './datasource.scss'


export const complete = [
    {field: '_id',headerName: 'Order ID', width: 250},
    {field: '', headerName: 'Buyer Name', width: 200,
        renderCell: (params) => {
            return(
                <div>
                    {params.row.userId.firstname} {params.row.userId.firstname} 
                </div>
            )
        },
        valueGetter: (params) =>  ` ${params.row.userId.firstname} ${params.row.userId.firstname}`

    },
    {field: 'buyyerId', headerName: 'Buyer ID', width: 200,
        renderCell: (params) => {
            return (
                <div>
                    <span>{`${params.row.userId.studentId}`}</span>
                </div>
            )
        },
        valueGetter: (params) =>  ` ${params.row.userId.firstname} ${params.row.userId.firstname} ${params.row.userId.studentId} `

    },
    {field: 'productId', headerName: 'Product', width: 250,
        renderCell: (params) =>{
            return(
                <div style={{display: 'flex',alignItems:'center', gap: "5px"}}>
                    <img style={{width: '30px', borderRadius: '50%'}} src={params.row.productId.img} />
                    <span>{params.row.productId.title}</span>
                </div>
            )
        },
        valueGetter: (params) =>  ` ${params.row.productId.title} `

    },
    {field: 'TotalAmount', headerName: 'Amount', width: 100,
        renderCell: (params) =>{
            return (
                <div>
                    ₱ {params.row.TotalAmount}
                </div>
            )
        }
    },
    {field: 'location', headerName: 'Location', width: 250},
    {field: 'time', headerName: "Time", width: 150, 
        renderCell: (params) =>{
            let time = params?.row?.time
            time = (dayjs(time).format('YYYY-MM-DD h:mm A'))
            return (
             <div>
                   {time}
             </div>
            )
        }
    },
    {
        field: "status",
        headerName: "Status",
        width: 250,
        renderCell: (params) =>{
          return (
            <div className={`cellWithStatus ${params.row?.status}`}>
            {params.row?.status}
          </div>
          )
        }
      }
  
]


export const completeSell = [
    {field: '_id',headerName: 'Order ID', width: 250},
    {field: '', headerName: 'Seller Name', width: 200,
        renderCell: (params) => {
            return(
                <div>
                    {params.row.sellerId.firstname} {params.row.sellerId.firstname} 
                </div>
            )
        },
        valueGetter: (params) =>  ` ${params.row.sellerId.firstname} ${params.row.sellerId.firstname}`

    },
    {field: 'sellerId', headerName: 'Seller ID', width: 200,
        renderCell: (params) => {
            console.log(params)
            return (
                <div>
                    <span>{`${params.row.userId.studentId}`}</span>
                </div>
            )
        },
        valueGetter: (params) =>  ` ${params.row.userId.firstname} ${params.row.userId.firstname} ${params.row.userId.studentId} `

    },
    {field: 'productId', headerName: 'Product', width: 250,
        renderCell: (params) =>{
            return(
                <div style={{display: 'flex',alignItems:'center', gap: "5px"}}>
                    <img style={{width: '30px', borderRadius: '50%'}} src={params.row.productId.img} />
                    <span>{params.row.productId.title}</span>
                </div>
            )
        },
        valueGetter: (params) =>  ` ${params.row.productId.title} `

    },
    {field: 'TotalAmount', headerName: 'Amount', width: 100,
        renderCell: (params) =>{
            return (
                <div>
                    ₱ {params.row.TotalAmount}
                </div>
            )
        }
    },
    {field: 'location', headerName: 'Location', width: 250},
    {field: 'time', headerName: "Time", width: 150, 
        renderCell: (params) =>{
            let time = params?.row?.time
            time = (dayjs(time).format('YYYY-MM-DD h:mm A'))
            return (
             <div>
                   {time}
             </div>
            )
        }
    },
    {
        field: "status",
        headerName: "Status",
        width: 250,
        renderCell: (params) =>{
          return (
            <div className={`cellWithStatus ${params.row?.status}`}>
            {params.row?.status}
          </div>
          )
        }
      }
  
]

export const pendingData = [
    {field: '_id',headerName: 'Order ID', width: 250},
    {field: 'sellerId', headerName: 'Seller ID', width: 150,
        renderCell: (params) => {
            return (
                <div>{params.row.sellerId.studentId}</div>
            )
        },
        valueGetter: (params) =>  ` ${params.row.sellerId.studentId} `

    },
    {field: 'productId', headerName: 'Product', width: 250,
        renderCell: (params) =>{
            console.log(params.row)
            return(
                <div style={{display: 'flex',alignItems:'center', gap: "5px"}}>
                    <img style={{width: '30px', borderRadius: '50%'}} src={params.row.productId.img} />
                    <span>{params.row.productId.title}</span>
                </div>
            )
        },
        valueGetter: (params) =>  ` ${params.row.productId.title} `

    },
    {field: 'TotalAmount', headerName: 'Amount', width: 100,
        renderCell: (params) =>{
            return (
                <div>
                    ₱ {params.row.TotalAmount}
                </div>
            )
        }
    },
    {field: 'location', headerName: 'Location', width: 250},
    {field: 'time', headerName: "Time", width: 150, 
        renderCell: (params) =>{
            let time = params?.row?.time
            time = (dayjs(time).format('YYYY-MM-DD h:mm A'))
            return (
             <div>
                   {time}
             </div>
            )
        }
    },
    {
        field: "status",
        headerName: "Status",
        width: 250,
        renderCell: (params) =>{
          return (
            <div className={`cellWithStatus ${params.row?.status}`}>
            {params.row?.status}
          </div>
          )
        }
      }
  
]

export const canceledOrder = [
    {field: '_id',headerName: 'Order ID', width: 250},
    {field: '', headerName: 'Seller Name', width: 250, renderCell:(params) =>{
        return (
            <div>
                {params.row.userId.firstname} {params.row.userId.lastname}

            </div>
        )
    }},
    {field: 'sellerId', headerName: 'Seller ID', width: 150,
        renderCell: (params) => {
            return (
                <div>{params.row.sellerId.studentId}</div>
            )
        },
        valueGetter: (params) =>  ` ${params.row.sellerId.studentId} `

    },
    {field: 'productId', headerName: 'Product', width: 250,
        renderCell: (params) =>{
            console.log(params.row)
            return(
                <div style={{display: 'flex',alignItems:'center', gap: "5px"}}>
                    <img style={{width: '30px', borderRadius: '50%'}} src={params.row.productId.img} />
                    <span>{params.row.productId.title}</span>
                </div>
            )
        },
        valueGetter: (params) =>  ` ${params.row.productId.title} `

    },
    {field: 'TotalAmount', headerName: 'Amount', width: 100,
        renderCell: (params) =>{
            return (
                <div>
                    ₱ {params.row.TotalAmount}
                </div>
            )
        }
    },
    {field: 'location', headerName: 'Location', width: 250},
    {field: 'time', headerName: "Time", width: 150, 
        renderCell: (params) =>{
            let time = params?.row?.time
            time = (dayjs(time).format('YYYY-MM-DD h:mm A'))
            return (
             <div>
                   {time}
             </div>
            )
        }
    },
    {
        field: "status",
        headerName: "Status",
        width: 250,
        renderCell: (params) =>{
          return (
            <div className={`cellWithStatus ${params.row?.status}`}>
            {params.row?.status}
          </div>
          )
        }
      }
  
]