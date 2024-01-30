import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal, Popconfirm,Table, message,Form,Input } from "antd";
import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getbrand, postbrand, putbrand,deletebrand} from "../../redux/slices/brandSlice";


const BrandSettings = ({BackToSetting})=>{
    

    const columns = [
        {
            title:'S.No',
            dataIndex:'SerialNo',
            width:'10%'
        },
        {
            title:'Name',
            dataIndex:'BrandName',
            width:'60%'
        },
        {
            title:'Operation',
            dataIndex:'operation',
            width:'30%',
            render:(text,record) => (
                <div className="flex gap-x-2">
                    <Popconfirm
                       title="Are you sure to delete this?"
                       okText="Yes"
                       cancelText="No"
                       okButtonProps={{style: {backgroundColor:"red" ,color:"white"}}}
                       onConfirm={() => DeleteMethod(record)}
                    >
                        <Button><FontAwesomeIcon icon={faTrash} /></Button>
                    </Popconfirm>  
                    <Button onClick={() => PencilBtn(record.key)}
                    >
                        <FontAwesomeIcon icon={faPen} />
                    </Button> 
                </div>
            )
        },
    ]
   
    const dispatch =useDispatch();

    const {brand} = useSelector(state => state.brand);
    const [brandData,setBrandData] = useState([]);

    //Input Field value 
    const headingValue ="Brand";
    const [Brand,setBrand]= useState({
        id:"",
        Name:"",
        isdeleted:false,
    });

    //Modify
    const [putBrand,setPutBrand] = useState([]);
    const clearFields =() =>{setBrand({Name:"",createdBy:"",
    createdDate:"",
    modifiedBy:"",
    modifiedDate:"",isdeleted:false,})};

    //Pop Up Window
    const [modalOpen,setModalOpen] = useState(false);
    const ModalOpen =() => setModalOpen(true);
    const ModalClose =() => setModalOpen(false);

    //Save or Add Button
    const [saveBtn,setsaveBtn] = useState(false);
    const saveBtnOn =( ) =>setsaveBtn(true);
    const saveBtnOff = () => setsaveBtn(false);

    //Add New Field
    const AddNewBtn = () => {
        clearFields();
        saveBtnOff();
        ModalOpen();
    }
    
    //Input Data
    const InputDataFields = (e) =>{
        const {value} = e.target;
        setBrand({
            Name:value,
            // createdBy:PreviousValue[0].createdBy,
            // createdDate:PreviousValue[0].createdDate,
            // modifiedBy:PreviousValue[0].modifiedBy,
            // modifiedDate:PreviousValue[0].modifiedDate,  
            isdeleted:false

        });
    }

    //Table Data And Column 
    const BrandDatas = brand.length>0 ? brand.filter(brnd => brnd.isdeleted ===false) : [];
// console.log("Brand Data:",BrandDatas);
    //Table Data And Column 
    const TableDatas =BrandDatas.map((brnd,i) => ({
        key:brnd.id,
        SerialNo:i+1,
        BrandName:brnd.name,
    }));
    //console.log("Tbl data:",TableDatas);
    //CRUD Method 
    //Post Method
    const PostMethod = async () => {
        try{
            if(!Brand.Name){
                message.error("Fill the Fields!");
            }
            else{
                await dispatch(postbrand(Brand));
                await dispatch(getbrand());
                message.success(`New ${headingValue} created successfully!`);
                ModalClose();
            }
        }catch(error){
            console.error("Error posting brand:",error);
            message.error("Failed to create a new brand");
        }
    };

    const PencilBtn =(record) => {
        const PreviousValue =TableDatas.filter(pr => pr.key ===record);
        setBrand({
            id:record,
            Name:PreviousValue[0].BrandName,        
            isdeleted:false
        });
        setPutBrand({id:PreviousValue[0].key,Name: PreviousValue[0].BrandName,isdeleted:false});
        saveBtnOn();
        ModalOpen();
    }

    const PutMethod = async () =>{
        if(!Brand.Name){
            message.error("Fill the Fields!")
        }
        else{
            const putData={
                id:putBrand.id,
                Name:Brand.Name,
                isdeleted:putBrand.isdeleted
            };
        //    console.log("Put DATA:",putData);
            await dispatch(putbrand(putData));
            await dispatch(getbrand());
            ModalClose();
            message.success("Saved Successfully!")
        }
    }
    

      //Delete Method
      const DeleteMethod = async (key) => {
         const filterValue = await brand.filter(br=> br.id === key.key);
         
         const deleteData={
            id:filterValue[0].id,
            name:filterValue[0].name,
            createdBy:filterValue[0].createdBy,
            createdDate:filterValue[0].createdDate,
            modifiedBy:filterValue[0].modifiedBy,
            modifiedDate:filterValue[0].modifiedDate,            
            isdeleted:true
        };
         console.log(deleteData);
         await dispatch(putbrand(deleteData));
         
        // // Soft Delete 
        // //const PreviousValue = TableDatas.filter(pr => pr.key === key.key);
        // const filterValue = await brand.filter(br=> br.id === key.key);

        // //console.log("Previous Data:",PreviousValue );
        // const DeleteData = {
        //     id:filterValue[0].id,
        //     Name: filterValue[0].name,
        //     isdeleted:true
        // }
        // console.log(DeleteData);
        // console.log("Delete Data:",DeleteData);
        // await dispatch(putbrand(DeleteData));
        //     await dispatch(getbrand());

      // Log Redux state
            //message.success("Deleted successfully")
            
        // //Hard Delete
        // await dispatch(deletebrand(key.key));
        // await dispatch(getbrand());
      }  
      
//     // Delete Method
// const DeleteMethod = async (key) => {
//     try {
//         // Soft Delete directly using deletebrand action
//         await dispatch(deletebrand(key));
//         dispatch(getbrand());

//         // Log Redux state
       
        

//         message.success("Deleted successfully");
//     } catch (error) {
//         console.error("Error deleting brand:", error);
//         message.error("Failed to delete brand");
//     }
// }
     
    useEffect(()=>{
        dispatch(getbrand());
    },[dispatch]);

    // useEffect(() =>{
    //     setBrandData(brand);
    // }, [dispatch, PostMethod, PutMethod, DeleteMethod]);
    // console.log("Brand:",brandData);

return(
    <>
       <div className="flex items-center justify-between" >
       <h2>Brand Settings</h2>
        <Button style={{float:"right"}} onClick={()=>BackToSetting()}> Back</Button>
       </div>
       <Button onClick={() => AddNewBtn()} type='primary' className='bg-blue-500 flex items-center gap-x-1 float-right mb-3 mt-3'> <span>Add New Brand</span> <FontAwesomeIcon icon={faPlus} className='icon' /> </Button>
       <Table
                style={{ marginTop: 10 }}
                bordered
                columns={columns}
                dataSource={TableDatas}
            pagination={{
                pageSize: 6
            }}
            />
            <Modal
            title={`Add New ${headingValue}`}
            open={modalOpen}
            onCancel={ModalClose}
            footer={
                [
                    saveBtn===false? <Button key="1" onClick={PostMethod}>Add</Button> : <Button key="1" onClick={PutMethod} >Save</Button>,
                    <Button type='text' key="2" danger="red" style={{border:"0.5px solid red"}} onClick={() =>ModalClose()}>Close</Button>
                ]
            }>
                <Form>
                    <Form.Item label="Name" style={{marginBottom:0,marginTop:10}}>
                        <Input style={{float:"right",width:"380px"}} placeholder="Brand Name" name="BrandName" value={Brand.Name} onChange={InputDataFields} />
                    </Form.Item>
                </Form>
            </Modal>
    </>
)
}
export default BrandSettings