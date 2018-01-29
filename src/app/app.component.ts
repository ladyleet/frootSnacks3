import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Subject } from 'rxjs/Subject';
import { Subscription} from 'rxjs/Subscription';
import { tap, mergeMap, takeUntil, map, filter, scan} from 'rxjs/operators';
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
  increment$ = new Subject<any>();

  eaten$ = this.increment$.pipe(
    filter(({clientX, clientY}) => isInJaysMouth(clientX, clientY)),
    scan(count => count +1, 0)
  );

  targetMouseDown$ = this.mouseDown$.pipe(
    filter((e: any) => e.target.matches('.froot-snack'))
  )
  
    mouseDrag$ = this.targetMouseDown$.pipe(
    mergeMap(({ target: draggable, offsetX: startX, offsetY: startY }) =>
      this.mouseMove$.pipe(
        tap((mouseMoveEvent: any) => {
          mouseMoveEvent.preventDefault()
        }),
        map(mouseMoveEvent => ({
          left: mouseMoveEvent.clientX - startX,
          top: mouseMoveEvent.clientY - startY,
          draggable
        })),
        takeUntil(this.mouseUp$.pipe(
          tap(this.increment$)
        ))
      )
    )
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

function isInJaysMouth(x: number, y: number) {
  return x > 200 && x < 300 && y > 300 && y < 400
};