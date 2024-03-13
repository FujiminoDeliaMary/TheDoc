const filter = {

     getAllNames : async() => {
        try {
            const response = await fetch('http://localhost:1337/api/patients?fields=firstname&fields=lastname&fields=id');

            if (!response.ok){
                throw new Error('Erreur lors de la récupération des noms');
            }
            const responseData = await response.json();
            return responseData;
        }catch (error) {
            
            console.error('Error modifying patient:', error.message);
            throw error;
        }
    },

    getAllVisitsOfToday : async() => {

        const startDate = new Date();
        startDate.setHours(0, 0, 0, 0); // Réglez l'heure à 00:00:00:000

        // Obtenir la date d'aujourd'hui à 23h59
        const endDate = new Date();
        endDate.setHours(23, 59, 59, 999); // Réglez l'heure à 23:59:59:999

        console.log(startDate); // Affiche la date d'aujourd'hui à minuit
        console.log(endDate.toISOString());

    
        try{    
            const response = await fetch(`http://localhost:1337/api/visits?filters[date][$gte]=${startDate.toISOString()}&filters[date][$lte]=${endDate.toISOString()}&populate=*`);

            if (!response.ok){
                throw new Error('Erreur lors de la récupérations des visites')
            }
            const responseData = await response.json();
            return responseData;
        }catch(error) {
            console.error('Erreur lors de la récupération des Visites', error.message)
            throw error;
        }
    },

    getAllDates : async() => {
        try{
            const response = await fetch(`http://localhost:1337/api/visits?fields=date`);

            if (!response.ok){
                throw new Error('Erreur :')
            }
            const responseData = await response.json();
            return responseData;
        }catch(error) {
            console.error('Erreur lors de la récupération des dates', error.message)
            throw error;
        }
    },

    getPatientsByBloodGroup : async(bloodgroup) => {
        try{
            console.log(bloodgroup);
            const response = await fetch(`http://localhost:1337/api/patients?filters[bloodgroup][$eq]=${bloodgroup}`)
            if (!response.ok){
                throw new Error('Erreur :')
            }
            const responseData = await response.json();
            console.log(responseData)
            return responseData;
           
        }catch(error) {
            console.error('Erreur lors de la récupération des Patients', error.message)
            throw error;
        }
    },

    getLastPatients : async() => {
        
        const startDate = new Date();
        const today = startDate.toISOString()

   
        try{
            const response = await fetch(`http://localhost:1337/api/visits?filters[date][$lte]=${today}&populate=*`);
            if (!response.ok){
                throw new Error('Erreur')
            }
            const visitsData = await response.json();
            console.log(visitsData)
            return visitsData.data.sort((a, b) => a.attributes.date - b.attributes.date).slice(0,7);
        }catch(error) {
            console.error('Erreur lors de la récupération des Patients', error.message)
            throw error;
        }
    }
    // getAllVisitsofOneDate : async() => {

    // }
}

export default filter