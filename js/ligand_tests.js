function assert(condition, error_msg) {
	if (!condition) {
		throw new Error(error_msg);
	} 
}

function test_ligand_values() {
	// Test that each drop down sets the correct values for each ligand.
	// Includes empty selection.
	console.log("Testing ligand values....")
	// For each dropdown element
	$('.leftInput > select').each(function(i, obj) {
		for(var i=0; i<13; i++) {
			$(obj).val(i);
			$(obj).change(); // Manually fire change event.
			// For each value input 
			$(obj).parent().parent().siblings().each(function(j, obj) {
				correctValue = logK[i][j];
				actualValue = $(obj).children().first().val();
				assert(correctValue == actualValue, "Got " + actualValue + " expected " + correctValue);
			});
		}
	});
	console.log("Test passed!");
}

function run_all_tests() {
	try {
		test_ligand_values();
	} catch(Error) {
		console.log("Test failed");
		throw Error;
	}
}