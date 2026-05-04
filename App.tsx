import { StatusBar } from "expo-status-bar";
import { useReducer, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const listener = (state: any, action: any) => {
    switch (action.type) {
      case "add-new-task":
        return {
          tasks: [
            ...state.tasks,
            {
              id: Date.now().toString(),
              name: action.inputValue,
              isDone: false,
              selected: false,
            },
          ],
        };

      case "toggle-select-task":
        return {
          tasks: state.tasks.map((task: any) =>
            task.id === action.id
              ? { ...task, selected: !task.selected }
              : task,
          ),
        };

      case "delete-selected-tasks":
        return {
          tasks: state.tasks.filter((task: any) => !task.selected),
        };

      default:
        return state;
    }
  };

  const [inputValue, setInputValue] = useState("");
  const [state, dispatch] = useReducer(listener, { tasks: [] });

  const handleAddTask = () => {
    if (!inputValue.trim()) return;
    dispatch({ type: "add-new-task", inputValue });
    setInputValue("");
  };

  const handleDelete = () => {
    dispatch({ type: "delete-selected-tasks" });
    console.log(state.tasks);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inline}>
        <TextInput
          style={styles.enter}
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
        />
        <Button title="Adicionar" onPress={handleAddTask} />
      </View>

      {state.tasks.map((task: any) => (
        <TouchableOpacity
          key={task.id}
          onPress={() => dispatch({ type: "toggle-select-task", id: task.id })}
        >
          <Text
            style={[
              styles.enter,
              {
                marginTop: 10,
                backgroundColor: task.selected ? "#ffaaaa" : "#4afcfc",
              },
            ]}
          >
            {task.name}
          </Text>
        </TouchableOpacity>
      ))}

      <View style={{ marginTop: 20 }}>
        <Button title="Excluir selecionadas" onPress={handleDelete} />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#971ee7",
    alignItems: "center",
    justifyContent: "center",
  },
  inline: {
    flexDirection: "row",
  },
  enter: {
    borderColor: "#fff",
    borderWidth: 1,
    width: 160,
    color: "black",
    padding: 5,
  },
});
