import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromUser from '../reducers/user.reducer';

import { addressAdapter } from '../models/user.model';

import * as _ from 'lodash';

/**
 * Returns the user state.
 * @function getUserState
 * @param {State} state Top level state.
 * @return {State}
 */
export const getUserState = createSelector(
    fromFeature.getStoreState,
    (state: fromFeature.MainState) => state.user
);

export const getUserAddressState = createSelector(
    fromFeature.getStoreState,
    (state: fromFeature.MainState) => state.user.addresses
);



export const getUserAddressEntitiesState = createSelector(
    getUserState,
    state => state.addresses.entities
);

export const getSelectedAddressType = createSelector(
    getUserAddressState,
    state => state.selectedAddressType
);

export const getSelectedAddressId = createSelector(
    getUserAddressState,
    state => state.selectedAddressId
);

export const getAddressFormOpened = createSelector(
    getUserAddressState,
    state => state.addressFormOpened
);

export const getUserLoaded = createSelector(getUserState, fromUser.getUserLoaded);
export const getUserLoading = createSelector(getUserState, fromUser.getUserLoading);

export const {
    selectIds: getUserAddressIds,
    selectEntities: getUserAddressEntities,
    selectAll: getUserAddressAll,
    selectTotal: getUserAddressTotal
} = addressAdapter.getSelectors(getUserAddressState);


export const getUserAddresses = createSelector(
    getUserAddressEntitiesState,
    getSelectedAddressType,
    (entities, type) => {
        const filtered = _.filter(entities, (entity) => {
            return entity.type === type;
        });
        return filtered;
    }
);

export const getUserAddress = createSelector(
    getUserAddressEntitiesState,
    getSelectedAddressId,
    (entities, id) => {
        return entities[id];
    }
);


export const getUserOrderState = createSelector(
    fromFeature.getStoreState,
    (state: fromFeature.MainState) => state.user.orders
);

export const getUserOrderEntitiesState = createSelector(
    getUserState,
    state => state.orders.entities
);

export const {
    selectIds: getUserOrderIds,
    selectEntities: getUserOrderEntities,
    selectAll: getUserOrderAll,
    selectTotal: getUserOrderTotal
} = fromUser.orderAdapter.getSelectors(getUserOrderState);

export const getSelectActiveOnly = createSelector(
    getUserOrderState,
    state => state.selectActiveOnly
);

export const getOrdersCurrentPage = createSelector(
    getUserOrderState,
    state => state.currentPage
);

export const getOrdersStatuses = createSelector(
    getUserOrderState,
    state => state.statuses
);

export const getOrdersDates = createSelector(
    getUserOrderState,
    state => state.dates
);

export const getOrdersOrderNumbers = createSelector(
    getUserOrderState,
    state => state.order_numbers
);

export const getOrderFilters = createSelector(
    getUserOrderState,
    state => state.filters
);

export const getFilteredUserOrders = createSelector(
    getUserOrderEntitiesState,
    getSelectActiveOnly,
    getOrderFilters,
    (entities, activeOnly, filters) => {
        let filtered;
        /*if(activeOnly) {
            filtered = _.filter(entities, (entity) => {
                return entity.active == true
            })
        } else {
            filtered = _.filter(entities, (entity) => {
                return true
            })
        }*/
        filtered = _.filter(entities, (entity) => {
            if (filters.date === null && filters.order_number ===  null && filters.status === null) {
                return true;
            }

            if ( filters.order_number !=  null && entity.order_number === filters.order_number) {
                return true;
            }

            if (filters.date != null && filters.status != null) {
                if (sameDay(new Date(filters.date), new Date(entity.order_submitted_at)) && filters.status === entity.status) {
                    return true;
                }
            } else if (filters.date != null && filters.status == null) {
                if (sameDay(new Date(filters.date), new Date(entity.order_submitted_at))) {
                    return true;
                }
            } else if (filters.status != null && filters.date == null) {
                if (filters.status === entity.status) {
                    return true;
                }
            }
            return false;
        });

        return filtered;
    }
);

function sameDay(d1, d2) {
    return d1.getYear() === d2.getYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
}
