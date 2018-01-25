import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/Observable/fromEvent';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/map';
import { IncrementComponent } from './increment/increment.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';
    
    draggable: any;
    target: any;
    mouseDown$ = Observable.fromEvent(document, 'mousedown');
    mouseMove$ = Observable.fromEvent(document, 'mousemove');

    mouseDrag$ = this.mouseDown$
        .mergeMap((event) =>
            this.mouseMove$
                .do((mouseMoveEvent: any) => {
                    mouseMoveEvent.preventDefault()
                })
                .map(mouseMoveEvent => ({
                    proposedLeft: mouseMoveEvent.clientX - event.offsetX,
                    proposedTop: mouseMoveEvent.clientY - event.offsetY,
                    target: event.target
                }))
                .takeUntil(Observable.fromEvent(event.target, 'mouseup'))
        );

    constructor() {
        this.mouseDrag$.subscribe((dragEvent: any) => {
          dragEvent.target.style.top = dragEvent.proposedTop + 'px';
          dragEvent.target.style.left = dragEvent.proposedLeft + 'px';
        });
    }

  ngAfterViewInit() {
     this.draggable = document.querySelectorAll('.draggable');
  }
}
