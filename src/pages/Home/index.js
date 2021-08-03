import React, {useState, useEffect} from 'react';
import { SearchArea,PageArea } from './styled';

import useApi from '../../helpers/OlxAPI';

import AdItem from '../../components/partials/AdItem';
import { PageContainer} from '../../components/MainComponents';
import { Link } from 'react-router-dom';

const Page = ()=>{
    const api = useApi();

    const [stateList, setStateList] = useState([]);
    const [categories, setCategories] = useState([]);
    const[adList, setAdList] = useState([]);

    //pega os estados cadastrados na api
    useEffect(()=>{
        const getStates = async () => {
            const slist = await api.getState();
            setStateList(slist);
            
        }
        getStates();
    }, []);

    //pega as categorias
    useEffect(()=>{
        const getCategories = async () => {
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    }, []);

    //anuncios recentes
    useEffect(()=>{
        const getRecentAds = async () => {
            const json = await api.getAds({
                sort:'desc',
                limit:8
            });
            setAdList(json.ads);
        }
        getRecentAds();
    }, []);

    return(
        <>
        <SearchArea>
            <PageContainer>
                <div className="searchBox">
                    <form method="GET" action="/ads">
                        <input type="text" name="q" placeholder="O que você procura?"/>
                        <select name="state">
                            {stateList.map((i,k) =>
                            <option key={k} value={i.name}>{i.name}</option>
                            )}
                        </select>
                        <button>Pesquisar</button>
                    </form>
                </div>
                <div className="categoryList">
                        {categories.map((i,k)=>
                            <Link key={k} to={`/ads?cat=${i.slug}`} className="categoryItem">
                                <img src={i.img} alt="" />
                                <span>{i.name}</span>
                            </Link>    
                        )} 
                </div>
            </PageContainer>
        </SearchArea>
        <PageContainer>
            <PageArea>
                    <h2>Anúncios Recentes</h2>
                    <div className="list">
                        {adList.map((i,k)=>
                            <AdItem key={k} data={i}/>
                        )}
                    </div>
                    <Link to="/ads" className="seeAllLink">ver todos</Link>


            </PageArea>
        </PageContainer>
        </>

        
    );
}

export default Page;