import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Linking,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import Colors from "@/constants/colors";

function AdminOption({
  icon,
  title,
  description,
  onPress,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.optionCard,
        pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] },
      ]}
      onPress={onPress}
    >
      <View style={styles.optionIcon}>{icon}</View>
      <View style={styles.optionContent}>
        <Text style={styles.optionTitle}>{title}</Text>
        <Text style={styles.optionDescription}>{description}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
    </Pressable>
  );
}

export default function PanelVendedorasScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: Platform.OS === "web" ? 20 : insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.brandName}>SOFTGAN</Text>
        <Text style={styles.brandTag}>PESAJE INTELIGENTE</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>Panel de Vendedoras</Text>
          <Text style={styles.systemTag}>Sistema SOFTGAN</Text>
          <Text style={styles.subtitle}>
            Administra el catálogo de productos y gestiona las ventas desde este panel corporativo
          </Text>
        </View>

        <View style={styles.optionsGrid}>
          <AdminOption
            icon={<MaterialCommunityIcons name="package-variant-closed" size={24} color={Colors.accent} />}
            title="Gestión de Productos"
            description="Agrega, edita y administra el catálogo completo de productos"
            onPress={() => router.push("/(tabs)/productos")}
          />
          <AdminOption
            icon={<MaterialCommunityIcons name="scale-balance" size={24} color={Colors.accent} />}
            title="Comparador VS"
            description="Gestiona productos comparativos con la competencia"
            onPress={() => router.push("/(tabs)/vs")}
          />
          <AdminOption
            icon={<Ionicons name="document-text-outline" size={24} color={Colors.accent} />}
            title="Cotizaciones"
            description="Revisa las solicitudes de cotización de clientes"
            onPress={() => Linking.openURL("https://wa.me/573001234567")}
          />
        </View>

        <View style={styles.guideSection}>
          <Text style={styles.guideTitle}>Guía de Uso</Text>
          
          <View style={styles.guideItem}>
            <Text style={styles.guideStep}>1. Agregar Productos</Text>
            <Text style={styles.guideText}>
              Ve a 'Gestión de Productos' y agrega el catálogo de SOFTGAN con fotos, precios y características
            </Text>
          </View>

          <View style={styles.guideItem}>
            <Text style={styles.guideStep}>2. Configurar Comparativas</Text>
            <Text style={styles.guideText}>
              En 'Comparador VS' agrega productos de la competencia para mostrar ventajas
            </Text>
          </View>

          <View style={styles.guideItem}>
            <Text style={styles.guideStep}>3. Compartir Catálogo</Text>
            <Text style={styles.guideText}>
              Los clientes pueden ver productos en la página pública y solicitar cotizaciones
            </Text>
          </View>

          <View style={styles.guideItem}>
            <Text style={styles.guideStep}>4. Gestionar Cotizaciones</Text>
            <Text style={styles.guideText}>
              Revisa las solicitudes de los clientes y contacta vía WhatsApp
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>🔒 Panel corporativo de SOFTGAN</Text>
          <Text style={styles.footerSub}>Los clientes verán los productos que agregues en la página pública</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { alignItems: "center", paddingVertical: 10 },
  brandName: { fontFamily: "Inter_700Bold", fontSize: 18, color: Colors.text },
  brandTag: { fontFamily: "Inter_500Medium", fontSize: 10, color: Colors.accentGreen, letterSpacing: 2 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },
  titleSection: { marginTop: 20, marginBottom: 30, alignItems: "center" },
  mainTitle: { fontFamily: "Inter_700Bold", fontSize: 24, color: Colors.text, textAlign: "center" },
  systemTag: { fontFamily: "Inter_600SemiBold", fontSize: 14, color: Colors.accent, marginTop: 4 },
  subtitle: { 
    fontFamily: "Inter_400Regular", 
    fontSize: 14, 
    color: Colors.textSecondary, 
    textAlign: "center", 
    marginTop: 12,
    lineHeight: 20 
  },
  optionsGrid: { gap: 12 },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  optionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: `${Colors.accent}15`,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  optionContent: { flex: 1 },
  optionTitle: { fontFamily: "Inter_700Bold", fontSize: 16, color: Colors.text },
  optionDescription: { fontFamily: "Inter_400Regular", fontSize: 12, color: Colors.textSecondary, marginTop: 2 },
  guideSection: { marginTop: 40 },
  guideTitle: { fontFamily: "Inter_700Bold", fontSize: 18, color: Colors.text, marginBottom: 20 },
  guideItem: { marginBottom: 20 },
  guideStep: { fontFamily: "Inter_600SemiBold", fontSize: 15, color: Colors.text, marginBottom: 4 },
  guideText: { fontFamily: "Inter_400Regular", fontSize: 13, color: Colors.textSecondary, lineHeight: 18 },
  footer: { marginTop: 40, alignItems: "center", paddingBottom: 20 },
  footerText: { fontFamily: "Inter_600SemiBold", fontSize: 12, color: Colors.textMuted },
  footerSub: { fontFamily: "Inter_400Regular", fontSize: 11, color: Colors.textMuted, marginTop: 4 },
});
