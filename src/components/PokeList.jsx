import axios from "axios";
import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import PokeItem from "./PokeItem";
import {getPokemon} from "../utils/getPokemons";
import { Grid, TextField } from "@mui/material";

const PokeList = () => {
    const [pokemons, setPokemons] = useState([]);
    const [finder, setFinder] = useState("");
    const [listaAux, setlistaAux] = useState([]); //se declaran los estados

    const handleInputChange = (event) => { //
      setFinder(event.target.value)
    };

    useEffect(() => {
        getPokemon().then((data) => setPokemons(data));
    }, []);

    useEffect(()=>{
      let aBuscar = finder.toString().trim()
      if(aBuscar !== ""){
        const result = pokemons.filter((item)=>(
          item.name.toString().includes(aBuscar)
        ))
        setlistaAux(result)
      }
      console.log(finder)
    },[finder]);

    
  return <>
  <TextField id="outlined-basic" label="Outlined" variant="outlined" value={finder} placeholder={"Busca tu pokemon"} onChange={handleInputChange} />
  <br />
  <Grid container spacing={2}>
    <Grid item md={6}>
      {pokemons.map((element, index) => (
        <PokeItem pokemon = {element} key={element.name}></PokeItem>
      ))}
    </Grid>
    <Grid item md={6}>
        {finder &&
          listaAux.map((element, index) => (
            <PokeItem pokemon = {element} key={element.name} ></PokeItem>
          ))}
    </Grid>
  </Grid>
  </>
};

export default PokeList;