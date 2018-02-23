import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { defer } from 'rxjs/observable/defer';
import { interval } from 'rxjs/observable/interval';
import { animationFrame } from 'rxjs/scheduler/animationFrame';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject'
import { tap, mergeMap, takeUntil, map, filter, scan, takeWhile } from 'rxjs/operators';
import { IncrementComponent } from './increment/increment.component';
import { AnimationFactory } from '@angular/animations';

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
    filter(({ clientX, clientY }) => isInJaysMouth(clientX, clientY)),
    scan(count => count + 1, 0)
  );
  spit$ = this.eaten$.pipe(
    filter(count => count >= 4),
    mergeMap(() => animateSpit())
  )
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
    this.spit$.subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

function isInJaysMouth(x: number, y: number) {
  return x > 200 && x < 300 && y > 300 && y < 400
};

const frames = defer(() => {
  const start = animationFrame.now()
  return interval(0, animationFrame).pipe(
    map(() => animationFrame.now() - start)
  )
});

function animateSpit() {
  const duration = 2000;
  return frames.pipe(
    map(ms => ms/duration),
    takeWhile(v => v <= 1),
    tap(v => {
      const frootSnacks = document.querySelectorAll('.froot-snack');
      Array.from(frootSnacks).forEach((frootSnack:HTMLElement) => {
        const rect = frootSnack.getBoundingClientRect();
        frootSnack.style.top = (rect.top + 5) + 'px';
      })
    })
  )
};