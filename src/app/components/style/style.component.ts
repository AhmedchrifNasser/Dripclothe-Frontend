import {Component, OnInit} from '@angular/core';
import {Style} from "../../models/style";
import {StyleService} from "../../services/style.service";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-style',
  templateUrl: './style.component.html',
  styleUrls: ['./style.component.css']
})
export class StyleComponent implements OnInit{
  artisteId!: number;
  styles!: Style[];
  constructor(private styleService:StyleService,
              private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.artisteId = +params.get('artisteId')!;
    })
    this.listArtisteStyles();
  }
  listArtisteStyles(){
    this.styleService.getStylesByArtiste(this.artisteId).subscribe(
      (res)=> {
        this.styles = res;
        this.styles.sort((a,b) => b.styleIdByArtiste - a.styleIdByArtiste)
        console.log(this.styles)
      }
    )
  }
}
