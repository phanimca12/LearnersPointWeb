import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ListContainerComponent } from './list-container.component';

describe('ListContainerComponent', () => {
  let component: ListContainerComponent;
  let fixture: ComponentFixture<ListContainerComponent>;
  let store: MockStore;

  const cdRefSpy = jasmine.createSpyObj('cdRef', ['detectChanges']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ],
      declarations: [
        ListContainerComponent
      ],
      providers: [
        {
          provide: ChangeDetectorRef,
          useValue: cdRefSpy,
        },
        provideMockStore({
          initialState: {}
        }),
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#onScroll', () => {
    it('should emit scroll end', () => {
      spyOn(component.scrollEnd, 'emit');
      component.onScroll();
      expect(component.scrollEnd.emit).toHaveBeenCalled();
    });
  });

  describe('#onResize', () => {
    it('should resize based off of scroll or offset height', () => {
      spyOn(component.scrollEnd, 'emit');
      component.onResize();
      expect(component.scrollEnd.emit).toHaveBeenCalled();
      expect(component.isScrollbarVisible).toBeFalsy();
    });
  });

  describe('#resetScroll', () => {
    it('should reset scroll', () => {
      component.resetScroll();
      expect(component.listContainerEl.nativeElement.scrollTop).toEqual(0);
    });
  });
});