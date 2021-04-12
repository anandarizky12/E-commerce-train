import './App.css';
import React,{useState,useEffect} from 'react';
import {commerce} from './lib/commerce'
import { Navbar, Products,Cart,Checkout,SearchParent} from './components';
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom';

function App() {
  const [products,setproducts]=useState([]);
  const [cart,setcart] =useState({});
  const [smallloading,setsmallloading]=useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchproducts,setsearchproducts] = useState([]);
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');


  // REACT_APP_CHEC_PUBLIC_KEY=pk_test_19661763baf3194382812193e2e539617b1870f41d8b9
 
  const fetchcart=async()=>{
    const data=await commerce.cart.retrieve()

    setcart(data)
  }
  const fetchProducts = async () => {
    const  {data}  = await commerce.products.list();
  
    setproducts(data);

  };
  const Addtocart=async (productId,quantity)=>{
    setsmallloading(true)
    const item = await commerce.cart.add(productId,quantity);
   
    setcart(item.cart);
   
    if(item){
      setsmallloading(false)
    }

  }
  const handleUpdateCartQty=async (productId,quantity)=>{
    const {cart}=await commerce.cart.update(productId, {quantity});
    setcart(cart)

  }

  const handleRemoveFromCart=async (productId)=>{
    const {cart }=await commerce.cart.remove(productId);
    setcart(cart)
  }
  const handleEmptyCart=async ()=>{
      const {cart}=await commerce.cart.empty();
      setcart(cart)
  }

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
 
    setcart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

      setOrder(incomingOrder);

      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };
 
  useEffect(() => {
    fetchProducts();
    fetchcart();
  
  },[])
  useEffect(()=>{
      console.log(order,"dskjdakjdasjdorderrerrrrrr")
  },[order])
  return (
    <Router>
          <div className="App">
           <Navbar  cart={cart} products={products} setsearchproducts={setsearchproducts} smallloading={smallloading} searchText={searchText} setSearchText={setSearchText}/>
              <Switch>
                <Route exact path="/">
                    <Products  products={products} Addtocart={Addtocart}/>
                </Route>
                <Route exact path="/cart">
                     <Cart 
                     cart={cart}
                     handleUpdateCartQty={handleUpdateCartQty}
                     handleRemoveFromCart={handleRemoveFromCart}
                     handleEmptyCart={handleEmptyCart}

                     />
                </Route>
                <Route exact path="/checkout">
                <Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} />
                </Route>
                <Route exact path="/search">
                  <SearchParent cart={cart}  searchproducts={searchproducts} Addtocart={Addtocart}/>
                </Route>
                
              
              </Switch>
         
         
        </div>
    </Router>
        
  );
}

export default App;
