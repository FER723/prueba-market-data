import { Directive, ElementRef, Input } from '@angular/core';

// TODO: Añadir un nuevo modulo de directivas
@Directive({
  selector: '[appColorNumber]'
})
export class ColorNumberDirective {
  @Input() appColorNumber = 0;

  constructor(private el: ElementRef) {
    if ( this.appColorNumber < 0 )
      this.el.nativeElement.style.color = 'red';
    else
      this.el.nativeElement.style.color = 'green';
  }
}
