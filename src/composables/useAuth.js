import authService from "@/services/auth.service";
import { ref } from "vue";
import { useRouter } from "vue-router";


export default function useAuth(form){

    const isAuthenticated =  ref(authService.isAuthenticated());
    console.log('auth');
    console.log(isAuthenticated);
    const login = async() =>{
        try {
            console.log('try')
            const response = await authService.login(form)
            const token = response.jwt
            localStorage.setItem('token', token);
        isAuthenticated.value=true;
        useRouter.push({name:'dashboard'})
        } catch(error) {
                console.error('authentification échouée');
                throw error;
        }
    }

    const logout = () => {
        localStorage.clear();
    };

    const signUp = async() => {
        try {
            console.log('try')
            const response = await authService.signUp(form)
            const token = response.jwt
            localStorage.setItem('token', token);
        isAuthenticated.value=true;
        } catch(error) {
                console.error('authentification échouée');
                throw error;
        }
    }

    return  {
        isAuthenticated,
        login,
        signUp,
        logout
    }
}
