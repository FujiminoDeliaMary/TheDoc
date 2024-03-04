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

        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
        const day = String(today.getDate()).padStart(2, '0');
        const dateString = `${year}-${month}-${day}`;
        console.log(dateString)

        try{
            const response = await fetch(`http://localhost:1337/api/visits?filters[date][$gt]=2024-03-04`);

            if (!response.ok){
                throw new Error('Erreur lors de la récupérations des visites')
            }
            const responseData = await response.json();
            return responseData;
        }catch(error) {
            console.error('Erreur lors de la récupération des patients', error.message)
            throw error;
        }
    }
}

export default filter