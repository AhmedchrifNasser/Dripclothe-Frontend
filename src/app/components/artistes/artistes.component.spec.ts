import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistesComponent } from './artistes.component';

describe('ArtistesComponent', () => {
  let component: ArtistesComponent;
  let fixture: ComponentFixture<ArtistesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtistesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
