import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from '../../services/album.service';
import { Album } from '../../models/album';


interface Opts{
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.css']
})


export class DetalheComponent implements OnInit {

  carregando = false
  albumId = 0;
  album = {} ;
  albuns: Album[] = [];
  displayedColumns: string[] = ['id','title'];

  selected: string = 'id';
  
  opts: Opts[] = [
    {value: 'id', viewValue: 'ID'},
    {value: 'title', viewValue: 'Título'},
    {value: 'url', viewValue: 'Nome Cor'},
  ];


  constructor(private route: ActivatedRoute, 
    private albumservice: AlbumService, 
    private dialog: MatDialog) {
    this.route.params.subscribe(res => this.albumId = res.albumId);
  }

  ngOnInit() {
    this.getAlbuns();

    }

  // Chama o serviço para obtém todos os albumros
  getAlbuns() {
    this.carregando = true
    this.albumservice.getAlbuns().subscribe((albuns: Album[]) => {
      this.albuns = albuns.filter(e => e.albumId == this.albumId);
      console.log(this.albumId,this.albuns)
      this.carregando = false
    });
  }

  openDialog(id: any) {
    console.log(id)
    this.dialog.open(DialogImagemGrande, {
      data: {
        album: id
      }
    });
  }

  ordenacao(e: any){
    console.log(e)
    let al = this.albuns
    console.log((al))
    if (e == 'title') {
      al = al.sort((a,b) => (a['title'] > b['title']) ? 1 : ((b['title'] > a['title']) ? -1 : 0))
    } else if (e == 'id') {
      al = al.sort((a,b) => (a['id'] > b['id']) ? 1 : ((b['id'] > a['id']) ? -1 : 0))
    } else if (e == 'url') {
      al = al.sort((a,b) => (a['url'] > b['url']) ? 1 : ((b['url'] > a['url']) ? -1 : 0))
    }
  }
}

@Component({
  selector: 'dialog-imagem-grande',
  templateUrl: 'dialog-imagem-grande.html',
})
export class DialogImagemGrande {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
