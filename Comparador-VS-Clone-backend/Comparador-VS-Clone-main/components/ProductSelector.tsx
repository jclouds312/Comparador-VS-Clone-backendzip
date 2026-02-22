import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  FlatList,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "@/constants/colors";
import { Product } from "@/lib/data";

interface ProductSelectorProps {
  brand: "SOFTGAN" | "Prometálicos";
  products: Product[];
  selectedProduct: Product | null;
  onSelect: (product: Product) => void;
  brandColor: string;
}

export default function ProductSelector({
  brand,
  products,
  selectedProduct,
  onSelect,
  brandColor,
}: ProductSelectorProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <Text style={[styles.brandLabel, { color: brandColor }]}>{brand}</Text>
      <Pressable
        style={({ pressed }) => [
          styles.selector,
          { borderColor: selectedProduct ? brandColor : Colors.surfaceBorder },
          pressed && { opacity: 0.8, transform: [{ scale: 0.98 }] },
        ]}
        onPress={() => setModalVisible(true)}
      >
        {selectedProduct ? (
          <View style={styles.selectedContent}>
            <View style={[styles.productDot, { backgroundColor: brandColor }]} />
            <Text style={styles.selectedName} numberOfLines={1}>
              {selectedProduct.name}
            </Text>
          </View>
        ) : (
          <Text style={styles.placeholder}>Selecciona</Text>
        )}
        <Ionicons name="chevron-down" size={16} color={Colors.textSecondary} />
      </Pressable>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <Pressable
            style={styles.modalDismiss}
            onPress={() => setModalVisible(false)}
          />
          <View
            style={[
              styles.modalContent,
              { paddingBottom: Platform.OS === "web" ? 34 : insets.bottom + 16 },
            ]}
          >
            <View style={styles.modalHandle} />
            <Text style={[styles.modalTitle, { color: brandColor }]}>
              {brand}
            </Text>
            <Text style={styles.modalSubtitle}>Selecciona un producto</Text>
            <FlatList
              data={products}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                const isSelected = selectedProduct?.id === item.id;
                return (
                  <Pressable
                    style={({ pressed }) => [
                      styles.productItem,
                      isSelected && {
                        borderColor: brandColor,
                        backgroundColor: `${brandColor}15`,
                      },
                      pressed && { opacity: 0.7 },
                    ]}
                    onPress={() => {
                      onSelect(item);
                      setModalVisible(false);
                    }}
                  >
                    <View style={styles.productItemLeft}>
                      <View
                        style={[styles.productIcon, { backgroundColor: `${brandColor}20` }]}
                      >
                        <Ionicons
                          name="scale-outline"
                          size={20}
                          color={brandColor}
                        />
                      </View>
                      <View style={styles.productInfo}>
                        <Text style={styles.productName}>{item.name}</Text>
                        <Text style={styles.productCategory}>{item.category}</Text>
                      </View>
                    </View>
                    {isSelected && (
                      <Ionicons
                        name="checkmark-circle"
                        size={22}
                        color={brandColor}
                      />
                    )}
                  </Pressable>
                );
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  brandLabel: {
    fontFamily: "Inter_700Bold",
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  selector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1.5,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  selectedContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 8,
  },
  productDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  selectedName: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: Colors.text,
    flex: 1,
  },
  placeholder: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: Colors.textMuted,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "flex-end",
  },
  modalDismiss: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
    paddingHorizontal: 20,
    maxHeight: "70%",
  },
  modalHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.surfaceBorder,
    alignSelf: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 20,
    marginBottom: 4,
  },
  modalSubtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 20,
  },
  productItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    marginBottom: 10,
    backgroundColor: Colors.surfaceLight,
  },
  productItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  productIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: Colors.text,
  },
  productCategory: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});
