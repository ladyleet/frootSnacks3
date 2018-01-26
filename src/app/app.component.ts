import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { IncrementComponent } from './increment/increment.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  
  subscription: Subscription;
  mouseDown$ = fromEvent(document, 'mousedown');
  mouseMove$ = fromEvent(document, 'mousemove');
  mouseUp$ = fromEvent(document, 'mouseup');
  
  targetMouseDown$ = this.mouseDown$
    .filter((e: any) => e.target.matches('.froot-snack'))
  
    mouseDrag$ = this.targetMouseDown$
    .mergeMap(({ target: draggable, offsetX: startX, offsetY: startY }) =>
      this.mouseMove$
        .do((mouseMoveEvent: any) => {
          mouseMoveEvent.preventDefault()
        })
        .map(mouseMoveEvent => ({
          left: mouseMoveEvent.clientX - startX,
          top: mouseMoveEvent.clientY - startY,
          draggable
        }))
        .takeUntil(this.mouseUp$)
    );

  constructor() {

  }

  ngOnInit() {
    this.subscription = this.mouseDrag$.subscribe(({ top, left, draggable }) => {
      draggable.style.top = top + 'px';
      draggable.style.left = left + 'px';
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
