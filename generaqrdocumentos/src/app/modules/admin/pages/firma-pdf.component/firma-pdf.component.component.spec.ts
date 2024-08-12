import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmaPdfComponentComponent } from './firma-pdf.component.component';

describe('FirmaPdfComponentComponent', () => {
  let component: FirmaPdfComponentComponent;
  let fixture: ComponentFixture<FirmaPdfComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FirmaPdfComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FirmaPdfComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
