import { Text, View, TouchableOpacity, Animated } from "react-native";
import { useState, useEffect, useRef } from "react";
import AddTask from "./modals/AddTask";
import { Ionicons } from "@expo/vector-icons"; // Example icon lib, replace with your icons or remove

export default ({ tasks, setTasks }) => {
  const [showDescr, setShowDescr] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowDescr({
      Completed: tasks.filter((task) => task.completed).map(() => false),
      Incomplete: tasks.filter((task) => !task.completed).map(() => false),
    });
  }, [tasks]);

  const categories = [
    { title: "Completed", filter: true },
    { title: "Incomplete", filter: false },
  ];

  // Animated scale for buttons on press
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

  return (
    <View className="flex-1 bg-white p-6">
      <AddTask
        tasks={tasks}
        setTasks={setTasks}
        show={showModal}
        setShow={setShowModal}
      />

      <View className={showModal ? "opacity-20" : "opacity-100"}>
        {/* Header with gradient background accent */}
        <View
          style={{
            backgroundColor: "#1E40AF",
            borderRadius: 12,
            paddingVertical: 18,
            paddingHorizontal: 20,
            marginBottom: 20,
            shadowColor: "#1E40AF",
            shadowOpacity: 0.25,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 5 },
          }}
        >
          <Text className="text-3xl font-extrabold text-white tracking-wide">
            Your Tasks
          </Text>
          <Text className="mt-1 text-blue-200 font-medium">
            Keep track of your daily goals
          </Text>
        </View>

        {/* Empty state */}
        {tasks.length === 0 && (
          <View
            style={{
              borderWidth: 2,
              borderColor: "#93C5FD",
              borderStyle: "dashed",
              borderRadius: 14,
              padding: 20,
              alignItems: "center",
            }}
          >
            <Ionicons name="clipboard-outline" size={48} color="#60A5FA" />
            <Text className="italic text-blue-500 text-lg mt-3 text-center max-w-xs">
              You don’t have any tasks yet — let’s change that!
            </Text>
          </View>
        )}

        {/* Tasks list */}
        {tasks.length > 0 && (
          <View className="space-y-10">
            {categories.map((category, categoryIdx) => {
              const filteredTasks = tasks.filter(
                (task) => task.completed === category.filter
              );

              return (
                <View key={categoryIdx}>
                  <View
                    style={{
                      borderBottomWidth: 2,
                      borderColor: "#93C5FD",
                      marginBottom: 12,
                      paddingBottom: 4,
                    }}
                  >
                    <Text className="text-xl font-semibold text-[#1E40AF] tracking-wide">
                      {category.title}
                    </Text>
                  </View>

                  {filteredTasks.length === 0 && (
                    <Text className="text-blue-400 italic text-center py-6">
                      No tasks in this category.
                    </Text>
                  )}

                  {filteredTasks.map((task, idx) => (
                    <View
                      key={idx}
                      style={{
                        backgroundColor: "#F3F4F6",
                        padding: 16,
                        borderRadius: 14,
                        marginBottom: 12,
                        shadowColor: "#2563EB",
                        shadowOpacity: 0.1,
                        shadowRadius: 8,
                        shadowOffset: { width: 0, height: 3 },
                        maxHeight: showDescr[category.title]?.[idx]
                          ? 400
                          : 140,
                        overflow: "hidden",
                        transitionDuration: "300ms",
                      }}
                    >
                      <View className="flex-row justify-between items-start">
                        <View className="flex-1 pr-3">
                          <View className="flex-row items-center mb-1">
                            <Ionicons
                              name={
                                category.filter
                                  ? "checkmark-circle"
                                  : "time-outline"
                              }
                              size={20}
                              color={category.filter ? "#2563EB" : "#3B82F6"}
                              style={{ marginRight: 6 }}
                            />
                            <Text className="text-lg font-bold text-[#1E40AF]">
                              {task.title}
                            </Text>
                          </View>
                          <Text
                            className={`text-sm ${
                              new Date() > new Date(task.dueDate) &&
                              !task.completed
                                ? "text-red-500"
                                : "text-blue-700"
                            } ${task.completed ? "opacity-50" : ""}`}
                          >
                            Due {task.dueDate}
                          </Text>

                          <TouchableOpacity
                            onPress={() =>
                              setShowDescr((prev) => {
                                const newState = { ...prev };
                                newState[category.title] = [
                                  ...prev[category.title],
                                ];
                                newState[category.title][idx] =
                                  !newState[category.title][idx];
                                return newState;
                              })
                            }
                          >
                            <Text className="text-sm text-blue-600 mt-2 font-semibold">
                              {showDescr[category.title]?.[idx]
                                ? "Hide Description"
                                : "Show Description"}
                            </Text>
                          </TouchableOpacity>
                        </View>

                        <View className="flex-row gap-2 items-center">
                          <TouchableOpacity
                            onPressIn={onPressIn}
                            onPressOut={onPressOut}
                            onPress={() => {
                              let newTasks = tasks.filter(
                                (_, taskIdx) => taskIdx !== idx
                              );
                              setTasks(newTasks);

                              setShowDescr((prev) => {
                                const newState = { ...prev };
                                newState[category.title] =
                                  prev[category.title].filter(
                                    (_, i) => i !== idx
                                  );
                                return newState;
                              });
                            }}
                            style={{
                              borderWidth: 1,
                              borderColor: "#DC2626",
                              paddingHorizontal: 14,
                              paddingVertical: 8,
                              borderRadius: 10,
                            }}
                          >
                            <Text className="text-sm font-bold text-red-600">
                              Remove
                            </Text>
                          </TouchableOpacity>

                          {!task.completed && (
                            <TouchableOpacity
                              onPressIn={onPressIn}
                              onPressOut={onPressOut}
                              onPress={() => {
                                let updatedTasks = tasks.map((t) =>
                                  t === task ? { ...t, completed: true } : t
                                );
                                setTasks(updatedTasks);
                              }}
                              style={{
                                borderWidth: 1,
                                borderColor: "#2563EB",
                                paddingHorizontal: 14,
                                paddingVertical: 8,
                                borderRadius: 10,
                              }}
                            >
                              <Text className="text-sm font-bold text-blue-600">
                                Complete
                              </Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      </View>

                      {showDescr[category.title]?.[idx] && (
                        <View className="mt-4">
                          <Text className="text-sm text-blue-800 font-semibold mb-1">
                            Description:
                          </Text>
                          <Text className="text-sm text-[#1E40AF]">
                            {task.description}
                          </Text>
                        </View>
                      )}
                    </View>
                  ))}
                </View>
              );
            })}
          </View>
        )}

        <TouchableOpacity
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          onPress={() => setShowModal(true)}
          style={{
            backgroundColor: "#2563EB",
            marginTop: 28,
            paddingVertical: 16,
            borderRadius: 16,
            alignItems: "center",
            shadowColor: "#2563EB",
            shadowOpacity: 0.4,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 5 },
          }}
        >
          <Text className="text-white font-bold text-lg tracking-wide">
            + Add New Task
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
