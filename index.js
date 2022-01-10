const hexDigits = {
  A: 10,
  B: 11,
  C: 12,
  D: 13,
  E: 14,
  F: 15,
  10: "A",
  11: "B",
  12: "C",
  13: "D",
  14: "E",
  15: "F",
};

// ! Decimal to Other Function ---------------------------------------------------------------------------

function decimalToOther(decimalValue, base) {
  // Maybe binary, octal or hexadecimal
  let otherValue = "";

  while (decimalValue != 0) {
    let remainder = decimalValue % base;
    decimalValue = Math.floor(decimalValue / base);

    // Checks if a number is greater than 10 in hexadecimal
    if (base == 16 && remainder % base > 10) {
      otherValue += hexDigits[remainder];
    } else {
      otherValue += remainder;
    }
  }

  otherValue = otherValue.split("").reverse().join("");

  if (base == 2) {
    otherValue = `0b${otherValue}`;
  }
  if (base == 8) {
    otherValue = `0o${otherValue}`;
  }

  if (base == 16) {
    otherValue = `0x${otherValue}`;
  }

  return otherValue;
}

// ! ---------------------------------------------------------------------------

// ! Binary Functions ---------------------------------------------------------------------------

function binaryToDecimal(value) {
  let binaryValue = 0;

  let arr = value.toString().split("").reverse();

  for (let i = 0; i < arr.length; i++) {
    // Checks if the value is 1
    if (parseFloat(arr[i])) {
      binaryValue += 2 ** i;
    }
  }

  return binaryValue;
}

function binaryToOctal(value) {
  return decimalToOther(binaryToDecimal(value), 8);
}

function binaryToHex(value) {
  return decimalToOther(binaryToDecimal(value), 16);
}

// ! ---------------------------------------------------------------------------

// ! Octal Functions ---------------------------------------------------------------------------

function octalToDecimal(value) {
  let arr = value.toString().split("");

  let octalAsBinary = "";
  // Converts the number to Binary

  arr.forEach((val) => {
    let valueArr = decimalToOther(val, 2).match(/\d/g);
    valueArr.shift();

    // Converts all binary digits to 4 bit numbers ex:- 01 to 0001
    while (valueArr.length < 3) {
      valueArr.unshift("0");
    }

    octalAsBinary += valueArr.join("");
  });

  let octalValue = binaryToDecimal(octalAsBinary);
  return octalValue;
}

function octalToBinary(value) {
  return decimalToOther(octalToDecimal(value), 2);
}

function octalToHex(value) {
  return decimalToOther(octalToDecimal(value), 16);
}

// ! ---------------------------------------------------------------------------

// ! Hexadecimal Functions // ---------------------------------------------------------------------------

function hexToDecimal(value) {
  let arr = value.toString().split("");

  // A new array which contains digits 10, 11... 15
  let valueArr = [];

  arr.forEach((digit) => {
    // Checks if a digits matches a specific hex only digit ex:- A,B,C,D,E,F
    Object.keys(hexDigits).forEach((key) => {
      if (digit == key) {
        digit = hexDigits[digit];
      }
    });
    valueArr.push(digit);
  });

  let hexAsBinary = "";

  valueArr.forEach((val) => {
    // Converts the seperate digits to binary
    let arr = decimalToOther(val, 2).match(/\d/g);
    arr.shift();

    // Converts all binary digits to 4 bit numbers ex:- 01 to 0001
    while (arr.length < 4) {
      arr.unshift("0");
    }

    hexAsBinary += arr.join("");
  });

  let hexValue = binaryToDecimal(hexAsBinary);
  return hexValue;
}

function hexToBinary(value) {
  return decimalToOther(hexToDecimal(value), 2);
}

function hexToOctal(value) {
  return decimalToOther(hexToDecimal(value), 8);
}

// ! ---------------------------------------------------------------------------

console.log(octalToBinary(10));
console.log(octalToDecimal(2277556310));
console.log(decimalToOther(hexToDecimal("12FEDCC8"), 16));
console.log(hexToOctal("F"));
