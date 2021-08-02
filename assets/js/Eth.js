const Eth = {
	
	handlerWeb3() {
		return new Web3(Web3.givenProvider || "ws://localhost:8545");
		// return new Web3('https://rinkeby.infura.io/v3/bf0f42520385493989eb88422b4740fc');
	},
	
	error( err ) {
		console.error( err );
		env.pnotify.danger(`Error ${err.code}`, err.message);		
	},
	
	handlerTx( txObject, privateKey1 ) {
		if ( txObject.nonce ) txObject.nonce = web3.utils.toHex(`${txObject.nonce}`);
		if ( txObject.gasLimit ) txObject.gasLimit = web3.utils.toHex(`${txObject.gasLimit}`);
		if ( txObject.gasPrice ) txObject.gasPrice = web3.utils.toHex( web3.utils.toWei(`${txObject.gasPrice}`, 'gwei'));
		
		var tx = new Tx( txObject, {'chain':'rinkeby'} )
		tx.sign(privateKey1)	
		
		return tx;
	}

	
	
	
	
	
	
	
	
	
}
