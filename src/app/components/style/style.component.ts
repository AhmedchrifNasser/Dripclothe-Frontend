import {Component, OnInit} from '@angular/core';
import {Style} from "../../models/style";
import {StyleService} from "../../services/style.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Meta,Title} from "@angular/platform-browser";
import { Location } from '@angular/common';
import {StyleCachService} from "../../services/style-cach.service";

@Component({
  selector: 'app-style',
  templateUrl: './style.component.html',
  styleUrls: ['./style.component.css']
})
export class StyleComponent implements OnInit{
  artisteId!: number;
  styles: Style[] = [];
  artisteName!: String;
  currentPage = 0;
  pageSize = 10;
  totalPages = 0;

  constructor(private styleService:StyleService,
              private route: ActivatedRoute,
              private metaTagService: Meta,
              private styleCacheService: StyleCachService,
              private titleService: Title) {
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.titleService.setTitle("DripClothe - " + params.get('artisteName')! + " styles");
      this.metaTagService.updateTag({
        name: 'description',
        content: `${params.get('artisteName') ? params.get('artisteName') + "'s" : 'Explore'} trending clothing styles. Discover low-cost matches for celebrity outfits, updated for 2024. Dress like a star without the high price tag.`
      });
      this.artisteId = +params.get('artisteId')!;
      this.artisteName = params.get('artisteName')!;
    })
    this.loadArtistesStyles(this.currentPage);
  }
  listArtisteStyles(){
    this.styleService.getStylesByArtiste(this.artisteId).subscribe(
      (res)=> {
        this.styles = res;
        this.styles.sort((a,b) => b.styleIdByArtiste - a.styleIdByArtiste)
      }
    )
  }
  loadArtistesStyles(page: number): void {
    this.styleCacheService.getData('style',this.artisteId, page, this.pageSize).subscribe(
      (data) => {
        this.styles = data.content;
        this.styles.sort((a,b) => b.styleIdByArtiste - a.styleIdByArtiste)
        this.totalPages = data.totalPages;
        this.currentPage = page;
      },
      (error) => {
        console.error('Failed to load users', error);
      }
    );
  }
  goToPage(page: number): void {
    this.loadArtistesStyles(page);
  }
}
