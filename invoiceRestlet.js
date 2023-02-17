/**
 *@NApiVersion 2.x
 *@NScriptType Restlet
 */
define(['N/record', 'N/task'],
    function(record, task) {
       
        // Get an invoice
        function get(context) {
			var invoiceNumber = context.request.parameters.invoicenumber;
			//validate invoice number
			if (!invoiceNumber) {
				return "No invoice number provided.";
			}
			//create a saved search for invoice
			var columns = [{name: 'internalid'},
							{name: 'tranid'}, //invoice number
							{name: 'entity'}, //customer
							{name: 'subsidiary'},
							{name: 'total'}];
			var filters = [{name: 'tranid', operator: 'anyof', values: [location]}];
			var searchResult = search.create({
				type: 'invoice',
				columns: columns,
				filters: filters
			})
			var results = searchResult.run().getRange({ start: 0, end: 2 });
			if (results.length == 0) {
				return "No invoice found.";
			} else if (results.length == 1) {
				return {
					'internalid': results[0].getValue({name: 'internalid'}),
					'invoicenumber': results[0].getValue({name: 'tranid'}),
					'customer': results[0].getValue({name: 'entity'}),
					'subsidiary': results[0].getValue({name: 'subsidiary'}),
					'totalamount': results[0].getValue({name: 'total'})
				}
			} else {
				return "Multiple invoices found.";
			}
        }
        
        return {
            get: get
        };
    });