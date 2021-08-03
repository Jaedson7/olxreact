//Identifica se usuario está logado e faz autenticação
import Cookies from 'js-cookie';

export const isLogged =()=>{
    let token = Cookies.get('token');
    return (token) ? true : false;
}

//fazer login
export const doLogin = (token, rememberPassword = false)=>{
    if(rememberPassword){
        Cookies.set('token', token, {expires: 999});
    }else{
        Cookies.set('token', token);
    }
}

//logout
export const doLogout= ()=>{
    Cookies.remove('token');
}