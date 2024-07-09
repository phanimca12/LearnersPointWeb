import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateObjectBaseComponent } from './generate-object-base.component';

describe('GenerateObjectBaseComponent', () => {
  let component: GenerateObjectBaseComponent;
  let fixture: ComponentFixture<GenerateObjectBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateObjectBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateObjectBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
