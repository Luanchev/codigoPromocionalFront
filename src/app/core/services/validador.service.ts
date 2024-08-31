import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidadorService {
  baseApi: string = "http://localhost:8080/api/v1";

  constructor(private http: HttpClient) { }

  // Consulta y relaciona información de código y correo.
  validateData(data: {email: string; codigo: string;}) {
    return this.http.post<any>(`${this.baseApi}/codigopromocional/asignarCodigo`, data);
  }
}
