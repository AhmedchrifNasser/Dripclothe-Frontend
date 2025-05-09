import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ShopValidators} from "../../validators/shop-validators";
import {PopupComponent} from "../popup/popup.component";
import {MatDialog} from "@angular/material/dialog";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{
  contactFormGroup!: FormGroup;
  typoIncorrect = false;

  constructor(private formBuilder: FormBuilder,
              private dialogRef : MatDialog,
              private titleService: Title) {
  }
  ngOnInit(): void {
    this.titleService.setTitle("DripClothe - Contact");
    this.contactFormGroup = this.formBuilder.group({
      email: new FormControl('',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      message: new FormControl("", [Validators.required, Validators.minLength(2),ShopValidators.notOnlyWhiteSpace]),
    });
  }
  get email(){return this.contactFormGroup.get('email');}
  get message(){return this.contactFormGroup.get('message');}

  openDialog(msg: string,success: boolean){
    this.dialogRef.open(PopupComponent,{
      data: {
        message : msg,
        success : success
      }
    });
  }

  submitContact() {
    if(this.contactFormGroup.invalid){
      this.contactFormGroup.markAllAsTouched();
      this.typoIncorrect = true;
    } else {
      this.openDialog('Your mail has been received.',true);
      return;
    }
  }
}
