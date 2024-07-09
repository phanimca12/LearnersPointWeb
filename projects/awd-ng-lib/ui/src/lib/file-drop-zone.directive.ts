import { Directive, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2, RendererFactory2 } from '@angular/core';

@Directive({ selector: '[file-drop-zone]' })
export class FileDropZoneDirective implements OnInit, OnDestroy {
  @Output() droppedFiles = new EventEmitter<FileList>();
  @Input() margin: number = 0;
  @Input() set active(active: boolean) {
    this._active = active;
    if (this._hostEl !== undefined) {
      this.updateActiveState();
    }
  }
  @Input() set hostEl(hostEl: HTMLElement) {
    if (this._hostEl === undefined && hostEl !== undefined && hostEl !== null) {
      this._hostEl = hostEl;
      this.createDropZoneElement();
      this.updateActiveState();
    }
  }

  private _active: boolean;
  private _hostEl: HTMLElement;
  private dragEnterCount: number = 0;
  private renderer: Renderer2;
  private dropZoneHtmlEl: HTMLElement;
  private addedEventListeners: boolean = false;
  private isDraggingFile: boolean = false;
  private onDragEnterEventListener: () => void;
  private onDragOverEventListener: () => void;
  private onDragLeaveEventListener: () => void;
  private onDropEventListener: () => void;

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.removeEventListeners();
    this.removeDropZoneElement();
  }

  private updateActiveState() {
    if (this._active) {
      this.addEventListeners();
    } else {
      this.removeEventListeners();
    }
  }

  private createDropZoneElement() {
    this.dropZoneHtmlEl = this.renderer.createElement('div');
    this.dropZoneHtmlEl.classList.add('file-drop-zone');
    this.dropZoneHtmlEl.style.position = 'absolute';
    this.dropZoneHtmlEl.style.border = '2px dashed #03a9f4';
    this.dropZoneHtmlEl.style.borderRadius = '15px';
    this.renderer.appendChild(this._hostEl, this.dropZoneHtmlEl);
    this.hideDropZone();
  }

  private removeDropZoneElement() {
    if (this.dropZoneHtmlEl !== undefined) {
      this.renderer.removeChild(this._hostEl, this.dropZoneHtmlEl);
    }
  }

  private showDropZone(): void {
    this.dropZoneHtmlEl.style.display = 'flex';
    this.dropZoneHtmlEl.style.margin = `${this.margin}px`;
    this.dropZoneHtmlEl.style.width = `${this._hostEl.offsetWidth - 2 * this.margin}px`;
    this.dropZoneHtmlEl.style.height = `${this._hostEl.offsetHeight - 2 * this.margin}px`;
  }

  private hideDropZone(): void {
    this.dropZoneHtmlEl.style.display = 'none';
  }

  addEventListeners() {
    if (!this.addedEventListeners) {
      this.onDragEnterEventListener = this.renderer.listen(this._hostEl, 'dragenter', this.onDragEnter.bind(this));
      this.onDragOverEventListener = this.renderer.listen(this._hostEl, 'dragover', this.onDragOver.bind(this));
      this.onDragLeaveEventListener = this.renderer.listen(this._hostEl, 'dragleave', this.onDragLeave.bind(this));
      this.onDropEventListener = this.renderer.listen(this._hostEl, 'drop', this.onDrop.bind(this));
      this.addedEventListeners = true;
    }
  }

  removeEventListeners() {
    if (this.addedEventListeners) {
      this.onDragEnterEventListener();
      this.onDragOverEventListener();
      this.onDragLeaveEventListener();
      this.onDropEventListener();
      this.addedEventListeners = false;
    }
  }

  private onDragEnter(evt: DragEvent) {
    this.isDraggingFile = evt.dataTransfer.types.includes('Files');
    if (this.isDraggingFile) {
      evt.preventDefault();
      evt.stopPropagation();
      this.showDropZone();
      this.dragEnterCount++;
    }
  }

  private onDragOver(evt: DragEvent) {
    if (this.isDraggingFile) {
      evt.preventDefault();
      evt.stopPropagation();
    }
  }

  private onDragLeave(evt: DragEvent) {
    if (this.isDraggingFile) {
      evt.preventDefault();
      evt.stopPropagation();

      this.dragEnterCount--;
      if (this.dragEnterCount === 0) {
        this.hideDropZone();
      }
    }
  }

  private onDrop(evt: DragEvent) {
    if (this.isDraggingFile) {
      evt.preventDefault();
      evt.stopPropagation();
      let files = evt.dataTransfer.files;
      if (files.length > 0) {
        this.droppedFiles.emit(files);
        this.hideDropZone();
      }
      this.dragEnterCount = 0;
    }
  }
}
