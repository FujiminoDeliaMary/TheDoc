export function formatDate (dateS) {
    const date = new Date(dateS);
    const day = date.getDate();
    const month = date.getMonth() + 1; 
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

// export const handleSort = (sort, elements) => {
//     if(sort.value === 'maison'){
//         elements.value = elements.value.sort((a, b) => {
//         return new Date(a.attributes.createdAt) - new Date(b.attributes.createdAt);
//         });
//     }else {
//         patients.value = patients.value.sort((a, b) => {
//         return a.attributes.firstname.localeCompare(b.attributes.firstname)
//         });
//     }
// }