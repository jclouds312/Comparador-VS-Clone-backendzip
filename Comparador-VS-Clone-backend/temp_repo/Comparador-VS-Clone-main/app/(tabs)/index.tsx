import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Linking,
  Platform,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image } from "expo-image";
import * as Haptics from "expo-haptics";
import Colors from "@/constants/colors";
import { FEATURED_PRODUCTS, CATEGORIES, SERVICES, TESTIMONIALS, WHY_CHOOSE } from "@/lib/data";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.6;

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function ActionButton({
  icon,
  label,
  color,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  color: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.actionBtn,
        { backgroundColor: color },
        pressed && { opacity: 0.85, transform: [{ scale: 0.97 }] },
      ]}
      onPress={() => {
        if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress();
      }}
    >
      {icon}
      <Text style={styles.actionLabel}>{label}</Text>
    </Pressable>
  );
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  const openWhatsApp = () => Linking.openURL("https://wa.me/573001234567");
  const openPhone = () => Linking.openURL("tel:+573001234567");

  return (
    <View style={[styles.container, { paddingTop: Platform.OS === "web" ? 67 : insets.top }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logoBadge}>
            <MaterialCommunityIcons name="scale-balance" size={20} color={Colors.accent} />
          </View>
          <View>
            <Text style={styles.brandName}>SOFTGAN</Text>
            <Text style={styles.brandTag}>PESAJE INTELIGENTE</Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: Platform.OS === "web" ? 118 : insets.bottom + 90 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>
            Soluciones para <Text style={styles.heroHighlight}>el Campo</Text>
          </Text>
          <Text style={styles.heroSub}>
            Industria cárnica, láctea y ganadera. Básculas, bretes, ordeños y mucho más.
          </Text>
        </View>

        <View style={styles.statsRow}>
          <StatCard value="500+" label="CLIENTES" />
          <StatCard value="1,000+" label="PROYECTOS" />
          <StatCard value="36" label="MESES GTÍA" />
        </View>

        <View style={styles.actionsGrid}>
          <ActionButton
            icon={<Ionicons name="logo-whatsapp" size={18} color="#fff" />}
            label="WhatsApp"
            color="#25D366"
            onPress={openWhatsApp}
          />
          <ActionButton
            icon={<Ionicons name="call" size={18} color="#fff" />}
            label="Llamar"
            color={Colors.surfaceLight}
            onPress={openPhone}
          />
          <ActionButton
            icon={<Ionicons name="document-text-outline" size={18} color="#fff" />}
            label="Cotizar"
            color={Colors.surfaceLight}
            onPress={openWhatsApp}
          />
          <ActionButton
            icon={<Ionicons name="git-compare-outline" size={18} color="#fff" />}
            label="Comparar"
            color={Colors.surfaceLight}
            onPress={() => router.push("/(tabs)/vs")}
          />
          <ActionButton
            icon={<Ionicons name="settings-outline" size={18} color="#fff" />}
            label="Admin"
            color={Colors.surfaceLight}
            onPress={() => router.push("/panel-vendedoras")}
          />
        </View>

        <Pressable
          style={({ pressed }) => [styles.featuredBanner, pressed && { opacity: 0.9 }]}
          onPress={() => router.push("/(tabs)/productos")}
        >
          <View style={styles.bannerBadge}>
            <Ionicons name="star" size={14} color={Colors.accent} />
            <Text style={styles.bannerBadgeText}>DESTACADO</Text>
          </View>
          <Text style={styles.bannerTitle}>Básculas con Garantía de 36 Meses</Text>
          <Text style={styles.bannerSub}>Life Warranty en repuestos. Despacho a todo Colombia.</Text>
          <View style={styles.bannerArrow}>
            <Ionicons name="chevron-forward" size={20} color={Colors.accentYellow} />
          </View>
        </Pressable>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Productos Destacados</Text>
          <Pressable onPress={() => router.push("/(tabs)/productos")}>
            <Text style={styles.seeAll}>Ver todo</Text>
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productsScroll}
        >
          {FEATURED_PRODUCTS.map((product) => (
            <Pressable
              key={product.id}
              style={({ pressed }) => [styles.productCard, pressed && { opacity: 0.9 }]}
              onPress={() => router.push("/(tabs)/productos")}
            >
              <Image
                source={{ uri: product.image }}
                style={styles.productImage}
                contentFit="cover"
              />
              <View style={styles.productInfo}>
                <Text style={styles.productCategory}>{product.category}</Text>
                <Text style={styles.productName} numberOfLines={2}>
                  {product.name}
                </Text>
                <View style={styles.warrantyBadge}>
                  <Ionicons name="shield-checkmark" size={12} color={Colors.accentGreen} />
                  <Text style={styles.warrantyText}>{product.warranty} gtía</Text>
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categorías</Text>
          <Pressable onPress={() => router.push("/(tabs)/productos")}>
            <Text style={styles.seeAll}>Ver todo</Text>
          </Pressable>
        </View>

        {CATEGORIES.slice(0, 6).map((cat) => (
          <Pressable
            key={cat.key}
            style={({ pressed }) => [styles.categoryItem, pressed && { opacity: 0.8 }]}
            onPress={() => router.push("/(tabs)/productos")}
          >
            <View style={styles.categoryLeft}>
              <Text style={styles.categoryName}>{cat.name}</Text>
              <Text style={styles.categoryDesc}>{cat.description}</Text>
            </View>
            <View style={styles.categoryRight}>
              <Text style={styles.categoryCount}>{cat.count}</Text>
              <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
            </View>
          </Pressable>
        ))}

        <Text style={[styles.sectionTitle, { paddingHorizontal: 20, marginTop: 28, marginBottom: 14 }]}>
          Nuestros Servicios
        </Text>
        <View style={styles.servicesGrid}>
          {SERVICES.map((service, i) => (
            <View key={i} style={styles.serviceChip}>
              <Ionicons name="checkmark-circle" size={16} color={Colors.accentGreen} />
              <Text style={styles.serviceText}>{service}</Text>
            </View>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { paddingHorizontal: 20, marginTop: 28, marginBottom: 14 }]}>
          Lo que Dicen Nuestros Clientes
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productsScroll}
        >
          {TESTIMONIALS.map((t, i) => (
            <View key={i} style={styles.testimonialCard}>
              <Text style={styles.testimonialText}>{t.text}</Text>
              <View style={styles.testimonialAuthor}>
                <View style={styles.testimonialAvatar}>
                  <Text style={styles.testimonialInitial}>{t.initial}</Text>
                </View>
                <View>
                  <Text style={styles.testimonialName}>{t.name}</Text>
                  <Text style={styles.testimonialRole}>{t.role}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        <Text style={[styles.sectionTitle, { paddingHorizontal: 20, marginTop: 28, marginBottom: 14 }]}>
          Por qué Elegirnos
        </Text>
        <View style={styles.whySection}>
          {WHY_CHOOSE.map((item, i) => (
            <View key={i} style={styles.whyItem}>
              <Ionicons name="checkmark" size={18} color={Colors.accentGreen} />
              <Text style={styles.whyText}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Solicite una Cotización</Text>
          <Text style={styles.ctaSub}>Nuestra asesora Carolina le atenderá por WhatsApp</Text>
          <Pressable
            style={({ pressed }) => [styles.ctaBtn, pressed && { opacity: 0.85 }]}
            onPress={openWhatsApp}
          >
            <Ionicons name="logo-whatsapp" size={20} color="#fff" />
            <Text style={styles.ctaBtnText}>Contactar por WhatsApp</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceBorder,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  logoBadge: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: `${Colors.accent}15`,
    alignItems: "center",
    justifyContent: "center",
  },
  brandName: { fontFamily: "Inter_700Bold", fontSize: 16, color: Colors.text },
  brandTag: { fontFamily: "Inter_500Medium", fontSize: 9, color: Colors.accentGreen, letterSpacing: 1.5 },
  scroll: { flex: 1 },
  hero: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 8 },
  heroTitle: { fontFamily: "Inter_700Bold", fontSize: 28, color: Colors.text, lineHeight: 36 },
  heroHighlight: { color: Colors.accentGreen },
  heroSub: { fontFamily: "Inter_400Regular", fontSize: 14, color: Colors.textSecondary, marginTop: 8, lineHeight: 20 },
  statsRow: { flexDirection: "row", paddingHorizontal: 20, gap: 10, marginTop: 20 },
  statCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    paddingVertical: 14,
    alignItems: "center",
  },
  statValue: { fontFamily: "Inter_700Bold", fontSize: 18, color: Colors.text },
  statLabel: { fontFamily: "Inter_500Medium", fontSize: 10, color: Colors.textSecondary, marginTop: 4, letterSpacing: 0.5 },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    gap: 10,
    marginTop: 16,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
    width: (width - 50) / 2,
  },
  actionLabel: { fontFamily: "Inter_600SemiBold", fontSize: 14, color: "#fff" },
  featuredBanner: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: `${Colors.accentYellow}18`,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: `${Colors.accentYellow}30`,
    position: "relative",
  },
  bannerBadge: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 8 },
  bannerBadgeText: { fontFamily: "Inter_600SemiBold", fontSize: 10, color: Colors.accent, letterSpacing: 1 },
  bannerTitle: { fontFamily: "Inter_700Bold", fontSize: 15, color: Colors.text, marginBottom: 4 },
  bannerSub: { fontFamily: "Inter_400Regular", fontSize: 12, color: Colors.textSecondary },
  bannerArrow: { position: "absolute", right: 16, top: "50%", marginTop: -10 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 28,
    marginBottom: 14,
  },
  sectionTitle: { fontFamily: "Inter_700Bold", fontSize: 18, color: Colors.text },
  seeAll: { fontFamily: "Inter_500Medium", fontSize: 13, color: Colors.accent },
  productsScroll: { paddingLeft: 20, paddingRight: 10 },
  productCard: {
    width: CARD_WIDTH,
    backgroundColor: Colors.surface,
    borderRadius: 14,
    overflow: "hidden",
    marginRight: 12,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  productImage: { width: "100%", height: 140 },
  productInfo: { padding: 12 },
  productCategory: { fontFamily: "Inter_500Medium", fontSize: 11, color: Colors.accent, marginBottom: 4 },
  productName: { fontFamily: "Inter_600SemiBold", fontSize: 14, color: Colors.text, lineHeight: 20 },
  warrantyBadge: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 8 },
  warrantyText: { fontFamily: "Inter_400Regular", fontSize: 11, color: Colors.accentGreen },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    paddingVertical: 14,
    paddingHorizontal: 14,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    marginBottom: 8,
  },
  categoryLeft: { flex: 1 },
  categoryName: { fontFamily: "Inter_600SemiBold", fontSize: 14, color: Colors.text },
  categoryDesc: { fontFamily: "Inter_400Regular", fontSize: 11, color: Colors.textSecondary, marginTop: 2 },
  categoryRight: { flexDirection: "row", alignItems: "center", gap: 8 },
  categoryCount: { fontFamily: "Inter_700Bold", fontSize: 16, color: Colors.accent },
  servicesGrid: { flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 20, gap: 10 },
  serviceChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: Colors.surface,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  serviceText: { fontFamily: "Inter_500Medium", fontSize: 13, color: Colors.text },
  testimonialCard: {
    width: CARD_WIDTH + 20,
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 16,
    marginRight: 12,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  testimonialText: { fontFamily: "Inter_400Regular", fontSize: 13, color: Colors.textSecondary, lineHeight: 20, marginBottom: 14 },
  testimonialAuthor: { flexDirection: "row", alignItems: "center", gap: 10 },
  testimonialAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.surfaceLight,
    alignItems: "center",
    justifyContent: "center",
  },
  testimonialInitial: { fontFamily: "Inter_700Bold", fontSize: 14, color: Colors.accent },
  testimonialName: { fontFamily: "Inter_600SemiBold", fontSize: 13, color: Colors.text },
  testimonialRole: { fontFamily: "Inter_400Regular", fontSize: 11, color: Colors.textSecondary },
  whySection: { paddingHorizontal: 20, gap: 10 },
  whyItem: { flexDirection: "row", alignItems: "center", gap: 10 },
  whyText: { fontFamily: "Inter_400Regular", fontSize: 13, color: Colors.textSecondary, flex: 1 },
  ctaSection: {
    marginHorizontal: 20,
    marginTop: 28,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  ctaTitle: { fontFamily: "Inter_700Bold", fontSize: 18, color: Colors.text, textAlign: "center" },
  ctaSub: { fontFamily: "Inter_400Regular", fontSize: 13, color: Colors.textSecondary, textAlign: "center", marginTop: 6, marginBottom: 18 },
  ctaBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#25D366",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  ctaBtnText: { fontFamily: "Inter_600SemiBold", fontSize: 15, color: "#fff" },
});
