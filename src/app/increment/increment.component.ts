import {AfterViewInit, Component, OnInit} from '@angular/core';
import {fromEvent} from 'rxjs/observable/fromEvent';
import {BehaviorSubject, Observable} from 'rxjs/Rx';
import {map, scan} from 'rxjs/operators';

@Component({
  selector: 'app-increment',
  templateUrl: './increment.component.html',
  styleUrls: ['./increment.component.css']
})
export class IncrementComponent implements AfterViewInit {

  action$ = new BehaviorSubject<{ type: string }>({type: 'initial store state'});

  ngAfterViewInit() {
    const inc = document.querySelector('#inc');
    const dec = document.querySelector('#dec');
    const output = document.querySelector('output');

    Observable
      .fromEvent(inc, 'click')
      .pipe(map(() => ({type: 'INCREMENT'})))
      .subscribe(action => this.action$.next(action));

    // Observable
    //   .fromEvent(dec, 'click')
    //   .pipe(map(() => ({type: 'DECREMENT'})))
    //   .subscribe(action => this.action$.next(action));

    this.action$.pipe(
      scan((state: number, action: { type: string }) => {
        switch (action.type) {
          case 'INCREMENT':
            return state + 1;
          case 'DECREMENT':
            return state - 1;
          default:
            return state;
        }
      }, 0)
    )
      .subscribe(s => (output as HTMLElement).innerText = s.toString());
  }
}
