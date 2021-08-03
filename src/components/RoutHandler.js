import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import { isLogged } from '../helpers/AuthHandler';
// rota personalizada para identificar se o usuario está logado e é uma pagina privada
export default ({children, ...rest})=>{
    let logged = isLogged();
    let authorized = (rest.private && !logged) ? false : true;

    return(

        <Route
            {...rest}
            render={()=>
                authorized  ? children : <Redirect to="/signin"/>
            }
        />
    );
}