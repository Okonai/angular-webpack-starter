import { trigger,style,transition,animate,keyframes, query } from '@angular/animations';

export const loaderAnimation = trigger('loader', [
  transition('false => true', [
      style({ opacity: 0 }),
      animate('0.3s ease-in', keyframes([
        style({opacity: 0, offset: 0}),
        style({opacity: .5,   offset: 0.5}),
        style({opacity: 1,  offset: 1}),
      ]))
  ]),
  transition('true => false', [
    style({ opacity: 0 }),
    animate('0.3s ease-in', keyframes([
        style({opacity: 1, offset: 0}),
        style({opacity: .5,   offset: 0.5}),
        style({opacity: 0,  offset: 1}),
      ]))
  ]),
])