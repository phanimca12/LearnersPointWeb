import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatterchildComponent } from './formatterchild.component';

describe('FormatterchildComponent', () => {
  let component: FormatterchildComponent;
  let fixture: ComponentFixture<FormatterchildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormatterchildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatterchildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
