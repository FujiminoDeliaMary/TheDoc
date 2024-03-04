


const authService = {
    
    login : async(form) => {
        try{
            
            return await fetch('http://localhost:1337/api/auth/local', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form.value),
            })
                .then(response=>response.json())
                .then(data => 
                    {
                        return data
                    })
                .catch(error => console.error(error))

        }catch(error){
            console.error(error);
            throw error;
        }
    },

    signUp : async(form) => {
        try{
            
            return await fetch('http://localhost:1337/api/auth/local/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form.value),
            })
                .then(response=>response.json())
                .then(data => 
                    {
                        return data
                    })
                .catch(error => console.error(error))

        }catch(error){
            console.error(error);
            throw error;
        }
    },

     isAuthenticated : ()=>{
        return !!localStorage.getItem('token');
    }

 
}

export default authService;