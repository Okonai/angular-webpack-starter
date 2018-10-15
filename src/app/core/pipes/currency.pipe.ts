import {Pipe, PipeTransform, NgModule} from '@angular/core';

@Pipe({
    name: 'currencyFormat'
})
export class CurrencyFormatPipe implements PipeTransform {

    transform(value: number,
              currencySign: string = ' Ft',
              decimalLength: number = 0,
              chunkDelimiter: string = ' ',
              decimalDelimiter: string = ',',
              chunkLength: number = 3): string {


        if (value == null) {
            return null;
        }
        value=Number(value);

        //value /= 100;

        let result = '\\d(?=(\\d{' + chunkLength + '})+' + (decimalLength > 0 ? '\\D' : '$') + ')'
        let num = value.toFixed(Math.max(0, ~~decimalLength));

        return (decimalDelimiter ? num.replace('.', decimalDelimiter) : num).replace(new RegExp(result, 'g'), '$&' + chunkDelimiter) + currencySign;

    }
}

@NgModule({
    declarations: [ 
        CurrencyFormatPipe
    ],
    exports: [
        CurrencyFormatPipe
    ]
  })

export class CurrencyFormatPipeModule {}