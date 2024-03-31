import './App.css';
import {Toaster} from 'react-hot-toast' 
import React, { Fragment } from 'react';
import {HashRouter , Route , Routes   } from 'react-router-dom'
import ProductList from './components/products/ProductList';
import ProductAdmin from './components/products/ProductAdmin';
import Home from './components/home/Home';
import CreateProduct from './components/products/CreateProduct';
import UpdateProduct from './components/products/UpdateProduct';
class App extends React.Component{


render(){
  return (
    <Fragment>
      <div className='App'>
        <HashRouter>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route exact path='/Home'  element={<Home/>}/>
              <Route exact path='/ProductList'  element={<ProductList/>}/>
              <Route exact path='/ProductAdmin' element={<ProductAdmin/>}/>
              <Route exact path='/CreateProduct' element={<CreateProduct/>}/>
              <Route exact path='/UpdateProduct/:id' element={<UpdateProduct/>}/>            
            </Routes>
            <Toaster />

        </HashRouter>
      </div>
    </Fragment>
  )
}
}

export default App;
