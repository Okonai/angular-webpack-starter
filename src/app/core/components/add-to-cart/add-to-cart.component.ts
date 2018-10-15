import { Component, OnInit, Input, NgModule } from '@angular/core';

import { Store } from '@ngrx/store';

import { Product, ProductService } from '@models/product.model';
import * as fromStore from '@store/index';
import * as _ from 'lodash';

@Component({
    selector: 'app-add-to-cart',
    templateUrl: './add-to-cart.component.html',
    styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit {
    /**
     * The quantity number
     * @type {number}
     */
    public quantity: number = 1;
    /**
     * We need the product entity from the parent.
     */

    @Input() product: Product;
    private selectedServices: ProductService[];


    constructor(private store: Store<fromStore.MainState>) { }

    ngOnInit() { }
    /**
     * Add to cart trigger event
     */
    addtocart() {
        if (this.quantity > 0) {
            this.store.dispatch(new fromStore.CartAdd({
                id: this.product.id,
                changes: {
                    variable: {
                        quantity: this.quantity,
                        services: _.map(this.selectedServices, (service) => service.id)
                    }
                }
            }));
            this.quantity = 1;
        }
    }

    modifyQuantity(type) {
        if (type === 'plus') {
            this.quantity++;
        } else if (type === 'minus' && this.quantity !== 1) {
            this.quantity--;
        }
    }

}
