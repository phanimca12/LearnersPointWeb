import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Base64ChildContainerComponent } from './base64-child-container.component';

describe('Base64ChildContainerComponent', () => {
  let component: Base64ChildContainerComponent;
  let fixture: ComponentFixture<Base64ChildContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Base64ChildContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Base64ChildContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
