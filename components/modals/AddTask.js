import { Text, View, TextInput, TouchableOpacity, Animated } from "react-native";
import { useState, useRef } from "react";
import { Calendar } from "react-native-calendars";

export default ({ tasks, setTasks, show, setShow }) => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState(new Date().toISOString().split("T")[0]);
  const [descr, setDescr] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);

  const pressAnim = useRef(new Animated.Value(1)).current;
  const onPressIn = () =>
    Animated.spring(pressAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  const onPressOut = () =>
    Animated.spring(pressAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();

  if (!show) {
    // Don't render modal if not shown
    return null;
  }

  return (
    <View
      style={{
        position: "absolute",
        backgroundColor: "white",
        padding: 24,
        borderRadius: 20,
        width: "60%",
        height: "60%",
        top: "20%",
        left: "20%",
        shadowColor: "#1E40AF",
        shadowOpacity: 0.25,
        shadowRadius: 15,
        shadowOffset: { width: 0, height: 8 },
        elevation: 10,
        zIndex: 100, // Make sure it’s on top
      }}
    >
      <TouchableOpacity
        onPress={() => setShow(false)}
        style={{ marginBottom: 16 }}
      >
        <Text
          style={{
            fontStyle: "italic",
            color: "#2563EB",
            fontWeight: "600",
            fontSize: 16,
          }}
        >
          ← Go Back
        </Text>
      </TouchableOpacity>

      <Text
        style={{
          fontSize: 28,
          fontWeight: "900",
          color: "#1E40AF",
          marginBottom: 24,
        }}
      >
        Add New Task
      </Text>

      <View style={{ marginBottom: 20 }}>
        <Text
          style={{
            fontWeight: "700",
            fontStyle: "italic",
            color: "#3B82F6",
            marginBottom: 6,
            fontSize: 16,
          }}
        >
          Task Title:
        </Text>
        <TextInput
          placeholder="Enter task title"
          onChangeText={setTitle}
          value={title}
          style={{
            borderWidth: 1.5,
            borderColor: "#93C5FD",
            borderRadius: 12,
            paddingVertical: 10,
            paddingHorizontal: 14,
            fontSize: 16,
            color: "#1E40AF",
          }}
          clearButtonMode="while-editing"
        />
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text
          style={{
            fontWeight: "700",
            fontStyle: "italic",
            color: "#3B82F6",
            marginBottom: 10,
            fontSize: 16,
          }}
        >
          Due Date:{" "}
          <Text style={{ fontWeight: "600", color: "#1E40AF" }}>{dueDate}</Text>
        </Text>

        <TouchableOpacity
          onPress={() => setShowCalendar(!showCalendar)}
          style={{
            backgroundColor: "#2563EB",
            paddingVertical: 12,
            borderRadius: 14,
            alignItems: "center",
            marginBottom: 12,
            shadowColor: "#2563EB",
            shadowOpacity: 0.4,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 4 },
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "700",
              fontSize: 16,
              letterSpacing: 0.5,
            }}
          >
            {showCalendar ? "Hide Calendar" : "Pick a Date"}
          </Text>
        </TouchableOpacity>

        {showCalendar && (
          <Calendar
            onDayPress={(day) => {
              setDueDate(day.dateString);
              setShowCalendar(false);
            }}
            theme={{
              selectedDayBackgroundColor: "#2563EB",
              todayTextColor: "#2563EB",
              arrowColor: "#2563EB",
              monthTextColor: "#1E40AF",
              textSectionTitleColor: "#3B82F6",
              dayTextColor: "#1E40AF",
              textDisabledColor: "#A5B4FC",
            }}
            style={{
              borderRadius: 16,
              shadowColor: "#2563EB",
              shadowOpacity: 0.15,
              shadowRadius: 10,
              shadowOffset: { width: 0, height: 4 },
            }}
          />
        )}
      </View>

      <View style={{ marginBottom: 28 }}>
        <Text
          style={{
            fontWeight: "700",
            fontStyle: "italic",
            color: "#3B82F6",
            marginBottom: 6,
            fontSize: 16,
          }}
        >
          Description:
        </Text>
        <TextInput
          placeholder="Enter task description"
          onChangeText={setDescr}
          value={descr}
          multiline
          style={{
            borderWidth: 1.5,
            borderColor: "#93C5FD",
            borderRadius: 12,
            paddingVertical: 12,
            paddingHorizontal: 14,
            fontSize: 16,
            height: 90,
            textAlignVertical: "top",
            color: "#1E40AF",
          }}
        />
      </View>

      <Animated.View style={{ transform: [{ scale: pressAnim }] }}>
        <TouchableOpacity
          onPress={() => {
            if (!title.trim()) return;
            let new_task = {
              title: title.trim(),
              dueDate,
              description: descr.trim(),
              completed: false,
            };
            setTasks([...tasks, new_task]);
            setShow(false);
            setTitle("");
            setDescr("");
            setDueDate(new Date().toISOString().split("T")[0]);
          }}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          style={{
            backgroundColor: "#1E40AF",
            paddingVertical: 16,
            borderRadius: 18,
            alignItems: "center",
            shadowColor: "#1E40AF",
            shadowOpacity: 0.5,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 6 },
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "900",
              fontSize: 18,
              letterSpacing: 0.6,
            }}
          >
            Add Task
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};
