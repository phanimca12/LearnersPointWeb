import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IHomeData } from '../../shared/interfaces/IHome';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getHomeListData() {
    return this.http.get<any>('/assets/home-listing.json')
    .toPromise()
    .then(res => <IHomeData[]>res.data)
    .then(data => { return data; });
}
fetchFile(): Observable<ArrayBuffer> {
   return this.http.get('app/assets/pspdfkit-lib/pspdfkit-68526ef07af7fd58.wasm', { responseType: 'arraybuffer' });
}

}
