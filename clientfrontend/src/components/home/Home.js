import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";

class Home extends React.Component{
 

    render(){
        return(
            
            <Fragment>
                        <Navbar/>

                <div className="landingpage">
                    <div className=" wrapper">
                        <div className="d-flex flex-column col-md-6 h-100  align-items-center f">
                            <div className="margin">
                            <h2 className="display-3 animated slideInUp mt-5 title-color"><i className="fa fa-shopping-cart"></i> BigBasket</h2>
                            <p className="lead animated slideInDown infor-color">Different from traditional supermarkets and traditional natural food stores, fresh stores emphasize perishables and offer center-store assortments that differ from those of traditional retailers—especially in the areas of ethnic, natural, and organic, e.g., Whole Foods, The Fresh Market, and some independents.</p>
                            </div>
                            <Link to={'/CreateProduct'} className="btn btn-md text-dark">CREATE PRODUCT</Link>

                             </div>

                    </div>

                </div>
            </Fragment>
        )
    }
}

export default Home