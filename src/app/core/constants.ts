let API = {
	// tslint:disable-next-line:indent
	path: '/webshop/',
	// tslint:disable-next-line:indent
	// tslint:disable-next-line:indent
	// tslint:disable-next-line:indent
	// tslint:disable-next-line:indent
	base: 'base/',
	// tslint:disable-next-line:indent
	main: 'main/',
	category: 'category/',
	// tslint:disable-next-line:indent
	product: 'product/',
	profile: 'profile/',
	cart: 'cart/',
	promotion: 'promotion/',
};
switch (ENV) {
	case 'test':
		API = Object.assign(API, {
			path: 'http://test.smartsolution.hu/webshop/'
		});
		break;
	case 'dev':
		API = Object.assign(API, {
			path: 'http://dev.smartsolution.hu/webshop/'
		});
		break;
	default: break;
}

export const API_PATH = API;
