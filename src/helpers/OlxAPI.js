//lembrar de dar npm install em js cookie e qs
import Cookies from 'js-cookie';
import qs from 'qs';
const BASEAPI = 'http://alunos.b7web.com.br:501';

const apiFetchPost = async (endpoint, body)=>{

    if(!body.token){
        let token = Cookies.get('token');
        if(token){
            body.token = token;
        }
    }

    const res = await fetch(BASEAPI+endpoint, {
        method:'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(body)
    });

    const json = await res.json();

    if(json.notallowed){
        window.location.href ='/signin';
        return;
    }

    return json;
}

const apiFetchGET = async (endpoint, body = [])=>{

    if(!body.token){
        let token = Cookies.get('token');
        if(token){
            body.token = token;
        }
    }

    const res = await fetch(`${BASEAPI+endpoint}?${qs.stringify(body)}`);
       

    const json = await res.json();

    if(json.notallowed){
        window.location.href ='/signin';
        return;
    }

    return json;
}


const OlxAPI = {
    login:async(email, password)=>{
        //fazer consulta ao webservice

        const json = await apiFetchPost(
            '/user/signin',
            {email,password}
        );
        return json;
    },

    //usarios que se cadastram
    register:async( name,email, password, stateLoc)=>{
        const json = await apiFetchPost(
            '/user/signup',
            {name, email, password, state:stateLoc}
        );
        return json;
    },

    //pega os estados
    getState:async()=>{
        const json = await apiFetchGET(
            '/states'
        );
        return json.states;
    },

    getCategories:async () =>{
        const json = await apiFetchGET(
            '/categories'
        );
        return json.categories;
    },
    getAds:async (options) =>{
        const json = await apiFetchGET(
            '/ad/list',
            options
        );
            return json;
    },

    getAd:async (id, other = false) => {
        const json = await apiFetchGET(
            '/ad/item',
            {id, other}
        );
        return json;
    }
};
export default ()=>OlxAPI;