import { Component } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/map';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { IncrementComponent } from './increment/increment.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  
  draggable = document.getElementById('froot-snack');

  const mouseDown$ = Observable.fromEvent(document, 'mousedown');
  const mouseMove$ = Observable.fromEvent(document, 'mousemove');
  const mouseUp$ = Observable.fromEvent(document, 'mouseup');

  const mouseDrag$ = this.mouseDown$
  .mergeMap(({ offsetX: startX, offsetY: startY }) =>
    this.mouseMove$
      .do(mouseMoveEvent => mouseMoveEvent.preventDefault())
      .map(mouseMoveEvent => ({
        left: mouseMoveEvent.clientX - startX,
        top: mouseMoveEvent.clientY - startY
      }))
      .takeUntil(mouseUp$)
  );

  mouseDrag$.subscribe(position => {
    document.style.top = position.top + 'px',
    document.style.left = position.left + 'px',
});

}
