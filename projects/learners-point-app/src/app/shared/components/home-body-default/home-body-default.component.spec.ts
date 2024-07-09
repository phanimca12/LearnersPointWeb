import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBodyDefaultComponent } from './home-body-default.component';

describe('HomeBodyDefaultComponent', () => {
  let component: HomeBodyDefaultComponent;
  let fixture: ComponentFixture<HomeBodyDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeBodyDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBodyDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
