import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  ScrollView,
  Linking,
  Platform,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as Haptics from "expo-haptics";
import Colors from "@/constants/colors";
import { ALL_PRODUCTS, CATEGORIES, Product } from "@/lib/data";

const { width } = Dimensions.get("window");

function ProductCard({ product }: { product: Product }) {
  const handleCotizar = () => {
    const msg = `Hola, me interesa: ${product.name}`;
    Linking.openURL(`https://wa.me/573001234567?text=${encodeURIComponent(msg)}`);
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.cardImage} contentFit="cover" />
      <View style={styles.cardBody}>
        <Text style={styles.cardCategory}>{product.category}</Text>
        <Text style={styles.cardName} numberOfLines={2}>{product.name}</Text>
        <View style={styles.cardRow}>
          <View style={styles.warrantyTag}>
            <Ionicons name="shield-checkmark" size={12} color={Colors.accentGreen} />
            <Text style={styles.warrantyTagText}>Garantía {product.warranty}</Text>
          </View>
          <Text style={styles.cardPrice}>{product.price}</Text>
        </View>
        <Pressable
          style={({ pressed }) => [styles.cotizarBtn, pressed && { opacity: 0.85 }]}
          onPress={() => {
            if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            handleCotizar();
          }}
        >
          <Ionicons name="logo-whatsapp" size={16} color="#fff" />
          <Text style={styles.cotizarText}>Cotizar</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function ProductosScreen() {
  const insets = useSafeAreaInsets();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    if (!activeCategory) return ALL_PRODUCTS;
    return ALL_PRODUCTS.filter((p) => p.categoryKey === activeCategory);
  }, [activeCategory]);

  return (
    <View style={[styles.container, { paddingTop: Platform.OS === "web" ? 67 : insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Productos</Text>
        <Text style={styles.subtitle}>Equipos de alta calidad para el campo</Text>
      </View>

      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          <Pressable
            style={[styles.filterChip, !activeCategory && styles.filterChipActive]}
            onPress={() => {
              if (Platform.OS !== "web") Haptics.selectionAsync();
              setActiveCategory(null);
            }}
          >
            <Text style={[styles.filterText, !activeCategory && styles.filterTextActive]}>
              Todas
            </Text>
          </Pressable>
          {CATEGORIES.map((cat) => (
            <Pressable
              key={cat.key}
              style={[styles.filterChip, activeCategory === cat.key && styles.filterChipActive]}
              onPress={() => {
                if (Platform.OS !== "web") Haptics.selectionAsync();
                setActiveCategory(cat.key);
              }}
            >
              <Text
                style={[
                  styles.filterText,
                  activeCategory === cat.key && styles.filterTextActive,
                ]}
                numberOfLines={1}
              >
                {cat.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.gridRow}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 8,
          paddingBottom: Platform.OS === "web" ? 118 : insets.bottom + 90,
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ProductCard product={item} />}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="cube-outline" size={40} color={Colors.textMuted} />
            <Text style={styles.emptyText}>No hay productos en esta categoría</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
  title: { fontFamily: "Inter_700Bold", fontSize: 24, color: Colors.text },
  subtitle: { fontFamily: "Inter_400Regular", fontSize: 13, color: Colors.textSecondary, marginTop: 4 },
  filterContainer: { borderBottomWidth: 1, borderBottomColor: Colors.surfaceBorder },
  filterScroll: { paddingHorizontal: 16, paddingVertical: 12, gap: 8 },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  filterChipActive: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  filterText: { fontFamily: "Inter_500Medium", fontSize: 12, color: Colors.textSecondary },
  filterTextActive: { color: "#fff" },
  gridRow: { gap: 10, marginBottom: 10 },
  card: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    maxWidth: (width - 42) / 2,
  },
  cardImage: { width: "100%", height: 120 },
  cardBody: { padding: 10 },
  cardCategory: { fontFamily: "Inter_500Medium", fontSize: 10, color: Colors.accent, marginBottom: 4 },
  cardName: { fontFamily: "Inter_600SemiBold", fontSize: 13, color: Colors.text, lineHeight: 18, minHeight: 36 },
  cardRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 8 },
  warrantyTag: { flexDirection: "row", alignItems: "center", gap: 4 },
  warrantyTagText: { fontFamily: "Inter_400Regular", fontSize: 10, color: Colors.accentGreen },
  cardPrice: { fontFamily: "Inter_600SemiBold", fontSize: 11, color: Colors.textSecondary },
  cotizarBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "#25D366",
    borderRadius: 8,
    paddingVertical: 8,
    marginTop: 10,
  },
  cotizarText: { fontFamily: "Inter_600SemiBold", fontSize: 12, color: "#fff" },
  emptyState: { alignItems: "center", justifyContent: "center", paddingVertical: 60, gap: 12 },
  emptyText: { fontFamily: "Inter_500Medium", fontSize: 14, color: Colors.textMuted },
});
