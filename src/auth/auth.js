import { useNavigate } from 'react-router-dom';

export default function auth({logged}){

    const navigate = useNavigate();
    const toNextScreen = ()=>{
        if(logged){
            navigate('/InputScreen');
        }
        else{
            navigate('/login');
        }
toNextScreen(); 
    }
}