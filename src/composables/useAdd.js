import apiPost from "@/services/post.service"


export async function addtreatment(treatment, patientTemplate, id){
    try{
        const newTreatment = {...treatment.value};
        patientTemplate.value.data.treatments.push(newTreatment);
        await apiPost.ModifierPatient(id, patientTemplate.value);
    } catch(error){
        console.error(error)
        throw error; // Ou console.error pour le debug sans interrompre l'exécution
    }
}


export function addFile(documents, patient, showModalDocument, id){
    apiPost.postDocument(documents.value[0])
        .then((response) => {
            showModalDocument.value = false; 
            console.log('Document soumis avec succès');
  
            patient.value.data.documents.push(response[0].id);
            apiPost.ModifierPatient(id, patient.value);
            console.log('patients avec le doc ', patient)
        })
        .catch(error => {
            console.error('Erreur lors de la soumission du document:', error);
        });
}