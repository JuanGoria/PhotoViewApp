import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api';
import { Picture, PicturesPage } from '../../model';

@Injectable({
  providedIn: 'root'
})
export class PicturesService {

  constructor(private apiService: ApiService) { }


  public getImagesCollection(pageNumber: string): Observable<PicturesPage> {
    return this.apiService.getImagesCollection(pageNumber);
  }

  public getImage(id: string): Observable<Picture> {
    return this.apiService.getImage(id);
  }
}
