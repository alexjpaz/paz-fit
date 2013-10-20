console.log('Booting up ajpaz531 HTTP stack');

if(typeof process.env.MONGOHQ_URL === "undefined") {
	throw "Database URL not defined!"
}

require('./web')
