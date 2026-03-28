import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { Plus, Minus, X, Divide } from "lucide-react-native";
import Colors from "@/constants/colors";

export default function CalculatorScreen() {
  const [firstNumber, setFirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [operation, setOperation] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");

  const validateInputs = () => {
    if (firstNumber === "" || secondNumber === "") {
      setError("Please enter both numbers");
      return false;
    }

    if (isNaN(Number(firstNumber)) || isNaN(Number(secondNumber))) {
      setError("Please enter valid numbers");
      return false;
    }

    if (operation === "divide" && Number(secondNumber) === 0) {
      setError("Cannot divide by zero");
      return false;
    }

    setError("");
    return true;
  };

  const calculate = () => {
    if (!validateInputs()) return;

    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(secondNumber);

    let calculatedResult: number;

    switch (operation) {
      case "add":
        calculatedResult = num1 + num2;
        break;
      case "subtract":
        calculatedResult = num1 - num2;
        break;
      case "multiply":
        calculatedResult = num1 * num2;
        break;
      case "divide":
        calculatedResult = num1 / num2;
        break;
      default:
        setError("Please select an operation");
        return;
    }

    // Round to 4 decimal places to avoid floating point issues
    setResult(Math.round(calculatedResult * 10000) / 10000);
  };

  const clearCalculator = () => {
    setFirstNumber("");
    setSecondNumber("");
    setOperation("");
    setResult(null);
    setError("");
  };

  const selectOperation = (op: string) => {
    setOperation(op);
    setResult(null);
    setError("");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.calculatorContainer}>
          <Text style={styles.title}>Simple Calculator</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>First Number</Text>
            <TextInput
              style={styles.input}
              value={firstNumber}
              onChangeText={setFirstNumber}
              placeholder="Enter first number"
              placeholderTextColor={Colors.light.placeholder}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.operationsContainer}>
            <TouchableOpacity
              style={[
                styles.operationButton,
                operation === "add" && styles.selectedOperation,
              ]}
              onPress={() => selectOperation("add")}
            >
              <Plus
                size={24}
                color={
                  operation === "add"
                    ? Colors.light.buttonText
                    : Colors.light.primary
                }
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.operationButton,
                operation === "subtract" && styles.selectedOperation,
              ]}
              onPress={() => selectOperation("subtract")}
            >
              <Minus
                size={24}
                color={
                  operation === "subtract"
                    ? Colors.light.buttonText
                    : Colors.light.primary
                }
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.operationButton,
                operation === "multiply" && styles.selectedOperation,
              ]}
              onPress={() => selectOperation("multiply")}
            >
              <X
                size={24}
                color={
                  operation === "multiply"
                    ? Colors.light.buttonText
                    : Colors.light.primary
                }
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.operationButton,
                operation === "divide" && styles.selectedOperation,
              ]}
              onPress={() => selectOperation("divide")}
            >
              <Divide
                size={24}
                color={
                  operation === "divide"
                    ? Colors.light.buttonText
                    : Colors.light.primary
                }
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Second Number</Text>
            <TextInput
              style={styles.input}
              value={secondNumber}
              onChangeText={setSecondNumber}
              placeholder="Enter second number"
              placeholderTextColor={Colors.light.placeholder}
              keyboardType="numeric"
            />
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.calculateButton} onPress={calculate}>
              <Text style={styles.calculateButtonText}>Calculate</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.clearButton}
              onPress={clearCalculator}
            >
              <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Result:</Text>
            <View style={styles.resultBox}>
              <Text style={styles.resultText}>
                {result !== null ? result.toString() : "-"}
              </Text>
            </View>
          </View>

          {result !== null && (
            <View style={styles.expressionContainer}>
              <Text style={styles.expressionText}>
                {firstNumber} {operation === "add" && "+"}{" "}
                {operation === "subtract" && "-"} {operation === "multiply" && "×"}{" "}
                {operation === "divide" && "÷"} {secondNumber} = {result}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  calculatorContainer: {
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    padding: 24,
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: 24,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.light.background,
    borderRadius: 8,
    padding: 16,
    fontSize: 18,
    color: Colors.light.text,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  operationsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  operationButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderColor: Colors.light.primary,
  },
  selectedOperation: {
    backgroundColor: Colors.light.primary,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  calculateButton: {
    flex: 1,
    backgroundColor: Colors.light.secondary,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginRight: 8,
  },
  calculateButtonText: {
    color: Colors.light.buttonText,
    fontSize: 18,
    fontWeight: "600",
  },
  clearButton: {
    flex: 1,
    backgroundColor: Colors.light.background,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginLeft: 8,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  clearButtonText: {
    color: Colors.light.text,
    fontSize: 18,
    fontWeight: "600",
  },
  resultContainer: {
    marginTop: 24,
  },
  resultLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 8,
  },
  resultBox: {
    backgroundColor: Colors.light.background,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  resultText: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.light.text,
    textAlign: "right",
  },
  errorText: {
    color: Colors.light.error,
    marginTop: 8,
    marginBottom: 8,
    fontSize: 14,
  },
  expressionContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: Colors.light.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  expressionText: {
    fontSize: 16,
    color: Colors.light.text,
    textAlign: "center",
  },
});