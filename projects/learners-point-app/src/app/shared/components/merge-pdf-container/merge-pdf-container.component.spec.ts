import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MergePdfContainerComponent } from './merge-pdf-container.component';

describe('MergePdfContainerComponent', () => {
  let component: MergePdfContainerComponent;
  let fixture: ComponentFixture<MergePdfContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MergePdfContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MergePdfContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
