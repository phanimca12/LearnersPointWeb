import {
  TestBed,
  async,
  ComponentFixture,
  waitForAsync,
} from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';
import { AwdSessionService } from '@awd-ng-lib/session';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let store: MockStore;

  const awdSessionServiceSpy = jasmine.createSpyObj('awdSessionService', [
    'redirectToLogin'
  ])

  const errorServiceSpy = jasmine.createSpyObj('errorService', [
    'openError'
  ])

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, TranslateModule.forRoot()],
        declarations: [AppComponent],
        providers: [
          {
            provide: AwdSessionService,
            useValue: awdSessionServiceSpy
          },

          {
            provide: AppComponent,
            useValue: errorServiceSpy
          },
          provideMockStore({
            initialState: {},
          }),
        ],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
      store = TestBed.inject(MockStore);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('initial values', ()=> {
    it ('checking for loading values', ()=> {
      expect(component.action).toBeNull();
      expect(component.isMenuExpanded).toBeTrue();
    })
  });

  describe('menu action', ()=> {
    it ('check with null values', ()=> {
      component.action = 'test';
      component.onMenuAction (null);
      expect(component.action).toBeNull();
    });

    it ('when passed values are not null', ()=> {
      component.action = 'test';
      component.onMenuAction ('side-bar-action');
      expect(component.action).toBe('side-bar-action');
    });
  });

  describe('onSidebarCollapse', ()=> {
    it ('when isMenuExpanded is null', ()=> {
      component.isMenuExpanded = null;
      component.onSidebarCollapse ();
      expect(component.isMenuExpanded).toBeTrue();

      component.isMenuExpanded = false;
      component.onSidebarCollapse ();
      expect(component.isMenuExpanded).toBeTrue();
    });

    it ('when isMenuExpanded is true', ()=> {
      component.isMenuExpanded = true;
      component.onSidebarCollapse ();
      expect(component.isMenuExpanded).toBeFalse();
    });
  });

  afterEach(() => {
    fixture.destroy();
  });

});
