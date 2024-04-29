import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneraQrDocumentoComponent } from './genera-qr-documento.component';

describe('GeneraQrDocumentoComponent', () => {
  let component: GeneraQrDocumentoComponent;
  let fixture: ComponentFixture<GeneraQrDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneraQrDocumentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneraQrDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
