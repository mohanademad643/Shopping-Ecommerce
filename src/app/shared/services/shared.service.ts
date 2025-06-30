import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/Models/Contact';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private http = inject(HttpClient);

  sendContactForm(data:Contact):Observable<Contact>{
  return this.http.post<Contact>(`${environment.apiBaseUrl}/ContactData`,data);
  }


}
