import React, { useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import CustomButton from './src/components/CustomButton';
import { LeftSide, RightSide } from './src/logic/MathParser';

export default function App() {
  const [bufferState, setBufferState] = React.useState('');
  const [memoryState, setMemoryState] = React.useState(0.0);
  const [historyBufferState, setHistoryBufferState] = React.useState('');
  const [isError, setIsError] = React.useState(false);

  const historyScrollRef = useRef(null);

  {/* TODO: Add method for build operation text */ }
  const clearBuffer = () => {
    setBufferState('');
    setIsError(false);
  };
  const removeLast = () => {
    if (bufferState.length > 0) {
      setBufferState(bufferState.substr(0, bufferState.length - 1));
    }
  }
  const addToBuffer = (value) => {
    if (!isError) {
      const chars = "+-/^x√%";
      const brackets = "().";
      const lastChar = bufferState.substr(bufferState.length - 1, 1);
      if (value == ".") {
        if (chars.includes(lastChar) || lastChar == "(")
          value = "0.";
        else if (brackets.includes(lastChar))
          value = "";
      }
      else if (chars.includes(value) && chars.includes(lastChar))
        value = "";
      setBufferState(bufferState + value);
    }
  }
  const calculate = () => {
    const calculated = parseCalculate(bufferState);

    if (typeof calculated == "string" && calculated.includes("Błąd"))
      setIsError(true);
    else if (calculated != undefined)
      setMemoryState(calculated);

    setHistoryBufferState(historyBufferState + "\n" + bufferState + " = " + calculated);
    setBufferState("");

    historyScrollRef.current.scrollToEnd({ animated: false });
  }

  return (
    <View style={styles.container}>
      <View style={styles.historyContainer}>
        <ScrollView ref={historyScrollRef}>
          <Text style={styles.historyText}>{historyBufferState}</Text>
        </ScrollView>
      </View>
      <View style={styles.calcContainer}>
        <Text style={styles.text}>{bufferState}</Text>
      </View>
      <View style={styles.buttonsRow}>
        <CustomButton text="√" mode="1" onTap={() => addToBuffer("√(")} />
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
    flex: 3,
    backgroundColor: 'black',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
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

const parseCalculate = calculateString => {
  const encoded = calculateString.replace("√", "Math.sqrt").replace("x", "*").replace("π", Math.PI);
  var percentChanger = encoded;

  while (true) {
    if (percentChanger.includes('%')) {
      const percentIndex = percentChanger.indexOf('%');
      const left = LeftSide(percentChanger, percentIndex);
      const leftTemp = left[1] == -1 ? "" : percentChanger.substr(0, left[1] + 1);
      const rightTemp = percentChanger.substr(percentIndex + 1);

      percentChanger = leftTemp + "(" + left[0] + "*0.01)" + rightTemp;
    }
    else
      break;
  }
  var powChanger = percentChanger;

  while (true) {
    if (powChanger.includes('^')) {
      const powIndex = powChanger.indexOf('^');
      const left = LeftSide(powChanger, powIndex);
      const right = RightSide(powChanger, powIndex);
      const leftTemp = powChanger.substr(0, left[1] + 1);
      const rightTemp = powChanger.substr(right[1]);

      powChanger = leftTemp + "Math.pow(" + left[0] + "," + right[0] + ")" + rightTemp;
    }
    else
      break;
  }

  try {
    return eval(powChanger);
  }
  catch
  {
    return "Błąd";
  }

}