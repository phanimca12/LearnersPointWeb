import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateObjectChildComponent } from './generate-object-child.component';

describe('GenerateObjectChildComponent', () => {
  let component: GenerateObjectChildComponent;
  let fixture: ComponentFixture<GenerateObjectChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateObjectChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateObjectChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
