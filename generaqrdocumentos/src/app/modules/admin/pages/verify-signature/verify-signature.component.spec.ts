import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifySignatureComponent } from './verify-signature.component';

describe('VerifySignatureComponent', () => {
  let component: VerifySignatureComponent;
  let fixture: ComponentFixture<VerifySignatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerifySignatureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerifySignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
