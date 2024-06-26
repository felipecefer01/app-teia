import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetalheComponent } from './pages/detalhe/detalhe.component';

const routes: Routes = [
  { path: '', 
    redirectTo: '/home', 
    pathMatch: 'full' 
  },
  { path: 'home', 
    component: HomeComponent ,
  },
  { path: 'fotos/:albumId', 
    component: DetalheComponent ,
    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration:'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
