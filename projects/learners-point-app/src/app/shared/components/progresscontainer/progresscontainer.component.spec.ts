import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgresscontainerComponent } from './progresscontainer.component';

describe('ProgresscontainerComponent', () => {
  let component: ProgresscontainerComponent;
  let fixture: ComponentFixture<ProgresscontainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgresscontainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgresscontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
