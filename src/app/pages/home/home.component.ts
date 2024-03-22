import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../../services/album.service';
import { Album } from '../../models/album';
import { Router } from '@angular/router';

import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'home-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  carregando = false
  album = {} ;
  albuns: Album[] = [];
  albunsMostrar: Album[] = [];
  pageLength = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
 
  // MatPaginator Output
  pageEvent: PageEvent = new PageEvent;
  

  constructor(private albumservice: AlbumService, private router:Router) {}
  
  ngOnInit() {
    this.getAlbuns();
  }
  
  // Chama o serviço para obtém todos os albuns
  getAlbuns() {
    this.carregando = true
    this.albumservice.getAlbuns().subscribe((albuns: Album[]) => {
      //this.albuns = albuns;
      this.albuns = albuns.filter((value, index, self) =>
        index === self.findIndex((t) => (
          t.albumId === value.albumId
          )) 
      )

      console.log(this.albuns)
      this.albunsMostrar = this.albuns.slice(0,10);
      this.pageLength = this.albuns.length; 
      this.carregando = false

    });
  }
  
  //muda de página
  navigate(id: number){
    this.router.navigate(["/fotos/"+id])
  }
  
  
  //comportamento da paginação
  pageChangeEvent(event: any) {
    console.log(event)
    
    let anterior = 0 
    let posterior = 0
    
    anterior = (event.pageIndex) * event.pageSize 
    posterior = anterior + event.pageSize

    this.albunsMostrar = this.albuns.slice(anterior, posterior);
  }

  //comportamento da paginação
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  curtir(album:any){

    console.log(album)
    let idx = this.albuns.indexOf(album);
    console.log(idx)
    this.albuns[idx].curtido = !this.albuns[idx].curtido
    //console.log(this.albuns)
  }

} 