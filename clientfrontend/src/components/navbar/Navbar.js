import React, { Fragment } from "react";
import { Link } from "react-router-dom";

class Navbar extends React.Component{
    
 
    render(){
        return(
            <Fragment>
                <nav className="navbar navbar-dark nav-color navbar-expand-sm">
                    <div className="container animated slideInLeft">
                        <Link to='/ ' className="navbar-brand text-dark">
                           <i className="fa fa-shopping-cart"/> BigBasket </Link>
                           <div className="collapse navbar-collapse">
                           <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link to='/home' className="navbar-brand text-dark">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/ProductList' className="navbar-brand text-dark">ProductList</Link>
                                </li>
                            </ul>
                           </div>
                    
                        <Link to='/ProductAdmin' className="navbar-brand text-dark">ProductAdmin</Link>
                        <div className="d-flex align-items-center">
                        <i className="fa fa-shopping-cart cartsize ">
                           </i> 
                           {
                            this.props.prodlength > 0 ?  <p className="numsize">{this.props.prodlength}</p> :null

                           }
                        
                        </div>

                        {/* <Link to='/UpdateProduct' className="navbar-brand d text-dark">UpdateProduct</Link>
                        <Link to='/CreateProduct' className="navbar-brand text-dark">CreateProduct</Link> */}
                    </div>
                </nav>
            </Fragment>
        )
    }
}





// const Navbar = () => {
 
//     return(
//                     <Fragment>
//                         <nav className="navbar navbar-dark nav-color navbar-expand-sm">
//                             <div className="container animated slideInLeft">
//                                 <Link to='/ ' className="navbar-brand text-dark">
//                                    <i className="fa fa-shopping-cart"/> BigBasket </Link>
//                                    <div className="collapse navbar-collapse">
//                                    <ul className="navbar-nav">
//                                         <li className="nav-item">
//                                             <Link to='/home' className="navbar-brand text-dark">Home</Link>
//                                         </li>
//                                         <li className="nav-item">
//                                             <Link to='/ProductList' className="navbar-brand text-dark">ProductList</Link>
//                                         </li>
//                                     </ul>
//                                    </div>
                            
//                                 <Link to='/ProductAdmin' className="navbar-brand text-dark">ProductAdmin
                                
                        
//                                  </Link>
        
//                                 {/* <Link to='/UpdateProduct' className="navbar-brand d text-dark">UpdateProduct</Link>
//                                 <Link to='/CreateProduct' className="navbar-brand text-dark">CreateProduct</Link> */}
//                             </div>
//                         </nav>
//                     </Fragment>
//                 )
// }

export default Navbar