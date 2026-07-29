import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactRequest, ContactResponse } from '../models/contact.model';

const CONTACT_API_URL = 'http://localhost:8080/api/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly http = inject(HttpClient);

  sendMessage(request: ContactRequest): Observable<ContactResponse> {
    return this.http.post<ContactResponse>(CONTACT_API_URL, request);
  }
}
