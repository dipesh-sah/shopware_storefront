const middleware = {}

middleware['auth'] = require('..\\.shopware-pwa\\source\\middleware\\auth.ts')
middleware['auth'] = middleware['auth'].default || middleware['auth']

middleware['checkout'] = require('..\\.shopware-pwa\\source\\middleware\\checkout.js')
middleware['checkout'] = middleware['checkout'].default || middleware['checkout']

middleware['pages'] = require('..\\.shopware-pwa\\source\\middleware\\pages.js')
middleware['pages'] = middleware['pages'].default || middleware['pages']

export default middleware
