import { HttpClient } from '@angular/common/http';
import { I18nInlinerOptions } from './../../../../node_modules/@angular/build/src/tools/esbuild/i18n-inliner.d';
import { Component, Injectable } from '@angular/core';
import { map } from 'rxjs';
export interface Store{
  ID:string;
  Name:string;
  Website:string;
  LogoUrl:string;

}
@Component({
  selector: 'app-stores-service',
  imports: [],
  templateUrl: './stores-service.html',
  styleUrl: './stores-service.css',
})
@Injectable({
  providedIn: 'root'
})
export class StoresService {
  private jsonUrl: string = 'assets/Stores.json';
  constructor(private http: HttpClient) {}
  getStores() {
    return this.http.get<Store[]>(this.jsonUrl);
  }
  getStorebyID(id:string) {
    return this.http.get<Store[]>(this.jsonUrl).pipe(
      map(stores => stores.find(store => store.ID === id))
    );
  }
}
