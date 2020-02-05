/*
Copyright Oscar Litorell 2018

This program translates a string of numbers to the number written in English
using words instead of digits.
*/


//This function returns a reversed copy of an array.
function reverseArray(array) {
	var tempArray = [];
	tempArray.reverse();
	return tempArray;
};

// This function reverses a string.
function reverseString(text) {
	text = String(text).split();
	text.reverse();
	return text;
}

// This function adds leading zeros to a string.
// Example:
// pad(23, 4) returns "0023"
function pad(number, size) {
	number = String(number);
	while (number.length < size) {
		number = "0" + String(number);
	}
	return number;
}

var numbers = "0123456789";

var units = [
	"zero",
	"one",
	"two",
	"three",
	"four",
	"five",
	"six",
	"seven",
	"eight",
	"nine",
	"ten",
	"eleven",
	"twelve",
	"thirteen",
	"fourteen",
	"fifteen",
	"sixteen",
	"seventeen",
	"eighteen",
	"nineteen"
];

var tens = [
	"",
	"ten",
	"twenty",
	"thirty",
	"forty",
	"fifty",
	"sixty",
	"seventy",
	"eighty",
	"ninety"
]



// The ways to write latin numbers between 1 and 10.
// llion or illiard is later appended to the end.
var firstIllions = [
	"",
	"mi",
	"bi",
	"tri",
	"quadri",
	"quinti",
	"sexti",
	"septi",
	"octi",
	"noni",
	"deci"
];



// Each item in units, tens and hundreds represents how to say that number in
// Latin. The second value contains infirmation about how preceding words
// will have to be modified.

// https://en.wikipedia.org/wiki/Names_of_large_numbers#Extensions_of_the_standard_dictionary_numbers

// When preceding a component marked s or x, "tre" changes to "tres" and "se" to
// "ses" or "sex".

// When preceding a component marked M or N, "septe" and "nove" change to
// "septem" and novem" or "septen" and "noven".
var latinNumbers = {
	units: [
		["",							""],
		["un",						""],
		["duo",						""],
		["tre",						""],
		["quattuor",			""],
		["quinqua",				""],
		["se",						""],
		["septe",					""],
		["octo",					""],
		["nove",					""]
	],
	tens: [
		["",							""],
		["deci",					"n"],
		["viginti",				"ms"],
		["triginta",			"ns"],
		["quadraginta",		"ns"],
		["quinquaginta",	"ns"],
		["sexaginta",			"n"],
		["septuaginta",		"n"],
		["octoginta",			"mx"],
		["nonaginta",			""]
	],
	hundreds: [
		["",							""],
		["centi",					"nx"],
		["ducenti",				"n"],
		["trecenti",			"ns"],
		["quadringenti",	"ns"],
		["quingenti",			"ns"],
		["sescenti",			"n"],
		["septingenti",		"n"],
		["octingenti",		"mx"],
		["nongenti",			""]
	]
};


// This function returns the English name of a number between zero and
// one thousand.
function hundredsToText(number) {
	number = pad(number, 3);
	total = "";

	// Add the amount of hundreds and "hundred" to total if there are any
	// hundreds.
	if (number[0] !== "0") {
		total += units[Number(number[0])] + " hundred ";
	}
	// If there is only one or no tens:
	if (number[1] == "1" || (number[1] == "0" && number[2] !== "0")) {
		// Append the English name of the last two numbers to total.
		total += units[Number(number.substring(1))];
		total += " ";

		// If tens or units exist:
	} else if (String(number).substring(1) !== "00") {

		// Append the English name of the amount of tens to total.
		total += tens[number[1]];

		// If units exist:
		if (number[2] !== "0") {
			// Append "-" and the English name of the amount of units to
			// total.
			total += "-" + units[number[2]];
		}
		total += " ";
	}
	return total;
}

// Returns the Latin name for a number between 1 and 10.
// Example:
// hundredsToLatinText(123) -> "tresviginticenti"
// You would later append "llion" or "lliard" to this.
// https://en.wikipedia.org/wiki/Names_of_Large_numbers
function hundredsToLatinText(number) {
	number = pad(number, 3);
	var total = "";

	// If the number is less than ten, append the Latin name for that number to
	// total.

	// Example:
	// hundredsToLatinText(4) -> "quadri"

	// Note: the Latin name for units is different if tens or hundreds don't
	// exist.
	if (number.substring(0, 2) == "00") {
		total += firstIllions[number[2]];

	} else {
		// If units exist, append the Latin name of them to total.
		if (number[2] !== "0"){
			total += latinNumbers.units[number[2]][0];
			if (number[1] == "0") {
				// If the units are followed by tens:
				// Hard to explain, easier to show an example:
				// If the tens value is 8, set succeedingOptions to ["m", "x"] or
				// according to latinNumbers.
				var succeedingOptions = latinNumbers.hundreds[number[0]][1].split("");
			} else {
				var succeedingOptions = latinNumbers.tens[number[1]][1].split("");
			}

			if (number[2] == "3") {
				// If the units value of number is 3, and the preceding component is
				// marked s or x (according to latinNumbers), append s to total.
				if (succeedingOptions.includes("s") || succeedingOptions.includes("x")) {
					total += "s";
				}
			} else if (number[2] == "6") {
				// Same as for 3 in the option above, but for 6. Difference is that it
				// appends s OR x depending on the value of succeedingOptions.
				if (succeedingOptions.includes("s")) {
					total += "s";
				} else if (succeedingOptions.includes("x")) {
					total += "x";
				}
			} else if (["7", "9"].includes(number[2])) {
				// Same as for 3 in the option above, but for 7 and 9. Difference is
				// that it appends m or n instead.
				if (succeedingOptions.includes("m")) {
					total += "m";
				} else if (succeedingOptions.includes("n")) {
					total += "n";
				}
			}
		}
		// Append the Latin name for the tens and the hundreds to total.
		total += latinNumbers.tens[number[1]][0] + latinNumbers.hundreds[number[0]][0];
	}

	// Set the last character to "i" if the number is not 0.
	// Needed because hundredsToLatinText(80) should return octoginti instead of
	// octaginta.
	if (total.length > 0) {
		total = total.substring(0, total.length - 1) + "i";
	}
	return total;
}

// Takes in a string and returns a string of only the numbers.
function onlyNumbers(num) {
	num = String(num);
	var total = "";
	for (var i = 0; i < num.length; i++) {
		if (numbers.includes(num[i])) {
			total += num[i];
		}
	}
	return total;
}

// Takes in a string of integers and returns a string of the English names of
// those integers separated by spaces.
function writeDecimals(num) {
	var total = "";
	for (var i = 0; i < num.length; i++) {
		total += units[num[i]] + " ";
	}
	return total;
}

// Converts a number to the short scale representation of that number.
// Takes in am array of digits grouped in tree, i.e.
// ["678", "345", "12"] (represents 12345678)
// Will return an array containing the English name for the number and a boolean
// for if the number is too large.
function convertShort(numList) {
	var total = "";

	// Set numLength to the total amount if digits in numList.
	var numLength = String(numList.join("")).length;

	if (numLength > 3003) {
		// If the number is too large to be written using the short scale system
		return ["", true];
	} else {
		if (numList.length == 0 || (numList.length == 1 && numList[0] == 0)) {
			// If the number is 0, append "zero" to total
			total += "zero ";
		} else {
			// For each set of three numbers in numList, beginning from the back:
			// (Most significant first)
			for (var i = numList.length - 1; i >= 0; i--) {

				// Append the English name for that number section to total.
				total += hundredsToText(numList[i]);

				if (numList[i] != 0) {
					if (i > 1 ) {
						// Append the Latin name for the place that that section comes in
						// minus 1.
						total += hundredsToLatinText(i - 1) + "llion ";
					} else if (i == 1) {
						// Append "thousand " to total.
						total += "thousand ";
					}
				}
			}
		}
		return [total, false];
	}
}

// Converts a number to the long scale representation of that number.
// Takes in am array of digits grouped in tree, i.e.
// ["678", "345", "12"] (represents 12345678)
// Will return an array containing the English name for the number and a boolean
// for if the number is too large.
function convertLong(numList) {
	var total = "";

	// Set numLength to the total amount if digits in numList.
	var numLength = String(numList.join("")).length;

	if (numLength > 6000) {
		// If the number is too large to be written using the long scale system
		return ["", true];
	} else {
		if (numList.length == 0 || (numList.length == 1 && numList[0] == 0)) {
			// If the number is 0, append "zero" to total
			total += "zero ";
		} else {
			// Iterate through each set of three numbers in numList with the variable
			// i, beginning from the back (most significant section first):
			for (var i = numList.length - 1; i >= 0; i--) {

				// Append the English name for that number section to total.
				total += hundredsToText(numList[i]);

				if (numList[i] != 0) {
					if (i > 1 ) {
						total += hundredsToLatinText(Math.floor(i * 0.5));
						// Append the Latin name for (i divided by two and rounded down to
						// the nearest integer).
						if (i % 2 == 0) {
							// If i is even, append "illion " to
							// total.
							total += "llion ";
						} else {
							// Else:
							// If that number section is more tha one, append "illiards ",
							// else append "illiard".
							total += "lliard";
							if (Number(numList[i]) > 1) {
								total += "s";
							}
							total += " ";
						}
					} else if (i == 1) {
						// If i is 1, append "thousand " to total.
						total += "thousand ";
					}
				}
			}
		}
		return [total, false];
	}
}

// Takes in a number and a boolean that determines if the long or short scale
// should be used (true means short scale).
function convert(num, short=true) {
	var total = "";
	var numList = [];

	var text = String(num);

	// If the text variable begin with "-", append negative to total.
	if (text[0] == "-") {
		total += "negative ";
	}

	// If there is a decimal point:
	if (text.includes(".")) {
		// Store the characters before the first point in integer, and the ones
		// after in decimals.
		var integer = text.split(".", 1)[0];
		var decimals = text.substring(integer.length + 1);
	} else {
		// Set integer to text and decimal to "" because there are no decimal
		// points.
		var integer = text;
		var decimals = "";
	}
	// Remove all characters that aren't numbers from integer and decimals.
	var integer = onlyNumbers(integer);
	var decimals = onlyNumbers(decimals);

	// Remove leading zeros from integer
	for (i = 0; i < integer.length; i++) {
		if (integer[i] != 0) {
			integer = integer.substring(i);
			break;
		}
	}

	// Split the integer into sections of three with the least significant
	// sections first and store as an array in numList
	// Example:
	// "12345678" -> ["678", "345", "12"]
	if (integer !== "") {
		for (var i = integer.length; i > 0; i -= 3) {
			numList.push(integer.substring(i - 3, i));
		}
	}

	// Set result to the result of calling convertLong() or convertShort()
	// depending on whether short is true or false.
	// This will be an array where the first item is the English name for the
	// number and the second is a boolean which is true when the number is too
	// big.
	if (short) {
		var result = convertShort(numList);
	} else {
		var result = convertLong(numList);
	}
	total += result[0];

	// Append "point " and the decimals to total if there are any.
	if (decimals !== "") {
		total += "point ";
		total += writeDecimals(decimals);
	}

	// Set stringNumber to be a copy of numList, reverse it and make convert it to
	// a string.
	// Example:
	// ["678", "345", "12"] -> "12,345,678"
	var stringNumber = numList;
	stringNumber.reverse();
	stringNumber = String(stringNumber);

	// Set stringNumber to zero if it is empty.
	if (stringNumber == "") {
		stringNumber = "0";
	}
	// Append a decimal point and the decimals to stringNumber if there are any.
	if (decimals !== "") {
		stringNumber += "." + decimals;
	}
	// Set stringNumber to "-" + stringNumber if the first value of num is a minus
	// sign.
	if (num[0] == "-") {
		stringNumber = "-" + stringNumber;
	}

	// Return an object where text is a string with the English name for the
	// number entered, number is a string with the number the user entered but
	// better formatted and error is a boolean which is true is the number entered
	// was too big.
	return {
		text: total,
		number: stringNumber,
		error: result[1]
	};
}

// If the user clicks the "Convert to short scale" button
$("#convertShort").on("click", () => {
	text = $("#textBox").val();
	result = convert(text, true);

	// If the number is too big
	if (result.error) {
		// Write error message to the user
		$("#output").html("<p>The entered number is larger than 10<sup>3,003</sup>.\
		 Try a smaller one.</p>");
	} else {
		if (result.text !== "") {
			// Write out the result to the user
			$("#output").html("<p>" + result.number + " written with words using the \
			short scale is:</p><p class='result'>" + result.text + "</p>");
		}
	}
})

// If the user clicks the "Convert to long scale" button
$("#convertLong").on("click", () => {
	text = $("#textBox").val();
	result = convert(text, false);

	// If the number is too big
	if (result.error) {
		// Write error message to the user
		$("#output").html("<p>The entered number is larger than 10<sup>6,000</sup>.\
		 Try a smaller one.</p>");
	} else {
		if (result.text !== "") {
			// Write out the result to the user
			$("#output").html("<p>" + result.number + " written with words using the \
			long scale is:</p><p class='result'>" + result.text + "</p>");
		}
	}
})
