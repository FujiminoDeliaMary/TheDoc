
const api = {

    patientsList : async() => {

        try {
            
            return await fetch('http://localhost:1337/api/patients')
                        .then(response => {
                            if (!response.ok){
                                throw new Error('Erreur détectée')
                            }
                            return response.json()
                        })
                        .then(data => {return data
                                        
                                        })
                        .catch(error => console.error(error))
        }
        catch(error){
            console.log(error);
            throw error;
        }
        
    }
   
}       

export default api;
