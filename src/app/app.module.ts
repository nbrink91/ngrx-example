import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { formReducer } from './form/form.reducer';
import { environment } from 'src/environments/environment';
import { localStorageSync } from 'ngrx-store-localstorage';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { RouteSerializer } from './route-serializer';


export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: ['form'], rehydrate: true})(reducer);
}

export const metaReducers: MetaReducer<any>[] = [localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FormComponent,
  ],
  imports: [
    MatInputModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatSelectModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      form: formReducer,
      router: routerReducer,
    }, {metaReducers}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    StoreRouterConnectingModule.forRoot({
      serializer: RouteSerializer
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
