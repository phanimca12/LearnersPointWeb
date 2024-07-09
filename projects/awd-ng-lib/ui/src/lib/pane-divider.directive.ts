import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';


@Directive({ selector: '[pane-divider]' })
export class PaneDividerDirective implements AfterViewInit, OnChanges {
  @Input() pane1;
  @Input() pane2;
  @Input() splitHandler;
  @Input() orientation;
  @Input() active;
  @Input() popoutWindowEl;
  private isDragging = false;
  private prevY = 0;
  private prevX = 0;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) { }

  ngAfterViewInit() {
    if (this.pane1 && this.pane2 && this.splitHandler) {
      if (this.orientation) {
        this.isDragging = false;
        this.splitHandler.addEventListener(
          'mousedown',
          this.dragStart.bind(this)
        );

        this.elementRef.nativeElement.addEventListener(
          'mousemove',
          this.drag.bind(this)
        );

        this.elementRef.nativeElement.addEventListener(
          'mouseup',
          this.dragEnd.bind(this)
        );
        this.popoutWindowEl?.popoutWindow?.document.body.addEventListener('mouseup', this.dragEnd.bind(this));
        document.body.addEventListener('mouseup', this.dragEnd.bind(this));
      }
      if (!document.getElementById("processor-app")) {
        window.addEventListener('mouseup', this.dragEnd.bind(this));
        this.splitHandler.addEventListener('mouseup', this.dragEnd.bind(this));
        window.addEventListener('mouseout', this.dragEnd.bind(this));
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.active &&
      changes.active.previousValue !== changes.active.currentValue
    ) {
      this.active = changes.active.currentValue;

      if (this.active) {
        this.renderer.addClass(this.splitHandler, 'active');
      } else {
        this.renderer.removeClass(this.splitHandler, 'active');
      }
    }
  }

  dragStart(evt) {
    if (!this.active) {
      return;
    }

    evt.preventDefault();
    this.isDragging = true;
    this.prevY = evt.clientY;
    this.prevX = evt.clientX;

    this.renderer.addClass(document.body, 'dragging-divider');
  }

  drag(evt) {
    if (!this.isDragging || !this.active) {
      return;
    }

    if (!document.getElementById("processor-app")) {
      evt.preventDefault();
      evt.stopPropagation();
    }

    const distanceY = this.prevY - evt.clientY;
    const distanceX = this.prevX - evt.clientX;
    const maxPaneHeight = '420px';
    const minPaneHeight = '130px';

    if (this.orientation === 'horizontal') {
      const pane1Height = `${this.pane1.offsetHeight - distanceY}px`;
      const pane2Height = `${this.pane2.offsetHeight + distanceY}px`;

      this.renderer.setStyle(this.pane1, 'height', pane1Height);
      this.renderer.setStyle(this.pane2, 'height', pane2Height);

      if (pane2Height <= minPaneHeight || pane2Height >= maxPaneHeight) {
        this.dragEnd(evt);
      }

    } else if (this.orientation === 'vertical') {
      const pane1Width = `${this.pane1.offsetWidth - distanceX}px`;
      const pane2Width = `${this.pane2.offsetWidth + distanceX}px`;

      this.renderer.setStyle(this.pane1, 'width', pane1Width);
      this.renderer.setStyle(this.pane2, 'width', pane2Width);
    }

    this.prevY = evt.clientY;
    this.prevX = evt.clientX;

  }

  dragEnd(evt) {
    this.renderer.removeClass(document.body, 'dragging-divider');
    this.isDragging = false;
  }
}
