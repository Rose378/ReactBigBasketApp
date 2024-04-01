import React, { Fragment } from "react";
import toast from 'react-hot-toast'
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../navbar/Navbar";
class ProductAdmin extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            products:[],
            errmsg:'',
            prodlength:null
        }
    }

    componentDidMount(){
        this.getProducts()
    
    }

    //get all rpoducts
    getProducts = () => {
        let dataUrl = `https://reactbigbasketapp.onrender.com/api/products/`;
    axios.get(dataUrl).then((res) => {
        console.log(res.data)
        this.setState({
            products: res.data,
            prodlength: this.state.products.length
        })  

    }).catch((err) => {
        this.setState({
            errmsg:toast.error('server connection refused')
        })
    })
    }

    //delete
    deleteProduct = (prodId) => {
        let dataUrl = `https://reactbigbasketapp.onrender.com/api/products/${prodId}`;
        axios.delete(dataUrl).then((res) => {
            this.getProducts()
        }).catch((err) => {
            toast.error('server api error');
        })

    }
    render(){
        return(
            <Fragment>
                <Navbar prodlength = {this.state.prodlength}/>
                 <div className="container mt-4 animated zoomIn">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-success ">Products Admin</p>
                            <p className="lead">Your List of Items are here to recheck. Please check them out.</p>

                        </div>
                    </div>
                    <Link to={'/CreateProduct'} className="btn btn-success btn-sm">Create Product</Link>

                    <div className="row ">
                        <div className="col">
                            <table className="table table-hover table-striped text-center table-success">
                                <thead className="bg-dark text-white">
                                    <tr>
                                    <th>s.no</th>
                                    <th>Name</th>
                                    <th>Image</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Info</th>
                                    <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                  {
                                    this.state.products.length > 0 ? 
                                    <React.Fragment>
                                        {
                                            this.state.products.map((product) => {
                                                return(
                                                    <tr>
                                                        <td>{product._id.substr(product._id.length - 4)}</td>
                                                        <td>{product.name}</td>
                                                        <td>
                                                            <img src={product.image} alt="Product Show" height="70" width="70"/>
                                                        </td>
                                                        <td>&#8377;{product.price.toFixed(2)}</td>
                                                        <td>{product.quantity} Kgs</td>
                                                        <td>{product.info}</td>
                                                        <td>
                                                        <Link to={`/UpdateProduct/${product._id}`} className="btn btn-success btn-sm">Update Product</Link>
                                                        <Link to={'/ProductAdmin'} className="btn btn-success btn-sm ml-3" onClick={this.deleteProduct.bind(this,product._id)}>Delete</Link>

                                                        </td>
                                                     
                                                    </tr>
                                                )
                                            })
                                        }
                                    </React.Fragment> : 

                                    <React.Fragment>
                                              <tr>
                                            <td colSpan="8" className="text-danger">-----------No Products Available-------------</td>
                                        </tr>
                                    </React.Fragment>
                                    
            
                                       
                                  
                                  }
                                </tbody>
                            </table>

    
                        </div>
                    </div>
                </div>
            
            </Fragment>
           
        )
        
    }
    
}

export default ProductAdmin