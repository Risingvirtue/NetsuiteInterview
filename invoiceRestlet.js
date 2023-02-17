/**
 *@NApiVersion 2.x
 *@NScriptType Restlet
 */
define(['N/record', 'N/task'],
    function(record, task) {
       
        // Get a standard NetSuite record
        function _get(context) {
    
            return JSON.stringify({test: 'test get'});
        }
        
 
	
        return {
            get: get
        };
    });