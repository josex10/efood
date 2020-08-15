import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LoginComponent } from './paginas/login/login.component';
import { InicioComponent } from './paginas/inicio/inicio.component';

import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { DetalleProductoComponent } from './components/detalle-producto/detalle-producto.component';
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';
import { CargandoComponent } from './components/cargando/cargando.component';
import { VerCarritoComponent } from './components/ver-carrito/ver-carrito.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { ModoDePagoComponent } from './components/modo-de-pago/modo-de-pago.component';
import { TarjetaComponent } from './components/tarjeta/tarjeta.component';
import { ChequeComponent } from './components/cheque/cheque.component';
import { ResumenComponent } from './components/resumen/resumen.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'inicio', component: InicioComponent,
    children: [
      {path: '', component: BienvenidaComponent},
      {path: 'productoDetalle', component: DetalleProductoComponent},
      {path: 'productoLista', component: ListaProductosComponent},
      {path: 'cargando', component: CargandoComponent},
      {path: 'verCarrito', component: VerCarritoComponent},
      {path: 'cliente', component: ClienteComponent},
      {path: 'modoDePago', component: ModoDePagoComponent},
      {path: 'tarjeta', component: TarjetaComponent},
      {path: 'cheque', component: ChequeComponent},
      {path: 'resumen', component: ResumenComponent}
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
