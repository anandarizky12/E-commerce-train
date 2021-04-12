import React from 'react'
import {Container, Typography,Button,Grid} from '@material-ui/core'
import useStyles from './styles';
import Cartitem from './Cartitem/Cartitem'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'


function Cart({cart , handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart}) {

    function alert(){
        Swal.fire({
            title: 'Are You Sure Want To Clear All Cart ?',
            showDenyButton: true,
          
            confirmButtonText: `Yes`,
            denyButtonText: `No`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.fire('All Cart Has Been Deleted!', '', 'success');
              handleEmptyCart()
            } 
          })
    }
    
    const classes = useStyles();
    const renderEmptyCart=()=>{
            <Typography variant='subtitle1'>
           
                    You have no item in Shopping Cart,<Link className={classes.link} to="/"> Want Add Some</Link>!
            </Typography>
    };
    const renderCart=()=>{
        <>
        <Grid container spacing={3}>
                {cart.line_items.map((item)=>(
                    <Grid xs={12} sm={4} key={item.id}>
                        <Cartitem item={item}  handleUpdateCartQty={handleUpdateCartQty} handleRemoveFromCart={handleRemoveFromCart}/>
                    </Grid>
                ))}
        </Grid>
        <div className={classes.cartDetails}>
            <Typography variant="h4">
                    Subtotal : {cart.subtotal.formatted_with_symbol}
            </Typography>
                    <div className="">
                        <Button onClick={alert} className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary">Empty cart</Button>
                        <Button className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
                    </div>
        </div>
                    
        </>
    }

    if(!cart.line_items) return (<h1>Loading . . . </h1>);
    return (
      <Container>
          <div className={classes.toolbar}/>
          <Typography className={classes.title} variant="h3" gutterBottom>
                Your Shopping Cart
          </Typography>
          {!cart.line_items.length ? 
          
          <Typography variant='subtitle1'>
                  You have no item in Shopping Cart,<Link className={classes.link} to="/"> Want Add Some</Link>!
         </Typography>
          :  
          <>
          <Grid container spacing={3}>
                  {cart.line_items.map((item)=>(
                      <Grid item xs={12} sm={4} key={item.id}>
                          <Cartitem item={item} handleUpdateCartQty={handleUpdateCartQty} handleRemoveFromCart={handleRemoveFromCart} />
                      </Grid>
                  ))}
          </Grid>
          <div className={classes.cardDetails}>
              <Typography variant="h5">
                      Subtotal : {cart.subtotal.formatted_with_symbol}
              </Typography>
                      <div>
                          <Button onClick={alert}  className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary">Clear All</Button>
                          <Button component={Link} to="/checkout" className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
                      </div>
          </div>
                      
          </>
          
          
          }
      </Container>
    )
}

export default Cart
