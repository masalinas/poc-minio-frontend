import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private baseUrl = 'http://localhost:5001';

  constructor(private http: HttpClient) { }

  upload(files: File[]): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    for (var i = 0; i < files.length; i++) { 
      formData.append("file[]", files[i]);
    }  

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }
}