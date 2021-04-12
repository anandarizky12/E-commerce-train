import React,{useState,useEffect} from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';
import Swal from 'sweetalert2'
import useStyles from './styles';
import PulseLoader from "react-spinners/PulseLoader";

const CartItem = ({ item, handleUpdateCartQty, handleRemoveFromCart }) => {
  let [loading, setLoading] = useState(false);
  const classes = useStyles();

  function Alert(){
    Swal.fire({
        title: 'Are You Sure Want To Remove This ?',
        showDenyButton: true,
      
        confirmButtonText: `Yes`,
        denyButtonText: `No`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire('Item Removed!', '', 'success');
          handleRemoveFromCart(item.id)
        
        } 
      })
  }
  function handleMin(){
    
    setLoading(true)
    handleUpdateCartQty(item.id, item.quantity - 1)
  }
  function handlePlus(){
    
    setLoading(true)
    handleUpdateCartQty(item.id, item.quantity + 1)
  }
  
  useEffect(()=>{
      setLoading(false)
  },[item.quantity])

//   const handleUpdateCartQty = (lineItemId, newQuantity) => onUpdateCartQty(lineItemId, newQuantity);

//   const handleRemoveFromCart = (lineItemId) => onRemoveFromCart(lineItemId);

  return (
    <Card className="cart-item">
      <CardMedia image={item.media.source} alt={item.name} className={classes.media} />
      <CardContent className={classes.cardContent}>
        <Typography variant="h5">{item.name}</Typography>
        <Typography variant="subtitle1">{loading ?   <PulseLoader color={'#858585 '} loading={loading}  size={2} /> :item.line_total.formatted_with_symbol}</Typography>
      </CardContent>
      <CardActions className={classes.cartActions}>
        <div className={classes.buttons}>
          <Button type="button" size="small" onClick={() =>handleMin()}>-</Button>
          <Typography >&nbsp;{item.quantity}&nbsp;</Typography>
          <Button type="button" size="small" onClick={() => handlePlus()}>+</Button>
        </div>
        <Button variant="contained" type="button" color="secondary" onClick={()=>Alert()}>Remove</Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;