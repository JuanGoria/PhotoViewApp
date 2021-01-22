import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PicturesPage, Picture } from './../../model';
import { environment } from './../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly baseUrl = environment.api.url;

  constructor(private http: HttpClient) { }

  public getImagesCollection(pageNumber: string): Observable<PicturesPage> {
    let params = new HttpParams();
    params = params.append('page', pageNumber);

    return this.http.get<PicturesPage>(`${this.baseUrl}/images`, { params: params });
  }

  public getImage(id: string): Observable<Picture> {
    return this.http.get<Picture>(`${this.baseUrl}/images/${id}`);
  }
}
