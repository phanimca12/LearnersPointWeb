import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PaneDividerDirective } from './pane-divider.directive';

@Component({
  template: `
    <div id="mainContainer">
      <div
        [pane-divider]
        [pane1]="pane1Horizontal"
        [pane2]="pane2Horizontal"
        [splitHandler]="dividerHorizontal"
        [active]="active"
        [orientation]="'horizontal'"
        id="containerHorizontal"
      >
        <div #pane1Horizontal id="pane1Horizontal"></div>
        <div #dividerHorizontal id="dividerHorizontal"></div>
        <div #pane2Horizontal id="pane2Horizontal"></div>
      </div>

      <div
        [pane-divider]
        [pane1]="pane1Vertical"
        [pane2]="pane2Vertical"
        [splitHandler]="dividerVertical"
        [active]="active"
        [orientation]="'vertical'"
        id="containerVertical"
      >
        <div #pane1Vertical id="pane1Vertical"></div>
        <div #dividerVertical id="dividerVertical"></div>
        <div #pane2Vertical id="pane2Vertical"></div>
      </div>
    </div>
  `,
  styles: [
    `
      #mainContainer {
        width: 100%;
        height: 1200px;
      }

      #containerHorizontal {
        width: 400px;
        height: 250px;
        display: flex;
        flex-direction: column;
        border: 1px solid black;
      }
      #pane1Horizontal {
        width: 100%;
        height: auto;
        min-height: 40px;
        flex: 1 auto;
        border: 1px solid red;
      }

      #dividerHorizontal {
        width: 100%;
        height: 20px;
        border: 1px dashed black;
      }

      #pane2Horizontal {
        width: 100%;
        min-height: 100px;
        flex: 1 auto;
        border: 1px solid blue;
      }

      #containerVertical {
        width: 400px;
        height: 250px;
        display: flex;
        margin-top: 20px;
        flex-direction: row;
        border: 1px solid black;
      }
      #pane1Vertical {
        height: 100%;
        width: auto;
        min-width: 40px;
        flex: 1 auto;
        border: 1px solid red;
      }

      #dividerVertical {
        width: 20px;
        height: 100%;
        border: 1px dashed black;
      }

      #pane2Vertical {
        height: 100%;
        min-width: 100px;
        flex: 1 auto;
        border: 1px solid blue;
      }
    `,
  ],
})
export class MockComponent {
  orientation: string;
  active: boolean;
}

describe('#PaneDividerDirectiveDirective', () => {
  let fixture: ComponentFixture<MockComponent>;
  let component;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MockComponent, PaneDividerDirective],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockComponent);
    component = fixture.componentInstance;
    component.active = true;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should decrease height of pane1 and increase the height of pane2 when dragging the splitHandler upwards', () => {
    let splitHandler = fixture.debugElement.query(By.css('#dividerHorizontal'));
    let pane1 = fixture.debugElement.query(By.css('#pane1Horizontal'));
    let pane2 = fixture.debugElement.query(By.css('#pane2Horizontal'));

    var mouseDownEvt: MouseEvent = document.createEvent('MouseEvent');
    mouseDownEvt.initEvent('mousedown', true, true);
    Object.defineProperties(mouseDownEvt, {
      clientX: { value: 200 },
      clientY: { value: 350 },
    });

    splitHandler.nativeElement.dispatchEvent(mouseDownEvt);
    let body = document.getElementsByClassName('dragging-divider');
    expect(body[0]).toBeDefined();

    var mouseMoveEvt: MouseEvent = document.createEvent('MouseEvent');
    mouseMoveEvt.initEvent('mousemove', true, true);
    Object.defineProperties(mouseMoveEvt, {
      clientX: { value: 200 },
      clientY: { value: 349 },
    });

    splitHandler.nativeElement.dispatchEvent(mouseMoveEvt);
    expect(pane1.nativeElement.offsetHeight).toEqual(113);
    expect(pane2.nativeElement.offsetHeight).toEqual(115);

    var mouseUpEvt: MouseEvent = new MouseEvent('mouseup');
    document.body.dispatchEvent(mouseUpEvt);
    body = document.getElementsByClassName('dragging-divider');
    expect(body[0]).toBeUndefined();
  });

  it('should not resize when not clicking on the split handler', () => {
    let splitHandler = fixture.debugElement.query(By.css('#dividerHorizontal'));
    let pane1 = fixture.debugElement.query(By.css('#pane1Horizontal'));
    let pane2 = fixture.debugElement.query(By.css('#pane2Horizontal'));

    var mouseMoveEvt: MouseEvent = document.createEvent('MouseEvent');
    mouseMoveEvt.initEvent('mousemove', true, true);
    Object.defineProperties(mouseMoveEvt, {
      clientX: { value: 200 },
      clientY: { value: 349 },
    });

    splitHandler.nativeElement.dispatchEvent(mouseMoveEvt);

    expect(pane1.nativeElement.offsetHeight).toEqual(114);
    expect(pane2.nativeElement.offsetHeight).toEqual(114);
    let body = document.getElementsByClassName('dragging-divider');
    expect(body[0]).toBeUndefined();
  });

  it('should not resize when the directive is not active', () => {
    component.active = false;
    fixture.detectChanges();

    let splitHandler = fixture.debugElement.query(By.css('#dividerHorizontal'));
    let pane1 = fixture.debugElement.query(By.css('#pane1Horizontal'));
    let pane2 = fixture.debugElement.query(By.css('#pane2Horizontal'));

    var mouseDownEvt: MouseEvent = document.createEvent('MouseEvent');
    mouseDownEvt.initEvent('mousedown', true, true);
    Object.defineProperties(mouseDownEvt, {
      clientX: { value: 200 },
      clientY: { value: 350 },
    });

    splitHandler.nativeElement.dispatchEvent(mouseDownEvt);

    var mouseMoveEvt: MouseEvent = document.createEvent('MouseEvent');
    mouseMoveEvt.initEvent('mousemove', true, true);
    Object.defineProperties(mouseMoveEvt, {
      clientX: { value: 200 },
      clientY: { value: 349 },
    });

    splitHandler.nativeElement.dispatchEvent(mouseMoveEvt);

    expect(pane1.nativeElement.offsetHeight).toEqual(114);
    expect(pane2.nativeElement.offsetHeight).toEqual(114);
    let body = document.getElementsByClassName('dragging-divider');
    expect(body[0]).toBeUndefined();
  });

  it('should not resize horizontally when orientation is vertical', () => {
    let splitHandler = fixture.debugElement.query(By.css('#dividerVertical'));
    let pane1 = fixture.debugElement.query(By.css('#pane1Vertical'));
    let pane2 = fixture.debugElement.query(By.css('#pane2Vertical'));

    const offsetHeightPane1 = pane1.nativeElement.offsetHeight;
    const offsetHeightPane2 = pane2.nativeElement.offsetHeight;
    const offsetWidthPane1 = pane1.nativeElement.offsetWidth;
    const offsetWidthPane2 = pane2.nativeElement.offsetWidth;

    var mouseDownEvt: MouseEvent = document.createEvent('MouseEvent');
    mouseDownEvt.initEvent('mousedown', true, true);
    Object.defineProperties(mouseDownEvt, {
      clientX: { value: 210 },
      clientY: { value: 330 },
    });
    splitHandler.nativeElement.dispatchEvent(mouseDownEvt);
    var mouseMoveEvt: MouseEvent = document.createEvent('MouseEvent');
    mouseMoveEvt.initEvent('mousemove', true, true);
    Object.defineProperties(mouseMoveEvt, {
      clientX: { value: 211 },
      clientY: { value: 330 },
    });
    splitHandler.nativeElement.dispatchEvent(mouseMoveEvt);
    expect(pane1.nativeElement.offsetWidth).toEqual(offsetWidthPane1 + 1);
    expect(pane2.nativeElement.offsetWidth).toEqual(offsetWidthPane2 - 1);
    expect(pane1.nativeElement.offsetHeight).toEqual(offsetHeightPane1);
    expect(pane2.nativeElement.offsetHeight).toEqual(offsetHeightPane2);

    var mouseUpEvt: MouseEvent = new MouseEvent('mouseup');
    document.body.dispatchEvent(mouseUpEvt);
    let body = document.getElementsByClassName('dragging-divider');
    expect(body[0]).toBeUndefined();
  });
});
