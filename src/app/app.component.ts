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
    mouseDown$ = Observable.fromEvent(document, 'mousedown');
    mouseMove$ = Observable.fromEvent(document, 'mousemove');
    mouseUp$ = Observable.fromEvent(document, 'mouseup');

    mouseDrag$ = this.mouseDown$
        .mergeMap(({ offsetX: startX, offsetY: startY }) =>
            this.mouseMove$
                .do((mouseMoveEvent: any) => {
                    mouseMoveEvent.preventDefault()
                })
                .map(mouseMoveEvent => ({
                    left: mouseMoveEvent.clientX - startX,
                    top: mouseMoveEvent.clientY - startY
                }))
                .takeUntil(this.mouseUp$)
        );

    constructor() {
        this.mouseDrag$.subscribe((position: any) => {
            this.draggable.style.top = `${position.top}px`;
            this.draggable.style.left = `${position.left}px`;
        });
    }

  ngAfterViewInit() {
     this.draggable = document.getElementById('froot-snack');
  }
}
