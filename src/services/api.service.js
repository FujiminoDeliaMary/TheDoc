
const api = {

    patientsList : () => {

        try {
            
            return  fetch('http://localhost:1337/api/patients')
                        .then(response => {
                            if (!response.ok){
                                throw new Error('Erreur détectée')
                            }
                            return response.json()
                        })
                        .then(data => {return data })
                        .catch(error => console.error(error))
        }
        catch(error){
            console.log(error);
            throw error;
        }
        
    },

    patientInfo : async(id) => {
        try{
            return await fetch(`http://localhost:1337/api/patients/${id}?populate=*`)
                            .then(response => {
                                if (!response.ok){
                                    throw new Error("Erreur, impose de chercher la donnée")
                                }
                                return response.json()
                            })
                            .then(data => {return (data) })
                            .catch(error => console.error(error))

        }
        catch(error){
            console.log(error)
            throw error;
        }
    },

    visitsList: async () => {
        try {
            const response = await fetch('http://localhost:1337/api/visits?populate=*');
            if (!response.ok) {
                throw new Error('Erreur détectée');
            }
            const visitsData = await response.json();
        
            const visitsWithPatientInfo = await Promise.all(visitsData.data.map(async (visit) => {
              
                const patientResponse = await fetch(`http://localhost:1337/api/patients/${visit.attributes.patient.data.id}?populate=*`);
                if (!patientResponse.ok) {
                    throw new Error('Erreur lors de la récupération des informations du patient');
                }
                const patientData = await patientResponse.json();
                return {
                    ...visit,
                    patient: patientData
                };
            }));
            return visitsWithPatientInfo;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

   

export default api;

