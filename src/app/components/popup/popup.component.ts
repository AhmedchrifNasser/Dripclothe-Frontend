import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit{
  message!: string;
  success = false;

  constructor(@Inject(MAT_DIALOG_DATA) data: any) {
    this.message = data.message;
    this.success = data.success;
  }

  ngOnInit(): void {

  }


}
