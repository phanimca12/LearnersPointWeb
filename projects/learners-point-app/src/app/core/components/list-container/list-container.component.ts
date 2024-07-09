import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-list-container',
  templateUrl: './list-container.component.html',
  styleUrls: ['./list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListContainerComponent implements AfterViewInit {
  @Output() scrollEnd = new EventEmitter();
  @ViewChild('listContainer') listContainerEl: ElementRef;
  isScrollbarVisible = false;

  constructor(private cdRef: ChangeDetectorRef) { }

  ngAfterViewInit() {
    const nativeEl = this.listContainerEl.nativeElement;
    this.isScrollbarVisible = nativeEl.scrollHeight > nativeEl.offsetHeight;

    this.cdRef.detectChanges();
  }

  onScroll() {
    const nativeEl = this.listContainerEl.nativeElement;
    const scrolled = Math.ceil(nativeEl.scrollTop);
    const height = nativeEl.offsetHeight;
    const scrollHeight = nativeEl.scrollHeight;

    if ((scrolled + height + 5) >= scrollHeight) {
      this.scrollEnd.emit();
    }
  }

  onResize() {
    const nativeEl = this.listContainerEl.nativeElement;
    if (nativeEl.offsetHeight >= nativeEl.scrollHeight) {
      this.scrollEnd.emit();
    }
    this.isScrollbarVisible = nativeEl.scrollHeight > nativeEl.offsetHeight;
    this.cdRef.detectChanges();
  }

  resetScroll() {
    this.listContainerEl.nativeElement.scrollTop = 0;
  }
}