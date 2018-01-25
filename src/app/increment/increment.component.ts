import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { map, scan } from 'rxjs/operators';

@Component({
  selector: 'app-increment',
  templateUrl: './increment.component.html',
  styleUrls: ['./increment.component.css']
})
export class IncrementComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  inc = document.querySelector('inc');
  dec = document.querySelector('dec');
  output = document.querySelector('output');

  action$ = new BehaviorSubject(0);

  // Observable.fromEvent(inc, 'click').pipe(
  //   map(() => ({ type: 'INCREMENT' }))
  // ).subscribe(action$);

  // Observable.fromEvent(dec, 'click').pipe(
  //   map(() => ({ type: 'DECREMENT' }))
  // ).subscribe(action$);

  // state$ = action$.pipe(
  //   scan((state, action) => {
  //     switch (action.type) {
  //       case 'INCREMENT':
  //         return state + 1;
  //       case 'DECREMENT':
  //         return state - 1;
  //       default:
  //         return state;
  //     }
  //   }, 0)
  // )
  // .subscribe(s => output.innerText = s);

}
