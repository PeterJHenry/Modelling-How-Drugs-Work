function oneSubtypeTest() {
	validateCheckBox(0);
	return (receptorRelDenTableCell(0).value == "100");
}

function twoSubtypeTest() {
	validateCheckBox(0);
	validateCheckBox(1);
	return (receptorRelDenTableCell(0).value == "50" && receptorRelDenTableCell(1).value == "50");
}

function threeSubtypeTest() {
	validateCheckBox(0);
	validateCheckBox(1);
	validateCheckBox(2);
	return (receptorRelDenTableCell(0).value == "33.3" && receptorRelDenTableCell(1).value == "33.3" && receptorRelDenTableCell(2).value == "33.3");
}

function autocalculateTest() {
	validateCheckBox(0);
	validateCheckBox(1);
	receptorRelDenTableCell(0).value = 32;
	validateIndividualCell(0);
	return (receptorRelDenTableCell(1).value == 68);
}

function randomSubtypeTest() {
	for (var i = 0; i < 30; i++) {
		randomiseSubType();
		console.log(subtypeIndex,subtypePercentage);
	}
}