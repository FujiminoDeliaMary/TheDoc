import { createRouter, createWebHashHistory } from "vue-router"
import DashboardPageVue from "./Pages/DashboardPage.vue"
import PatientsPageVue from "./Pages/PatientsPage.vue"
import PatientPage from './components/PatientVue.vue'
import CreatePatientVue from "./Pages/CreatePatient.vue"
import EditPatientVue from "./Pages/EditPatient.vue"
import VisitsPageVue from "./Pages/VisitsPage.vue"


export const router = createRouter({
	history: createWebHashHistory(),
    routes: [
        {
        path: '/',
        alias: '/dashboard',
        name: 'dashboard',
        component: DashboardPageVue
        },
        {
            path: '/patients',
            name: 'patients',
            component: PatientsPageVue
        },
        {
            path: '/patient/:id',
            name: 'patient',
            component: PatientPage
        },
        {
            path: '/createPatient',
            name: 'createPatient',
            component: CreatePatientVue
        },
        {
            path: '/editPatient/:id',
            name: 'editPatient',
            component: EditPatientVue
        }, 
        {
            path: '/visits',
            name: 'visits', 
            component: VisitsPageVue
        }
    ]
})




