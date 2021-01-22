import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicturesModalComponent } from './pictures-modal.component';

describe('PicturesModalComponent', () => {
  let component: PicturesModalComponent;
  let fixture: ComponentFixture<PicturesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PicturesModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PicturesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
