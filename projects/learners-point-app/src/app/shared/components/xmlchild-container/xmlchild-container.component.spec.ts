import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XmlchildContainerComponent } from './xmlchild-container.component';

describe('XmlchildContainerComponent', () => {
  let component: XmlchildContainerComponent;
  let fixture: ComponentFixture<XmlchildContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XmlchildContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XmlchildContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
