import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";

export default function App() {
  const [dishName, setDishName] = useState("");
  const [dishDescription, setDishDescription] = useState("");
  const [dishPrice, setDishPrice] = useState("");
  const [dishCourse, setDishCourse] = useState("Hors d'oeuvres");
  const [searchText, setSearchText] = useState("");
  const [dishes, setDishes] = useState<any[]>([]);

  // Add new dish
  const handleSave = () => {
    if (!dishName.trim() || !dishDescription.trim() || !dishPrice.trim()) return;

    const newDish = {
      id: Date.now().toString(),
      name: dishName,
      description: dishDescription,
      price: dishPrice,
      course: dishCourse,
      image: "https://via.placeholder.com/100",
    };
    setDishes([newDish, ...dishes]);
    setDishName("");
    setDishDescription("");
    setDishPrice("");
    setDishCourse("Hors d'oeuvres");
  };

  // Clear all input fields
  const handleReset = () => {
    setDishName("");
    setDishDescription("");
    setDishPrice("");
    setDishCourse("Hors d'oeuvres");
  };

  // Delete all dishes
  const handleDeleteAll = () => {
    setDishes([]);
  };

  // Filtered list
  const filteredDishes = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderDish = ({ item }: { item: any }) => (
    <View style={styles.dishCard}>
      <View style={{ flex: 1 }}>
        <Text style={styles.dishTitle}>{item.name}</Text>
        <Text style={styles.dishDesc}>{item.description}</Text>
        <Text style={styles.dishPrice}>Price: R{item.price}</Text>
        <Text style={styles.dishCourse}>{item.course}</Text>
      </View>
      <Image source={{ uri: item.image }} style={styles.dishImage} />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Preset Menu */}
      <Text style={styles.title}>Preset Menu</Text>

      {filteredDishes.length > 0 ? (
        <FlatList
          data={filteredDishes}
          renderItem={renderDish}
          keyExtractor={(item) => item.id}
          style={{ marginBottom: 20 }}
        />
      ) : (
        <Text style={styles.noItems}>No dishes found.</Text>
      )}

      {/* Add new dish */}
      <Text style={styles.subtitle}>Add a New Dish</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="search" size={18} color="#888" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Search existing dishes..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Dish Name"
        value={dishName}
        onChangeText={setDishName}
      />
      <TextInput
        style={styles.input}
        placeholder="Dish Description"
        value={dishDescription}
        onChangeText={setDishDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Price (R)"
        keyboardType="numeric"
        value={dishPrice}
        onChangeText={setDishPrice}
      />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={dishCourse}
          onValueChange={(itemValue) => setDishCourse(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Hors d'oeuvres" value="Hors d'oeuvres" />
          <Picker.Item label="Appetizer" value="Appetizer" />
          <Picker.Item label="Main Course" value="Main Course" />
          <Picker.Item label="Dessert" value="Dessert" />
        </Picker>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Ionicons name="save" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
          <Ionicons name="refresh" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDeleteAll} style={styles.deleteButton}>
          <Ionicons name="trash" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f7f4f2",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginVertical: 10,
    color: "#4b2e2b",
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 15,
    color: "#4b2e2b",
  },
  noItems: {
    textAlign: "center",
    color: "#777",
    marginBottom: 20,
  },
  dishCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 6,
    borderRadius: 10,
    elevation: 2,
  },
  dishTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#4b2e2b",
  },
  dishDesc: {
    fontSize: 14,
    color: "#555",
  },
  dishPrice: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  dishCourse: {
    fontSize: 12,
    color: "#777",
    fontStyle: "italic",
  },
  dishImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginLeft: 10,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginVertical: 6,
    fontSize: 16,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    marginVertical: 6,
  },
  icon: {
    marginLeft: 10,
  },
  pickerContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginVertical: 6,
  },
  picker: {
    height: 45,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: "#2e7d32",
    padding: 15,
    borderRadius: 50,
  },
  resetButton: {
    backgroundColor: "#388e3c",
    padding: 15,
    borderRadius: 50,
  },
  deleteButton: {
    backgroundColor: "#c62828",
    padding: 15,
    borderRadius: 50,
  },
});
