import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarCodigoComponent } from './validar-codigo.component';

describe('ValidarCodigoComponent', () => {
  let component: ValidarCodigoComponent;
  let fixture: ComponentFixture<ValidarCodigoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidarCodigoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValidarCodigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
