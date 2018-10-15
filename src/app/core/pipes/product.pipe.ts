import { Pipe, PipeTransform, NgModule } from '@angular/core';

@Pipe({name: 'tax'})
export class TaxPipe implements PipeTransform {
	transform(price: number,tax:number): number {
		return Math.ceil(price * (tax + 100) / 100 / 10) * 10;
	}
}

@Pipe({name: 'PriceFix'})
export class PriceFixPipe implements PipeTransform {
	transform(price: number): number {
		return price; //Math.ceil(price / 10) * 10;
	}
}

@NgModule({
	declarations: [ 
		TaxPipe,
		PriceFixPipe
	],
	exports: [
		TaxPipe,
		PriceFixPipe
	]
  })
  
  export class ProductPipeModule {}