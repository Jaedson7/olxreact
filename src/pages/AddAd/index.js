import React, {useState,useRef, useEffect} from 'react';
import { PageArea } from './styled';
import useApi from '../../helpers/OlxAPI';
//lembrar de dar install em react text-mask e react-mask-addons
import MaskedInput from 'react-text-mask';
import { createNumberMask } from 'text-mask-addons/dist/createNumberMask';

import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents';

const Page = ()=>{
    const api = useApi();

    const fileField = useRef();

    const [categories,setCategories] = useState([]);

    const [title, setTitle] = useState('');
    const[category, setCategory] = useState('');
    const[price, setPrice] = useState('');
    const[priceNegotiable, setPriceNegotiable] = useState(false);
    const[desc,setDesc] = useState('');

    
    const[disabled, setDisabled] = useState(false);
    const [error,setError] = useState('');

    useEffect(()=>{
        const getCategories = async()=>{
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    },[]);

    //desabilita campos ao fazer login
    const handleSubmit = async(e)=>{
        e.preventDefault();

        setDisabled(true);
        setError('');

      /*  //consulta api e verifca se há erro
        const json = await api.login(email,password);

        if(json.error){
            setError(json.error);
        }else{
            doLogin(json.token, rememberPassword); // manda e salva token e remeberpassword 
            window.location.href="/";
        }*/
        setDisabled(false);
    }

    //mascara do preço
   const priceMask = createNumberMask({
        prefix:'R$ ',
        includeThousandsSeparator:true,
        thousandsSeparatorSymbol:'.',
        allowDecimal:true,
        decimalSymbol:','
    });


    return(
        <PageContainer>
            <PageTitle>Postar um anúncio</PageTitle>
            <PageArea>
                
                {error &&
                    <ErrorMessage>{error}</ErrorMessage>
                }
                <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area-title">Titulo</div>
                        <div classNamearea-input>
                            <input type="text" disabled={disabled}
                            value={title}
                            onChange={e=>setTitle(e.target.value)} 
                            required
                            />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area-title">Categoria</div>
                        <div classNamearea-input>
                           <select
                           disabled={disabled}
                           onChange={e=>setCategory(e.target.value)}
                           required
                           >
                               <option></option>
                               {categories && categories.map(i=>
                                <option key={i._id} value={i._id}>{i.name}</option>
                                )}
                           </select>
                        </div>
                    </label>

                    <label className="area">
                        <div className="area-title">Preço</div>
                        <div classNamearea-input>
                           <MaskedInput
                               mask={priceMask}
                               placeholder="R$ "
                               disabled={disabled || priceNegotiable}
                               value={price}
                               onChange={e=>setPrice(e.target.value)}
                           />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area-title">Preço negociavel</div>
                        <div classNamearea-input>
                           <input 
                           type="checkbox"
                           disabled={disabled}
                           checked={priceNegotiable}
                           onChange={e=>setPriceNegotiable(!priceNegotiable)}
                           />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area-title">Descrição</div>
                        <div classNamearea-input>
                           <textarea
                               disabled={disabled}
                               value={desc}
                               onChange={e=>setDesc(e.target.value)}
                           />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area-title">Imagens</div>
                        <div classNamearea-input>
                          <input
                          type="file"
                          disabled={disabled}
                          ref={fileField}
                          multiple
                          />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area-title"></div>
                        <div classNamearea-input>
                            <button disabled={disabled}>Adicionar anúncio</button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>
    );
}

export default Page;