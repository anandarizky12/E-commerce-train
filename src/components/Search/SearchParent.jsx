import React,{useState,useEffect} from 'react';
import{ Grid } from '@material-ui/core';
import Product from './Search/Search';
import useStyles from './styles';
import PacmanLoader from "react-spinners/PacmanLoader";
import { css } from "@emotion/core";

const override = css`
  display: flex;
  margin: 0 auto;
  margin-bottom: 100px;
  margin-top: 100px;
  border-color: black;
`;

const SearchParent=({searchproducts,Addtocart})=>{
    const classes=useStyles()
    const colorLoading='#A4A4A4 '
    let [loading, setloading] = useState(true);
    let [color, setColor] = useState(colorLoading);

    useEffect(()=>{

        if(searchproducts.length == 0){
            setloading(true)
        }else{
            setloading(false)
        }
    },[searchproducts])
    console.log(searchproducts,"searchproducts")
    return (
    <main className={classes.content}>
        {loading ? 
        <>
        <div className={classes.toolbar}/>
        <PacmanLoader color={color}  css={override} loading={loading} size={50}  />
        <h1 style={{color:colorLoading}}>Not Found</h1>
        </>
        :
        <>
        <div className={classes.toolbar}/>
        <Grid  container justify='center' spacing={4}>
                {searchproducts.map((product)=>(
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                     
                                 <Product product={product} Addtocart={Addtocart} loading={loading}/>
                    </Grid>
                ))}
        </Grid>
        </>
        }
        

    </main>

    )
        
}


export default SearchParent;