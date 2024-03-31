import React, { Fragment } from "react";
import toast from 'react-hot-toast'
import axios from "axios"
import Navbar from "../navbar/Navbar";
class ProductList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            products:[],
            errmsg:'',
        }
    }

    componentDidMount(){
        let dataUrl = `http://127.0.0.1:5000/api/products/`;
        axios.get(dataUrl).then((res) => {
            this.setState({
                products: res.data
            })
        }).catch((err) => {
            this.setState({
                errmsg:toast.error('server connection refused')
            })
        })
    }

    render(){
        return(
            <Fragment>
                <Navbar prodlength = {this.state.products.length}/>

                <div className="container mt-4 animated slideInLeft">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-success ">Products List</p>
                            <p className="lead">List is here with {this.state.products.length} Items</p>
                        </div>
                    </div>

                    <div className="row">
                            {
                                this.state.products ? <React.Fragment>
                                    {
                                        this.state.products.map((product) => {
                                           return(
                                            <div className="col-md-3">

                                            <div className="card">
                                                <div className="card-header">
                                                    <img src={product.image} alt="" width="200" height="100"/>
                                                </div>
                                                <div className="card-body">
                                                    <ul>
                                                        <li>Name: {product.name}</li>
                                                        <li>Price: &#8377;{product.price.toFixed(2)}</li>
                                                        <li>Quantity {product.quantity} kgs</li>

                                                    </ul>
                                                </div>
                                                <div>
                                                
                                                </div>
                                            </div>
                                            </div>

                                           )
                                        })
                                    }
                                </React.Fragment> : null
                                
                            }
                        
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default ProductList