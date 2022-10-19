import axios from "axios";
import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import PokeItem from "./PokeItem";
import {getPokemon} from "../utils/getPokemons";
import { Grid, TextField, Card, CardContent  } from "@mui/material";
import { Stack } from "@mui/system";

const PokeList = () => {
    const [pokemons, setPokemons] = useState([]);
    const [finder, setFinder] = useState("");
    const [listaAux, setListaAux] = useState([]);
    const [errors, setErrors] = useState(false);
    const [listadoSelected, setListadoSelected] = useState([]);//se declaran los estados

    const handleInputChange = (event) => { //
      setFinder(event.target.value)
    };

     const stack = itemExterno => {
        setListadoSelected ((listadoSelected) => [...listadoSelected, itemExterno]);//se agrega el item al listado
       
        let result = pokemons.filter((item)=>(item.name !== itemExterno.name));
        setPokemons(result);

        let resultClon = listaAux.filter((item)=>(item.name !== itemExterno.name));
        setListaAux(resultClon);
    };

    // const unStack = itemExterno => {
    //     setPokemons ((pokemons) => [...pokemons, itemExterno]);//se agrega el item al listado
    //     setListaAux ((listaAux) => [...listaAux, itemExterno]);//se agrega el item al listado

    //     let result = listadoSelected.filter((item)=>(item.name !== itemExterno.name));
    //     setListadoSelected(result);
    // };

    useEffect(() => {
        getPokemon().then((data) => setPokemons(data));
    }, []);

    useEffect(()=>{
      let aBuscar = finder.toString().trim()
      if(aBuscar !== ""){
        const result = pokemons.filter((item)=>(
          item.name.toString().includes(aBuscar)));
        if(result.length !== 0){
          errors && setErrors(false)
          setListaAux(result);
        }else{
          setListaAux([]);
          setErrors(true);
        }
      }
      console.log(finder)
    },[finder]);

    let estilo = { backgroundColor: "blue"};

    
  return <>
    <Card>
      <CardContent>
        <TextField 
          id="outlined-basic" 
          error={errors}
          helperText={errors ? "hay error" : null} 
          label="Outlined" 
          variant="outlined" 
          value={finder} 
          placeholder={"Busca tu pokemon"} 
          onChange={handleInputChange} />
        <br />
        <Grid container spacing={2}>
          <Grid item md={6}>
            {pokemons.map((element, index) => (
              <PokeItem pokemon = {element} key={element.name}></PokeItem>
            ))}
          </Grid>
          <Grid item md={3}>
              {finder &&
                listaAux.map((element, index) => (
                  <PokeItem pokemon = {element} key={element.name} funcion = {stack} estilo = {estilo} ></PokeItem>
                ))}
          </Grid>
          <Grid item md = {3}>
                {finder &&
                  listadoSelected.map((element, index) => (
                    <PokeItem pokemon = {element} key={element.name} funcion = {stack} estilo = {estilo} ></PokeItem>    
                  ))}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  </>
};

export default PokeList;