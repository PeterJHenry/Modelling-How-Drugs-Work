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

function test_custom_ligands() {
	// Test that custom ligands don't accept values outside the range of 3-10.
	// This takes a long time to run.
	console.log("Testing custom ligand values....")
	// For each dropdown element
	$('.leftInput > select').each(function(i, obj) {
		// For each custom ligand.
		for(var i=10; i<12; i++) {
			$(obj).val(i);
			$(obj).change(); // Manually fire change event.
			// For each value input 
			$(obj).parent().parent().siblings().each(function(j, obj) {
				for (var i=-1; i<15; i++) {
					// Assert values are always between 3 and 10
					expectedValue = Math.max(Math.min(i, 10), 3);
					$(obj).children().first().val(i);
					$(obj).children().first().change(); // Manually fire change event.
					value = $(obj).children().first().val();
					assert(value == expectedValue, "Got " + value + " expected " + expectedValue);
				}
			});
		}
	});
	console.log("Test passed!");
}

function run_all_tests() {
	try {
		test_ligand_values();
		test_custom_ligands();
	} catch(Error) {
		console.log("Test failed");
		throw Error;
	}
}