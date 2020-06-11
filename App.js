import React, { useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import CustomButton from './src/components/CustomButton';
import { MathBuffer, POW } from '@mateusznejman/mathparser-js';

export default function App() {
  const [bufferState, setBufferState] = React.useState('');
  const [historyBufferState, setHistoryBufferState] = React.useState('');
  const [mathBuffer, setMathBuffer] = React.useState(new MathBuffer());
  const [tempBuffer, setTempBuffer] = React.useState('');
  const historyScrollRef = useRef(null);

  {/* TODO: Add method for build operation text */ }
  const clearBuffer = () => {
    setBufferState('');
    mathBuffer.buffer = "";
    setTempBuffer('');
  };
  const removeLast = () => {
    if (bufferState.length > 0) {
      setBufferState(bufferState.substr(0, bufferState.length - 1));
      setTempBuffer(mathBuffer.Eval(true));
      mathBuffer.buffer = mathBuffer.buffer.substr(0, mathBuffer.buffer.length - 1);
    }
  }

  const historyAdd = item => {
    const lastNewLine = historyBufferState.lastIndexOf('\n');
    let newValue = historyBufferState.substr(0,lastNewLine);
    setHistoryBufferState(newValue + "\n" + item + "\n");
  }
  const addToBuffer = (value) => {
    setBufferState(mathBuffer.Add(value));
    setTempBuffer(mathBuffer.Eval(true));
  }
  const calculate = () => {
    if(mathBuffer.buffer.length > 0)
    {
      let calculated = mathBuffer.Eval();

      if ((typeof calculated == "string" && calculated.includes("Error")) || calculated == undefined)
        calculated = "Błąd";

      if(calculated == Infinity)
      calculated = "Błąd";
  
      //setHistoryBufferState(historyBufferState + "\n" + bufferState + " = " + calculated);
      historyAdd(bufferState + " = " + calculated);
      setBufferState("");
      setTempBuffer("");
      mathBuffer.buffer = "";
  
      historyScrollRef.current.scrollToEnd({ animated: false });
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.historyContainer}>
        <ScrollView ref={historyScrollRef}>
          <Text style={styles.historyText}>{historyBufferState}</Text>
        </ScrollView>
      </View>
      <View style={styles.calcContainer}>
        <Text style={styles.text1}>{bufferState}</Text>
        <Text style={styles.text2}>{tempBuffer}</Text>
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
        <CustomButton text="" mode="2" />
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
  text1: {
    color: 'white',
    fontSize: 25
  },
  text2: {
    color: 'gray',
    fontSize: 25
  },
  historyText: {
    color: 'gray',
    fontSize: 46
  }
});