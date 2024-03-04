<script setup>


</script>

<template>
          <nav className="nav">
            <ul class="nav__list">
               
                    <li>
                        <RouterLink to="/dashboard">
                            <div className="name">
                                <p><img src="../assets/images/health.png" alt=""></p>
                                <h1 >ledoc</h1>
                            </div>
                        </RouterLink>
                    </li>
              
         
                    <li>
                        <RouterLink  to="/dashboard">
                            <p>
                                <img src="../assets/images/dashboardIcon.svg" alt=""/>
                            </p>
                        </RouterLink>
                    </li>
               
           
                    <li>
                        <RouterLink  to="/patients">
                            <p>
                                <img src="../assets/images/patientsIcon.svg" alt=""/>
                            </p>
                         </RouterLink>
                    </li>
       
              
                    <li>
                        <RouterLink to="/visits">
                            <p>
                                <img src="../assets/images/visitsIcon.svg" alt=""/>
                            </p>
                        </RouterLink>
                    </li>
            
  
                    <li class="nav__setting">
                        <div class="flex flex-col gap-3 self-end">
                            <p><img src="../assets/images/paramIcon.svg" alt="Paramètres"/></p>
                            <p><img src="../assets/images/Turn off.svg" alt="Se déconnecter"></p>
                        </div>
                        
                    </li>
        
            </ul>
        </nav>
</template>