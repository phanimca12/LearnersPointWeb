import { Component, DebugElement, Renderer2, RendererFactory2 } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FileDropZoneDirective } from './file-drop-zone.directive';

@Component({
  template: `
    <div id="dropZoneParent">
      <div
        file-drop-zone
        [active]="true"
        [margin]="16"
        [hostEl]="dropZoneParentEl"
        (droppedFiles)="onFileDropped($event)"
      >
        <p>Sample text</p>
      </div>
    </div>
  `,
})
class MockComponent {}

describe('#FileDropZoneDirective', () => {
  let fixture: ComponentFixture<MockComponent>;
  let component;
  let fileDropZoneEl: DebugElement;
  let fileDropZoneDirective: FileDropZoneDirective;
  let renderer: Renderer2;
  let createRendererSpy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FileDropZoneDirective, MockComponent],
    }).compileComponents();
    let rendererFactory = TestBed.inject(RendererFactory2);
    renderer = rendererFactory.createRenderer(null, null);
    createRendererSpy = spyOn(rendererFactory, 'createRenderer').and.returnValue(renderer);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fileDropZoneEl = fixture.debugElement.query(By.directive(FileDropZoneDirective));
    fileDropZoneDirective = fileDropZoneEl.injector.get(FileDropZoneDirective);
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should call createRenderer on the RendererFactory2 spy', () => {
    expect(createRendererSpy).toHaveBeenCalled();
  });

  describe('#active', () => {
    it('should update the value of _active', () => {
      fileDropZoneDirective.active = true;
      expect(fileDropZoneDirective['_active']).toBe(true);
      fileDropZoneDirective.active = false;
      expect(fileDropZoneDirective['_active']).toBe(false);
    });

    it('should add event listeners to the host element when switching from inactive to active state', () => {
      const addEventListenersSpy = spyOn(fileDropZoneDirective, 'addEventListeners');

      fileDropZoneDirective.active = true;
      fileDropZoneDirective.hostEl = fileDropZoneEl.nativeElement;

      expect(addEventListenersSpy).toHaveBeenCalled();
    });

    it('should not add event listeners if the host element is undefined', () => {
      const addEventListenersSpy = spyOn(fileDropZoneDirective, 'addEventListeners');

      fileDropZoneDirective.active = true;

      expect(addEventListenersSpy).not.toHaveBeenCalled();
    });
  });

  describe('#hostEl', () => {
    it('should update the value of _hostEl', () => {
      fileDropZoneDirective.hostEl = fileDropZoneEl.nativeElement;

      expect(fileDropZoneDirective['_hostEl']).toBeDefined();
    });

    it('should create and append the drop zone element if the parent element is defined', () => {
      const appendChildSpy = spyOn(renderer, 'appendChild');
      const removeChildSpy = spyOn(renderer, 'removeChild');

      fileDropZoneDirective.hostEl = fileDropZoneEl.nativeElement;

      expect(appendChildSpy).toHaveBeenCalled();
      expect(removeChildSpy).not.toHaveBeenCalled();
    });

    it('should not create the drop zone element if the parent element is undefined or null', () => {
      const appendChildSpy = spyOn(renderer, 'appendChild');

      fileDropZoneDirective.hostEl = null;

      expect(appendChildSpy).not.toHaveBeenCalled();
    });

    it('should add event listeners to the drop zone element', () => {
      const addEventListenersSpy = spyOn(fileDropZoneDirective, 'addEventListeners');

      fileDropZoneDirective.hostEl = fileDropZoneEl.nativeElement;

      expect(addEventListenersSpy).toHaveBeenCalled();
    });
  });

  describe('#addEventListeners', () => {
    it('should listen to drag and drop events', () => {
      const listenSpy = spyOn(renderer, 'listen').and.returnValue(() => {});

      fileDropZoneDirective.hostEl = fileDropZoneEl.nativeElement;

      expect(listenSpy).toHaveBeenCalledWith(fileDropZoneEl.nativeElement, 'dragenter', jasmine.any(Function));
      expect(listenSpy).toHaveBeenCalledWith(fileDropZoneEl.nativeElement, 'dragover', jasmine.any(Function));
      expect(listenSpy).toHaveBeenCalledWith(fileDropZoneEl.nativeElement, 'dragleave', jasmine.any(Function));
      expect(listenSpy).toHaveBeenCalledWith(fileDropZoneEl.nativeElement, 'drop', jasmine.any(Function));
    });
  });

  describe('#removeEventListeners', () => {
    it('should remove event listeners', () => {
      const mockUnlistenFunction = jasmine.createSpy();
      const listenSpy = spyOn(renderer, 'listen').and.returnValue(mockUnlistenFunction);

      fileDropZoneDirective.hostEl = fileDropZoneEl.nativeElement;
      fileDropZoneDirective.removeEventListeners();

      expect(mockUnlistenFunction).toHaveBeenCalledTimes(4);
    });
  });

  xdescribe('#onDrop', () => {
    it('should emit files in a droppedFiles event', () => {
      const emitSpy = spyOn(fileDropZoneDirective.droppedFiles, 'emit');
      const mockFiles = { length: 1 } as FileList;
      const mockEvt = {
        dataTransfer: {
          files: mockFiles,
        },
        preventDefault: () => {},
        stopPropagation: () => {},
      };

      fileDropZoneDirective.hostEl = fileDropZoneEl.nativeElement;
      fileDropZoneEl.triggerEventHandler('drop', mockEvt);

      expect(emitSpy).toHaveBeenCalledWith(mockFiles);
    });
  });
});
