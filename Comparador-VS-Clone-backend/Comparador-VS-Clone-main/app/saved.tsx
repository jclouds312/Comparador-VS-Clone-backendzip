import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Alert,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useFocusEffect } from "expo-router";
import * as Haptics from "expo-haptics";
import Colors from "@/constants/colors";
import { SavedComparison, getProductById } from "@/lib/data";
import { getSavedComparisons, removeComparison } from "@/lib/storage";

export default function SavedScreen() {
  const insets = useSafeAreaInsets();
  const [saved, setSaved] = useState<SavedComparison[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadSaved();
    }, [])
  );

  const loadSaved = async () => {
    setLoading(true);
    const data = await getSavedComparisons();
    setSaved(data);
    setLoading(false);
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      "Eliminar",
      "¿Deseas eliminar esta comparación guardada?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            if (Platform.OS !== "web") {
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Warning
              );
            }
            await removeComparison(id);
            loadSaved();
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: SavedComparison }) => {
    const productA = getProductById(item.productAId);
    const productB = getProductById(item.productBId);
    if (!productA || !productB) return null;

    return (
      <View style={styles.card}>
        <View style={styles.cardTop}>
          <View style={styles.cardProducts}>
            <View style={styles.cardProduct}>
              <View
                style={[styles.brandIndicator, { backgroundColor: Colors.brandA }]}
              />
              <View>
                <Text style={styles.productName}>{productA.name}</Text>
                <Text style={styles.brandName}>{productA.brand}</Text>
              </View>
            </View>
            <View style={styles.cardVs}>
              <Text style={styles.cardVsText}>VS</Text>
            </View>
            <View style={[styles.cardProduct, { alignItems: "flex-end" as const }]}>
              <View>
                <Text style={[styles.productName, { textAlign: "right" as const }]}>
                  {productB.name}
                </Text>
                <Text style={[styles.brandName, { textAlign: "right" as const }]}>
                  {productB.brand}
                </Text>
              </View>
              <View
                style={[styles.brandIndicator, { backgroundColor: Colors.brandB }]}
              />
            </View>
          </View>
        </View>

        <View style={styles.cardBottom}>
          <Text style={styles.cardDate}>{item.date}</Text>
          <Pressable
            onPress={() => handleDelete(item.id)}
            style={({ pressed }) => [
              styles.deleteBtn,
              pressed && { opacity: 0.6 },
            ]}
          >
            <Ionicons name="trash-outline" size={18} color={Colors.accentRed} />
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: Platform.OS === "web" ? 67 : insets.top },
      ]}
    >
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [
            styles.backBtn,
            pressed && { opacity: 0.6 },
          ]}
        >
          <Ionicons name="close" size={24} color={Colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Guardados</Text>
        <View style={{ width: 40 }} />
      </View>

      <FlatList
        data={saved}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={[
          styles.list,
          { paddingBottom: Platform.OS === "web" ? 34 : insets.bottom + 20 },
        ]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          !loading ? (
            <View style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <Ionicons
                  name="bookmark-outline"
                  size={36}
                  color={Colors.textMuted}
                />
              </View>
              <Text style={styles.emptyTitle}>Sin comparaciones guardadas</Text>
              <Text style={styles.emptyText}>
                Guarda tus comparaciones favoritas para consultarlas después
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceBorder,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  headerTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    color: Colors.text,
  },
  list: {
    padding: 20,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    marginBottom: 14,
    overflow: "hidden",
  },
  cardTop: {
    padding: 16,
  },
  cardProducts: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardProduct: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  brandIndicator: {
    width: 4,
    height: 32,
    borderRadius: 2,
  },
  productName: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: Colors.text,
  },
  brandName: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  cardVs: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.surfaceLight,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
  },
  cardVsText: {
    fontFamily: "Inter_700Bold",
    fontSize: 9,
    color: Colors.textMuted,
    letterSpacing: 1,
  },
  cardBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: Colors.surfaceLight,
    borderTopWidth: 1,
    borderTopColor: Colors.surfaceBorder,
  },
  cardDate: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: Colors.textSecondary,
  },
  deleteBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    gap: 12,
  },
  emptyIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.surface,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    marginBottom: 8,
  },
  emptyTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    color: Colors.text,
    textAlign: "center",
  },
  emptyText: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: "center",
    paddingHorizontal: 40,
  },
});
