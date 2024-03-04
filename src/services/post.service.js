const apiPost = {
    postDocument: async (files) => {
        try {
            const formData = new FormData();
       
                formData.append('files', files);
            
            const response = await fetch('http://localhost:1337/api/upload', {
                method: "POST",
                body: formData, 
            });

            const data = await response.json();
            console.log('id du doc', data)
            return data;

        } catch (error) {
            console.error("Erreur lors de l'envoi du fichier:", error);
            throw error; 
        }
    },

    postTreatments : async(id, medocs) => {
        try{
            fetch(`http://localhost:1337/api/patient/${id}`, {
                method: "PATCH",
                body:{
                    treatments : medocs
                }
            })
                .then(response => response.json())
                .then(data => {return data})
                .catch(error => console.error(error))
        }   
        catch(error){
            console.error(error)
            throw new error;
        }
    },

    postPatient : async(form) => {
        try{
            fetch('http://localhost:1337/api/patients', {
                method:"POST",
                body: JSON.stringify(form),
                headers:{
                    "Content-Type": "application/json",
                }
            })
                .then(response => {
                    if(!response.ok){
                        throw new Error('Err')
                    }
                })
                .then(data => {return data})
        }catch(error){
            throw new error;
        }
    },
    ModifierPatient : async (id, form) => {
        try {
            const response = await fetch(`http://localhost:1337/api/patients/${id}`, {
                method: "PUT",
                body: JSON.stringify(form),
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            if (!response.ok) {
                throw new Error(`Erreur lors de la modification du patient : ${response.statusText}`);
            }
    
            const responseData = await response.json();
            return responseData; 
        } catch (error) {
            
            console.error('Error modifying patient:', error.message);
            throw error;
        }
    },

    postVisit : async(form) => {
     

        try{
            fetch('http://localhost:1337/api/visits', {
                method:"POST",
                body: JSON.stringify(form),
                headers:{
                    "Content-Type": "application/json",
                }
            })
                .then(response => {
                    if(!response.ok){
                        throw new Error('Erreur lors de l\'ajout de la visite')
                    }
                })
                .then(data => {return data})
        }catch(error){
            console.error('Error adding Visit:', error.message);
            throw error;
        }
    }
}

export default apiPost;
