
/*
	- CommercialCreditOption:             	# Áruhiteles kérdőív, backendre nem jut el
	    - title: string                     #
	    - description: string               #
	    - accepted: bool                    #
 */
export interface CommercialCreditOption {
	title: string;
	description: string;
	accepted: boolean;
}


/*
	- ShippingAddress:
	    - lastName: string                  #
	    - firstName: string                 #
	    - companyName: string               # cégnév, mert cégnek is lehet a kiszállítás
	    - countryId: number                 # default:1 (magyarország)
	    - city: string                      #
	    - zipCode: string                   #
	    - street: string                    #
	    - phone: string                     #
	    - extraAddress: string              # szövegesen letárolva, ha csomag átvételi pontra megy a rendelés, akkor a pont címe
	    - packagePointNumber: string        # (ex:'0000417554') A csomagpont azonosítója
	    - packagePointJson: string          # A sprinteres csomagpont api visszatérő értéke, van benne olyan információ, amit fel kell később használni
    	- comment: string                   # ex: '12-es kapucsengő'
*/
export interface ShippingAddress {
	lastName: string;
	firstName: string;
	companyName: string;
	countryId: number;
	city: string;
	zipCode: string;
	street: string;
	phone: string;
	extraAddress: string;
	packagePointNumber: string;
	packagePointJson: string;
	comment: string;
}

/*
	- BillingAddress:
	    - lastName: string                  #
	    - firstName: string                 #
	    - isVatInvoice: bool                # ÁfA-ás számla igény
	    - companyName: string               # cégnév, csak az áfás számlánál jelenik meg
	    - companyVatNumber: string          # cégadószám, csak az áfás számlánál jelenik meg
	    - countryId: number                 # default:1 (magyarország)
	    - city: string                      #
	    - zipCode: string                   #
	    - street: string                    #
	    - phone: string                     #
	    - birthDate: string                 # ezt csak akkor kell kiírni, ha termék szolgáltatást kér valamelyik rendeléshez
*/
export interface BillingAddress {
	lastName: string;
	firstName: string;
	isVatInvoice: boolean;
	companyName: string;
	companyVatNumber: string;
	countryId: number;
	city: string;
	zipCode: string;
	street: string;
	phone: string;
	birthDate: string;
}

/*
	- Payment:
	    - id: number                        #
	    - title: string                     #
	    - description: string               #
	    - netPrice: number                  # Nettó ára
	    - grossPrice: number                # Bruttó ára
	    - isCommercialCredit: bool          # Áruhiteles
	    - icon: string                      #
*/
export interface Payment {
	id: number;
	title: string;
	description: string;
	netPrice: number;
	grossPrice: number;
	isCommercialCredit: boolean;
	icon: string;
}

/*
	- Shipment:
	    - id: number                        #
	    - title: string                     #
	    - description: string               #
	    - netPrice: number                  # Nettó ára
	    - grossPrice: number                # Bruttó ára
	    - isTransfer: bool                  # Kiszállításos
	    - acceptancePoint: bool             # Átvételi pont, ilyen esetben nem kell kitölteni a szállítási form-ot
	    - icon: string                      #
	    - enabledPayments: []               # id lista, a választható fizetési módokhoz
*/
export interface Shipment {
	id: number;
	title: string;
	description: string;
	netPrice: number;
	grossPrice: number;
	isTransfer: boolean;
	acceptancePoint: boolean;
	icon: string;
	enabledPayments: Payment[];
}

/*
	- ShipmentGroup:
	    - id: number                        #
	    - title: string                     #
	    - description: string               #
	    - icon: string                      #
 */
export interface ShipmentGroup {
	id: number;
	title: string;
	description: string;
	icon: string;
}

/*
	- ShipmentGroup:
	    - id: number                        #
	    - title: string                     #
	    - description: string               #
	    - icon: string                      #
*/
export interface ShipmentGroup {
	id: number;
	title: string;
	description: string;
	icon: string;
}

/*
	- CartItemService:
	    - serviceId: number                 # A szolgáltatás id-ja van itt letárolva
	    - servicePriceId: number            # A szolgáltatás ársáv id-ja van itt letárolva
	    - serviceName: string               # - safety -
	    - serviceSku: string                # - safety -
	    - netPrice: number                  # Nettó ára
	    - grossPrice: number                # Bruttó ára
	    - summableInGrandTotal: string      # Beleszámolható e a végösszegbe (vannak olyan szolgáltatások, amiket külön kell kifizetni sárgacsekken)
	    # todo: 'summableInGrandTotal' mezőt jó lenne inkább a Service-ban letárolni, mert oda való
 */
export interface CartItemService {
	serviceId: number;
	servicePriceId: number;
	serviceName: string;
	serviceSku: string;
	netPrice: number;
	grossPrice: number;
	summableInGrandTotal: string;
	// todo: 'summableInGrandTotal' mezőt jó lenne inkább a Service-ban letárolni, mert oda való
}

/*
	- CartItem:
	    - productId: number                 #
	    - netPrice: number                  # Nettó ára
	    - grossPrice: number                # Bruttó ára
	    - quantity: number                  # Mennyiség
	    - productName: string               # - safety -
	    - productSku: string                # - safety -
	    - services: CartItemService[]       # Service modellek listája
 */
export interface CartItem {
	productId: number;
	netPrice: number;
	grossPrice: number;
	quantity: number;
	productName: string;
	productSku: string;
	validated_at?: string;
	hash?: string;
	services: CartItemService[];
}

/*
	- Cart:
	    - id: string                        # hash code, length: 32
	    - shipmentId: number                #
	    - paymentId: number                 #
	    - items: CartItem[]                 #
	    - isTransfer: bool                  #
	    - billingAddress: BillingAddress    #
	    - shippingAddress: ShippingAddress  #
 */
export interface Cart {
	id: string;
	shipmentId: number;
	paymentId: number;
	items: CartItem[];
	isTransfer: boolean;
	billingAddress: BillingAddress;
	shippingAddress: ShippingAddress;
}

/**
 * Error object for the Cart operations
 */
export interface Error {
	message: string;
	ref?: number;
}

/**
 * CartAddResponse is the server response to cache the item when the user has added to the cart
 */
export interface CartAddResponse {
	hash: string;
	item: CartItem;
	cart?: Cart;
	error?: Error;
}

/**
 * CartRemoveResponse is the server response to cache the item when the user has added to the cart
 */
export interface CartRemoveResponse {
	hash: string;
	item?: CartItem;
	cart?: Cart;
	error?: Error;
}

/**
 * CartResponse is the server response to cache the item when the user has been removed from the cart
 */
export interface CartResponse {
	status: boolean;
	cart?: Cart;
	error?: Error;
}

/**
 * CartLoadReponse is the server response for CartLoad Action
 */
export interface CartLoadResponse {
	cart: Cart;
}

/**
 * RootCart interface for response
 */
export interface RootCart {
	cart?: Cart;
	CartResponse?: CartResponse;
	CartRemoveResponse?: CartRemoveResponse;
	CartAddResponse?: CartAddResponse;
	Error?: Error;
}
