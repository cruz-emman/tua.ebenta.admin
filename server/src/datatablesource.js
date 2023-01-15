import dayjs from 'dayjs';
import avatarImage from './assets/avatar.png'

export const userColumns = [
  { field: "studentId", headerName: "ID", width: 120 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {

      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row?.img || avatarImage} alt="avatar" />
          {params.row?.firstname} {params.row?.lastname}
        </div>
      );
    },
    valueGetter: (params) => `${params.row?.firstname} ${params.row?.lastname}`
    
  },
  {
    field: "department",
    headerName: "Department",
    width: 230,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row?.status}`}>
          {params.row?.status}
        </div>
      );
    },
    valueGetter: (params) => `${params.row.status} ${params.row.status}`

  },
];


export const productColumn = [
  {field: '_id', headerName: "Product ID", width: 250},
  {
    field: "seller_id",
    headerName: "Student ID",
    width: 250,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row?.seller_id?.img || avatarImage} alt="avatar" />
          {params.row.seller_id.studentId}
        </div>
      )
    },
    valueGetter: (params) => `${params.row.seller_id.studentId}`
  },  
  {
    field: 'title',
    headerName: 'Item',
    width: 250,
    renderCell: (params) => {  
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row?.img} alt="avatar" />
          {params.row?.title}
        </div>
      )
    },
    valueGetter: (params) => `${params.row.title}`
  },

  {
    field: 'price',
    headerName: 'Price',
    width: 230,
    renderCell: (params) => {  
      return (
        <div className="cellWithImg">
          ₱ {params.row?.price}
        </div>
      )
    },
    valueGetter: (params) => `${params.row.price}`
  },
  {
    field: 'quantity',
    headerName: 'Quantity',
    width: 230,
  },

]


export const orderColumn = [
  {field: "_id", headerName: "Transaction", width: 220},
  {
    field: "buyerId",
    headerName: "Buyer ID" ,
    width: 150,
    renderCell: (params) => {

      return (
        <div className="cellWithImg">
             {params?.row?.userId?.studentId}
        </div>
      )
    },
    valueGetter: (params) => `${params.row.userId.studentId}`
  },
  {
    field: "amount",
    headerName:"Price" ,
    width: 100,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
           ₱ {params.row.TotalAmount}
        </div>
      )
    },
    valueGetter: (params) => `${params.row.TotalAmount}`

  },
  {
    field: "quantity",
    headerName:"Qty" ,
    width: 100,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
           {params.row.quantity}
        </div>
      )
    },
    valueGetter: (params) => `${params.row.quantity}`

  },
  {
    field: "products",
    headerName: "Product",
    width: 150,
    renderCell: (params) =>{
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.productId ? params.row.productId.img : ''} alt="avatar" />
          {params.row.productId ? params.row.productId?.title : '-'}
        </div>
      )
    },
    valueGetter: (params) => `${params.row.userId.studentId}`

  },
  {
    field: "seller",
    headerName: "Seller",
    width: 150,
    renderCell: (params) =>{
      return (
      <div>
          {params.row.sellerId.studentId}
      </div>
      )
    },
    valueGetter: (params) => `${params.row.sellerId.studentId}`

  },
  {
    field: "location and time",
    headerName: "Location and Time",
    width: 400,
    renderCell: (params) =>{
      let time = params?.row?.time
      time = (dayjs(time).format('YYYY-MM-DD h:mm A'))
      return (
      <div >
          {params.row.location} || {time}
      </div>
      )
    },
    valueGetter: (params) => `${params.row.location} ${dayjs(params.row.time).format('YYYY-MM-DD h:mm A')}`
    

  },
  
  {
    field: "status",
    headerName: "Status",
    width: 150,
    renderCell: (params) =>{
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
        {params.row?.status}
      </div>
      )
    },
    valueGetter: (params) => `${params.row.status}`

  }
] 