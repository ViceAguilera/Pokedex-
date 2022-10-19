import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import React from 'react';

const PokeItem = ({pokemon, estilo = null, funcion = null}) => {
    //return (<div>{pokemon.name}</div>)
    return(
      <Card sx={{estilo}}>
        <CardContent>{pokemon.name}</CardContent>
        <CardActions>
            {funcion && <Button onClick={() => funcion(pokemon)}>Accion</Button>}
        </CardActions>
     </Card>
    )
}

export default PokeItem