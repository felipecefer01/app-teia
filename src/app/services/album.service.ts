import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Album } from '../models/album';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  url = 'https://jsonplaceholder.typicode.com/photos'; // api rest 

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Obtem todos os albumros
  getAlbuns(): Observable<Album[]> {
    return this.httpClient.get<Album[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem um albumro pelo id
  getAlbumById(id: number): Observable<Album> {
    return this.httpClient.get<Album>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva um albumro
  saveAlbum(album: Album): Observable<Album> {
    return this.httpClient.post<Album>(this.url, JSON.stringify(album), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // utualiza um albumro
  updateAlbum(album: Album): Observable<Album> {
    return this.httpClient.put<Album>(this.url + '/' + album.id, JSON.stringify(album), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
 
  // deleta um albumro
  deleteAlbum(album: Album) {
    return this.httpClient.delete<Album>(this.url + '/' + album.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}