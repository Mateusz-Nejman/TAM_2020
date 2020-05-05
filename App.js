import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import CustomButton from './src/components/CustomButton';

export default function App() {
  const [bufferState, setBufferState] = React.useState('');
  const [displayBuffer, setDisplayBufferState] = React.useState('');
  const [memoryState, setMemoryState] = React.useState(0.0);
  const [historyBufferState, setHistoryBufferState] = React.useState('');
  const [isError, setIsError] = React.useState(false);

  {/* TODO: Add method for build operation text */ }
  const clearBuffer = () => {
    setBufferState('');
    setIsError(false);
  };
  const removeLast = () => {
    if (bufferState.length > 0) {
      setBufferState(bufferState.substr(0, bufferState.length - 1));
      
    }
    setDisplayBufferState(bufferState.replace("√", "math.sqrt("));
  }
  const addToBuffer = (value) => {
    if (!isError) {
      setBufferState(bufferState + value);
      
    }
    setDisplayBufferState(bufferState.replace('√', 'math.sqrt('));

  }
  const calculate = () => {
    setDisplayBufferState(bufferState.replace('√', 'math.sqrt('));
    const calculatedValue = parseCalculateString(displayBuffer);

    if (typeof calculatedValue == "string" && calculatedValue.includes("Błąd"))
      setIsError(true);
    else
      setMemoryState(calculatedValue);

    setHistoryBufferState(bufferState + " = " + calculatedValue);
    setBufferState("");
  }

  return (
    <View style={styles.container}>
      <View style={styles.aboutContainer}>

      </View>
      <View style={styles.historyContainer}>
        <Text style={styles.historyText}>{historyBufferState}</Text>
      </View>
      <View style={styles.calcContainer}>
        <Text style={styles.text}>{bufferState}</Text>
      </View>
      <View style={styles.buttonsRow}>
        <CustomButton text="√" mode="1" onTap={() => addToBuffer("√")} />
        <CustomButton text="AC" mode="2" onTap={clearBuffer} />
        <CustomButton text="D" mode="2" onTap={removeLast} />
        <CustomButton text="%" mode="2" onTap={() => addToBuffer("%")} />
        <CustomButton text="/" mode="2" onTap={() => addToBuffer("/")} />
      </View>
      <View style={styles.buttonsRow}>
        <CustomButton text="(" mode="1" onTap={() => addToBuffer("(")} />
        <CustomButton text="7" onTap={() => addToBuffer("7")} />
        <CustomButton text="8" onTap={() => addToBuffer("8")} />
        <CustomButton text="9" onTap={() => addToBuffer("9")} />
        <CustomButton text="x" mode="2" onTap={() => addToBuffer("x")} />
      </View>
      <View style={styles.buttonsRow}>
        <CustomButton text=")" mode="1" onTap={() => addToBuffer(")")} />
        <CustomButton text="4" onTap={() => addToBuffer("4")} />
        <CustomButton text="5" onTap={() => addToBuffer("5")} />
        <CustomButton text="6" onTap={() => addToBuffer("6")} />
        <CustomButton text="-" mode="2" onTap={() => addToBuffer("-")} />
      </View>
      <View style={styles.buttonsRow}>
        <CustomButton text="π" mode="1" onTap={() => addToBuffer("π")} />
        <CustomButton text="1" onTap={() => addToBuffer("1")} />
        <CustomButton text="2" onTap={() => addToBuffer("2")} />
        <CustomButton text="3" onTap={() => addToBuffer("3")} />
        <CustomButton text="+" mode="2" onTap={() => addToBuffer("+")} />
      </View>
      <View style={styles.buttonsRow}>
        <CustomButton text="^" mode="1" onTap={() => addToBuffer("^")} />
        <CustomButton text="MEM" mode="2" onTap={() => addToBuffer(memoryState)} />
        <CustomButton text="0" onTap={() => addToBuffer("0")} />
        <CustomButton text="." onTap={() => addToBuffer(".")} />
        <CustomButton text="=" mode="2" onTap={calculate} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  calcContainer: {
    flex: 1,
    backgroundColor: 'black',
    borderBottomColor: '#646464',
    borderBottomWidth: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  historyContainer: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  aboutContainer: {
    flex: 2,
    backgroundColor: 'black'
  },
  buttonsRow: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#161616'
  },
  text: {
    color: 'white',
    fontSize: 50
  },
  historyText: {
    color: 'gray',
    fontSize: 46
  }
});


const parseCalculateString = calculateString => {
  console.log(calculateString);
  let returnValue = "";
  calculateString = calculateString.replace("π", Math.PI).replace('+-', '-').replace('-+', '-').replace('--', '+').replace("*+", "*").replace("/+", "/").replace("^+", "^").replace("√+", "√").replace("x", "*").replace('√','Math.sqrt');

  const signs = ["x*/^%√"];
  const signs1 = ["+-"];

  const charArray = calculateString.split('');

  charArray.forEach((element, index) => {
    if (index < charArray.length - 1) {
      let char1 = charArray[index];
      let char2 = charArray[index + 1];

      if ((signs.includes(char2) && signs1.includes(char1)) || (signs.includes(char1) && signs.includes(char2)))
        returnValue = "Błąd";
    }
  });

  try {
    console.log(calculateString);
    returnValue = eval(calculateString);
  }
  catch (err) {
    returnValue = "Błąd";
  }


  return returnValue;


  //()^s*/+-
  //verify
}