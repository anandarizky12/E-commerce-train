import React,{useEffect,useState} from 'react';
import {AppBar,Toolbar,IconButton,Badge,MenuItem,Typography} from '@material-ui/core';
import {ShoppingCart} from '@material-ui/icons';
import useStyles from './styles'
import {Link,useLocation,useHistory} from 'react-router-dom'
import ClipLoader from "react-spinners/ClipLoader";
import TextField from '@material-ui/core/TextField';
// import logo from '../../assets/commerce.png';

function Navbar({cart,products,smallloading,setsearchproducts,searchText,setSearchText}) {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");
    const classes = useStyles();
    const location=useLocation()
    const history=useHistory();

    function handleInputSearch(e){
        e.preventDefault();
        let data=products.filter((fil)=>fil.name.toLowerCase().includes(searchText.toLowerCase()))
        setsearchproducts(data)
        setSearchText("")
        history.push("/search");
     
    }
   
    return (
     <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
            <img  src='/logo.png' alt="commerce.js" height="25px" className={classes.image} />
            <Typography variant="subtitle1">We Store</Typography>
          </Typography>
        
          
          <div className={classes.grow} />
        
          <div className={classes.button}>
            {location.pathname !=='/cart' && location.pathname !=="/checkout" && 
            <>
                  <form style={{ marginBottom :"15px"}} onSubmit={handleInputSearch} >
                       <TextField value={searchText} onChange={(e)=>setSearchText(e.target.value)} label="Search" />
                  </form>
                  <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                  <Badge  badgeContent={smallloading ?  <ClipLoader color={color} loading={loading}  size={7} /> : cart.total_items} color="secondary">
                    <ShoppingCart/>
                  
                  </Badge>
                </IconButton>
            </>
            }
          
          </div>
       
        </Toolbar>
      </AppBar>
     </>
    )
}

export default Navbar
