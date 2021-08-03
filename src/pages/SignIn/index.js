import React, {useState} from 'react';
import { PageArea } from './styled';
import useApi from '../../helpers/OlxAPI';
import { doLogin } from '../../helpers/AuthHandler';

import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents';

const Page = ()=>{
    const api = useApi();

    const [email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[rememberPassword, setRememberPassword] = useState(false);
    const[disabled, setDisabled] = useState(false);
    const [error,setError] = useState('');

    //desabilita campos ao fazer login
    const handleSubmit = async(e)=>{
        e.preventDefault();

        setDisabled(true);
        setError('');

        //consulta api e verifca se há erro
        const json = await api.login(email,password);

        if(json.error){
            setError(json.error);
        }else{
            doLogin(json.token, rememberPassword); // manda e salva token e remeberpassword 
            window.location.href="/";
        }
        setDisabled(false);
    }

    return(
        <PageContainer>
            <PageTitle>Login</PageTitle>
            <PageArea>
                
                {error &&
                    <ErrorMessage>{error}</ErrorMessage>
                }
                <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area-title">E-mail</div>
                        <div classNamearea-input>
                            <input type="email" disabled={disabled}
                            value={email}
                            onChange={e=>setEmail(e.target.value)} 
                            required
                            />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area-title">Senha</div>
                        <div classNamearea-input>
                            <input type="password" disabled={disabled}
                            value={password}
                            onChange={e=>setPassword(e.target.value)}
                            required
                            />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area-title">lembrar senha</div>
                        <div classNamearea-input>
                            <input type="checkbox" disabled={disabled}
                            checked={rememberPassword}
                            onChange={()=>setRememberPassword(!rememberPassword)}
                            />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area-title"></div>
                        <div classNamearea-input>
                            <button disabled={disabled}>Fazer Login</button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>
    );
}

export default Page;