import React,{useState,useEffect} from 'react'
import {Card,CardMedia,CardContent,CardActions,Typography,IconButton} from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';


import useStyles from '../../Search/Search/styles';



function Product({product,Addtocart,loading}) {
 
    const classes=useStyles();
    function trunk(text,max=150){
        return text.length > max ? text.slice(1,max)+(' . . . ') :text;
    }
   
   
    return (
      
      <Card className={classes.root}>
      <CardMedia className={classes.media} image={!product.media.source ? 'Loading . . ' : product.media.source} title={product.name}/>
          <CardContent>
              <div className={classes.cardContent}>
                  <Typography variant='h5' gutterBottom>
                        {product.name}
                  </Typography>
                  <Typography variant='h5'>
                      {product.price.formatted_with_symbol}
                  </Typography>
                 
              </div>
              <Typography dangerouslySetInnerHTML={{ __html:product.description}} variant="body2" color="textSecondary" component="p" />
          </CardContent>
          <CardActions disableSpacing className={classes.cardActions}>
            
                <IconButton size="small" label="Add to Cart" onClick={()=>Addtocart(product.id,1)}>
                   <Typography variant="subtitle2" >Add To Cart &nbsp;</Typography> 
                    <AddShoppingCart/>
                </IconButton>
          </CardActions>
      

  </Card>
       
    )
}

export default Product
