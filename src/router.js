import { createRouter, createWebHashHistory } from "vue-router"
import DashboardPageVue from "./Pages/DashboardPage.vue"
import PatientsPageVue from "./Pages/PatientsPage.vue"
import PatientPage from './components/PatientVue.vue'
import CreatePatientVue from "./Pages/CreatePatient.vue"
import EditPatientVue from "./Pages/EditPatient.vue"
import VisitsPageVue from "./Pages/VisitsPage.vue"
import AuthPageVue from "./Pages/AuphPage.vue"
import authService from './services/auth.service'


export const router = createRouter({
	history: createWebHashHistory(),
    routes: [
        {
        path: '/dashboard',
        alias: '/dashboard',
        name: 'dashboard',
        beforeEnter: (to, from) => {
            if (!authService.isAuthenticated()) {
                return { name: 'auth' }
            }
          },
        component: DashboardPageVue
        },
        {
            path: '/patients',
            name: 'patients',
            beforeEnter: (to, from) => {
                if (!authService.isAuthenticated()) {
                    return { name: 'auth' }
                }
              },
            component: PatientsPageVue
        },
        {
            path: '/patient/:id',
            name: 'patient',
            beforeEnter: (to, from) => {
                if (!authService.isAuthenticated()) {
                    return { name: 'auth' }
                }
              },
            component: PatientPage
        },
        {
            path: '/createPatient',
            name: 'createPatient',
            beforeEnter: (to, from) => {
                if (!authService.isAuthenticated()) {
                    return { name: 'login' }
                }
              },
            component: CreatePatientVue
        },
        {
            path: '/editPatient/:id',
            name: 'editPatient',
            beforeEnter: (to, from) => {
                if (!authService.isAuthenticated()) {
                    return { name: 'login' }
                }
              },
            component: EditPatientVue
        }, 
        {
            path: '/visits',
            name: 'visits', 
            beforeEnter: (to, from) => {
                if (!authService.isAuthenticated()) {
                    return { name: 'login' }
                }
              },
            component: VisitsPageVue
        },
        {
            path: '/',
            name: 'auth',
            component: AuthPageVue
        }
    ]
})




