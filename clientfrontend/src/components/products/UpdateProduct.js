import React, { Fragment , useEffect, useState } from "react";
import toast from 'react-hot-toast'

import {useParams} from "react-router-dom"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";

// class UpdateProduct extends React.Component{
//     constructor(props){
//         console.log(props , 'props')
//         super(props)

//         this.state = {
//             productId:''
//         }
//     }
    
//     componentDidMount(){
//          let prodID = this.props.match.params.id
//         console.log(prodID , 'hdggdggdg')
//         this.setState({
//             productId : prodID
//         })
//     }

//     render(){
//         return(
//             <Fragment>
//                 <div className="container">
//                     {this.state.productId}
//                 </div>
//             </Fragment>
//         )
//     }
// }

const UpdateProduct = () => {
    const { id } = useParams();
    const [data,prodData] = useState({
                name:'',
                price:'',
                image:'',
                quantity:'',
                info:'',
    })
    useEffect(() => {
        let dataUrl = `http://127.0.0.1:5000/api/products/${id}`
        axios.get(dataUrl).then((res) => {
           prodData({
            ...data,
            name:res.data.name,
            price:res.data.price,
            quantity:res.data.quantity,
            info:res.data.info ,  
           })
    })
  
    },[])

    const changeInput = (event) => {
        event.preventDefault();
         prodData({
            ...data,
            [event.target.name]: event.target.value
        })
    } ;

    //image change convert to base 64 to save in server
   const changeImage =  async (event) => {
        let imageFile = event.target.files[0];
        const base64 = await base64Image(imageFile)
        prodData({
            ...data,
            image: base64
        })
    }

 const base64Image = (imageFile) => {
    return new Promise((resolve,reject) => {
        let reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.addEventListener('load' , () => {
            if(reader.result){
                resolve(reader.result)
            }
            else {
                reject(toast.error('Image cant be read'))
            }
        })
    })
}

    const navigate = useNavigate()
    function submitupdate(e){
        e.preventDefault();
        axios.put( `http://127.0.0.1:5000/api/products/${id}` , data).then(() => {
            navigate('/ProductAdmin')
            
        }).catch((err) => {
            toast.error('Connection error')
        })

    }
     


    return(
        <Fragment>
                    <Navbar/>

            <div className="container mt-4 animated zoomIn">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-success">Update Product</p>
                            <p>Update the Product with all your requirements</p>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-5">
                            <div className="card ">
                                <div className="card-header bg-dark text-white m-3">
                                    <h4>Update Product</h4>
                                </div>
                                <div className="card-body m-3">

                                    <form onSubmit={submitupdate}>
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Product Name" 
                                            name="name"
                                            value = {data.name}
                                            onChange={changeInput}
                                          />
                                        </div>
                                        <div className="form-group">
                                            <div className="custom-file">
                                                <input  onChange={changeImage}                                               
                                                 type="file"  className="custom-file-input form-control" id="customFile"/>
                                                <label className="custom-file-label form-label" htmlFor="customFile">Browse</label>

                                            </div>
                                        
                                        </div> 
                                        <div className="form-group">
                                            <input type="number" className="form-control" placeholder="Price"
                                             name="price"
                                             value = {data.price}
                                             onChange={changeInput}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input type="number" className="form-control" placeholder="Available quantity"
                                             name="quantity"
                                             value = {data.quantity}
                                             onChange={changeInput}
                                             />
                                        </div>
                                        <div className="form-group">
                                            <textarea className="form-control" rows={3} placeholder="general info"
                                                 name="info"
                                                 value = {data.info}
                                                 onChange={changeInput}
                                             ></textarea>
                                        </div>
                                        <div className="form-group">
        
                                            <input type="submit" value="Update Product" className=" btn btn-success btn-sm"/>
                                         </div>

                                    </form>
    
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
        </Fragment>
    )

} 

export default UpdateProduct