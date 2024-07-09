import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XmlConversionMasterComponent } from './xml-conversion-master.component';

describe('XmlConversionMasterComponent', () => {
  let component: XmlConversionMasterComponent;
  let fixture: ComponentFixture<XmlConversionMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XmlConversionMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XmlConversionMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
