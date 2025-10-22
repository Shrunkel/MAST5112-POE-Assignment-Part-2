import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";

export default function App() {
  const [dishName, setDishName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [course, setCourse] = useState("Hors d'oeuvres");
  const [searchQuery, setSearchQuery] = useState("");
  const [menu, setMenu] = useState<any[]>([]);

  const courseOrder = [
    "Hors d'oeuvres",
    "Amuse-Bouche",
    "Soup",
    "Appetizer",
    "Salad",
    "Fish",
    "First Main Course",
    "Palate Cleanser",
    "Second Main Course",
    "Cheese Course",
    "Dessert",
    "Mignardise",
  ];

  const filteredMenu = menu.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSave = () => {
    if (!dishName.trim() || !price.trim()) return;
    const newDish = {
      id: Date.now().toString(),
      name: dishName,
      description,
      price: `R${price}`,
      course,
    };
    setMenu([...menu, newDish]);
    setDishName("");
    setDescription("");
    setPrice("");
    setCourse("Hors d'oeuvres");
  };

  const handleReset = () => {
    setDishName("");
    setDescription("");
    setPrice("");
    setCourse("Hors d'oeuvres");
  };

  const handleDelete = () => {
    setMenu([]);
  };

  // Group and sort menu by course order
  const groupedMenu = filteredMenu.reduce((acc: any, item) => {
    if (!acc[item.course]) acc[item.course] = [];
    acc[item.course].push(item);
    return acc;
  }, {} as Record<string, any[]>);
  const sortedCourses = courseOrder.filter((c) => groupedMenu[c]);

  return (
    <ImageBackground
      source={require("./assets/whiteMarble.jpg")}
      style={styles.background}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity>
            <Ionicons name="arrow-back" size={26} color="white" />
          </TouchableOpacity>
          <Image
            source={require("./assets/cookLogo.png")}
            style={styles.logo}
          />
        </View>
        <Text style={styles.headerText}>Preset Menu</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* MENU DISPLAY */}
      <ScrollView style={styles.menuContainer}>
        {sortedCourses.length === 0 ? (
          <Text style={styles.emptyText}>No dishes found.</Text>
        ) : (
          sortedCourses.map((courseName) => (
            <View key={courseName} style={{ marginBottom: 16 }}>
              <Text style={styles.courseTitle}>{courseName}</Text>
              {groupedMenu[courseName].map((dish) => (
                <View key={dish.id} style={styles.dishItem}>
                  <Text style={styles.dishName}>{dish.name}</Text>
                  {dish.description ? (
                    <Text style={styles.dishDesc}>{dish.description}</Text>
                  ) : null}
                  <Text style={styles.dishPrice}>{dish.price}</Text>
                </View>
              ))}
            </View>
          ))
        )}
      </ScrollView>

      {/* FORM */}
      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Add a New Dish</Text>

        <View style={styles.inputContainer}>
          <Ionicons
            name="search"
            size={18}
            color="#777"
            style={{ marginRight: 6 }}
          />
          <TextInput
            style={styles.input}
            placeholder="Search existing dishes..."
            value={searchQuery}
            onChangeText={setSearchQuery}
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
          value={description}
          onChangeText={setDescription}
        />

        <TextInput
          style={styles.input}
          placeholder="Price (R)"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={course}
            style={styles.picker}
            onValueChange={(itemValue) => setCourse(itemValue)}
          >
            {courseOrder.map((c) => (
              <Picker.Item key={c} label={c} value={c} />
            ))}
          </Picker>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.textButton, { backgroundColor: "#D4AF37" }]}
            onPress={handleSave}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.textButton, { backgroundColor: "#A0522D" }]}
            onPress={handleReset}
          >
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.textButton, { backgroundColor: "#800000" }]}
            onPress={handleDelete}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 Your Restaurant</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "space-between",
  },
  header: {
    backgroundColor: "#800000",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "white",
  },
  headerText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  menuContainer: {
    backgroundColor: "#1c1c1c", // black-ish background
    margin: 16,
    borderRadius: 20,
    padding: 12,
    maxHeight: 300,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 6,
    textAlign: "center",
  },
  dishItem: {
    backgroundColor: "#f7f7f7",
    borderRadius: 12,
    padding: 10,
    marginBottom: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  dishName: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  dishDesc: {
    color: "#555",
    fontSize: 13,
  },
  dishPrice: {
    marginTop: 4,
    color: "#800000",
    fontWeight: "bold",
  },
  formContainer: {
    backgroundColor: "rgba(245,245,245,0.9)",
    margin: 16,
    borderRadius: 20,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
    color: "white",
    fontWeight: "600",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
    flex: 1,
  },
  pickerContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 12,
  },
  picker: {
    width: "100%",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  textButton: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  emptyText: {
    textAlign: "center",
    color: "white",
  },
  footer: {
    backgroundColor: "#800000",
    paddingVertical: 10,
    alignItems: "center",
  },
  footerText: {
    color: "white",
    fontSize: 14,
  },
});
