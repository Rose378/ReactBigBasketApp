import React,  { Fragment } from "react";
 import axios from "axios"
 import toast from 'react-hot-toast'
import { Navigate } from "react-router-dom";

import Navbar from "../navbar/Navbar";
class CreateProduct extends React.Component{
    
    constructor(props){
        super(props)

        this.state = {
            product : {
                name:'',
                price:'',
                image:'',
                quantity:'',
                info:''
            },
            isSubmitted:false,
            errmsg:'',

        }
    }

    changeInput = (event) => {
        this.setState ( {
            product : {
                ...this.state.product,
                [event.target.name] : event.target.value
            }
        })
    }

    //image change convert to base 64 to save in server
    changeImage = async (event) => {
        let imageFile = event.target.files[0];
        let base64Image = await this.base64Image(imageFile)  ;
        this.setState({
            product:{
                ...this.state.product,
                image: base64Image
            }
        })
    }

base64Image = (imageFile) => {
    return new Promise((resolve,reject) => {
        let reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.addEventListener('load' , () => {
            if(reader.result){
                resolve(reader.result)
            }
            else {
                reject('error')
            }
        })
    })
}


//submit to server
submitProduct = (event) => {
    event.preventDefault();
    let dataUrl = `http://127.0.0.1:9000/api/products/`
    
    axios.post(dataUrl , this.state.product).then(() => {
    this.setState({
        isSubmitted:true,

    })
    }).catch((err) => {
        this.setState({
            errmsg:toast.error('server connection refused')
        })
        console.error(err)
    })
    
}
 
    render(){

        return(
            <Fragment>
                        <Navbar/>

                <div className="container mt-4 ">
                    <div className="row ">
                        <div className="col">
                            <p className="h3 text-success">Create Product</p>
                            <p>Add your products to the list so that we can deliver you the exact List of items</p>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-5">
                            <div className="card ">
                                <div className="card-header bg-dark text-white m-3">
                                    <h4>New Product</h4>
                                </div>
                                <div className="card-body m-3">
                                    {
                                        this.state.isSubmitted ? <Navigate to="/ProductAdmin" replace={true} state={this.state.product} /> :
                                        
                                    
                                    <form onSubmit={this.submitProduct}>
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Product Name" 
                                            name="name"
                                            value={this.state.product.name}
                                            onChange={this.changeInput}/>
                                        </div>
                                        <div className="form-group">
                                            <div className="custom-file">
                                                <input                                                 
                                                 onChange={this.changeImage}
                                                 type="file"  className="custom-file-input form-control" id="customFile"/>
                                                <label className="custom-file-label form-label" htmlFor="customFile">Browse</label>

                                            </div>
                                        
                                        </div> 
                                        <div className="form-group">
                                            <input type="number" className="form-control" placeholder="Price"
                                            name="price"
                                            value={this.state.product.price}
                                            onChange={this.changeInput}/>
                                        </div>
                                        <div className="form-group">
                                            <input type="number" className="form-control" placeholder="Available quantity"
                                             name="quantity"
                                             value={this.state.product.quantity}
                                             onChange={this.changeInput}/>
                                        </div>
                                        <div className="form-group">
                                            <textarea className="form-control" rows={3} placeholder="general info"
                                             onChange={this.changeInput}
                                             name="info"
                                             value={this.state.product.info}
                                             ></textarea>
                                        </div>
                                        <div className="form-group">
        
                                            <input type="submit" value="Add to cart" className=" btn btn-success btn-sm"/>
                                         </div>

                                    </form>
    }
                                </div>
                            </div>
                        </div>
                        <div style={{marginBottom:"500px"}}></div>

                    </div>
                </div>
            </Fragment>
        )
    }
}

export default CreateProduct