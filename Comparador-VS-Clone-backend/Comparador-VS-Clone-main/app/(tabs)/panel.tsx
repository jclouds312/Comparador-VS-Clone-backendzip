import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "@/constants/colors";
import { ALL_PRODUCTS, CATEGORIES } from "@/lib/data";
import { getSavedComparisons } from "@/lib/storage";

function MetricCard({
  icon,
  iconColor,
  value,
  label,
  trend,
}: {
  icon: React.ReactNode;
  iconColor: string;
  value: string;
  label: string;
  trend?: string;
}) {
  return (
    <View style={styles.metricCard}>
      <View style={[styles.metricIcon, { backgroundColor: `${iconColor}15` }]}>
        {icon}
      </View>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
      {trend && (
        <View style={styles.trendBadge}>
          <Ionicons name="trending-up" size={12} color={Colors.accentGreen} />
          <Text style={styles.trendText}>{trend}</Text>
        </View>
      )}
    </View>
  );
}

function BarChart({ data }: { data: { label: string; value: number; color: string }[] }) {
  const maxVal = Math.max(...data.map((d) => d.value));
  return (
    <View style={styles.barChart}>
      {data.map((item, i) => (
        <View key={i} style={styles.barItem}>
          <Text style={styles.barValue}>{item.value}</Text>
          <View style={styles.barTrack}>
            <View
              style={[
                styles.barFill,
                {
                  height: `${(item.value / maxVal) * 100}%`,
                  backgroundColor: item.color,
                },
              ]}
            />
          </View>
          <Text style={styles.barLabel} numberOfLines={1}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
}

export default function PanelScreen() {
  const insets = useSafeAreaInsets();
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    getSavedComparisons().then((s) => setSavedCount(s.length));
  }, []);

  const categoryData = CATEGORIES.slice(0, 6).map((cat, i) => ({
    label: cat.name.split(" ")[0],
    value: cat.count,
    color: [Colors.accent, Colors.secondary, Colors.accentGreen, Colors.accentYellow, "#9B59B6", "#1ABC9C"][i],
  }));

  return (
    <View style={[styles.container, { paddingTop: Platform.OS === "web" ? 67 : insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Panel</Text>
        <Text style={styles.subtitle}>Resumen del catálogo SOFTGAN</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: Platform.OS === "web" ? 118 : insets.bottom + 90 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.metricsGrid}>
          <MetricCard
            icon={<Ionicons name="cube" size={20} color={Colors.accent} />}
            iconColor={Colors.accent}
            value={ALL_PRODUCTS.length.toString()}
            label="Productos"
            trend="+12%"
          />
          <MetricCard
            icon={<Ionicons name="grid" size={20} color={Colors.secondary} />}
            iconColor={Colors.secondary}
            value={CATEGORIES.length.toString()}
            label="Categorías"
          />
          <MetricCard
            icon={<Ionicons name="git-compare" size={20} color={Colors.accentGreen} />}
            iconColor={Colors.accentGreen}
            value={savedCount.toString()}
            label="Comparaciones"
          />
          <MetricCard
            icon={<Ionicons name="shield-checkmark" size={20} color={Colors.accentYellow} />}
            iconColor={Colors.accentYellow}
            value="36"
            label="Meses Gtía"
          />
        </View>

        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Productos por Categoría</Text>
          <BarChart data={categoryData} />
        </View>

        <Text style={[styles.sectionTitle, { paddingHorizontal: 20, marginBottom: 12 }]}>
          Distribución del Catálogo
        </Text>
        {CATEGORIES.map((cat) => {
          const pct = Math.round((cat.count / ALL_PRODUCTS.length) * 100);
          return (
            <View key={cat.key} style={styles.distRow}>
              <View style={styles.distLeft}>
                <Text style={styles.distName}>{cat.name}</Text>
                <Text style={styles.distCount}>{cat.count} productos</Text>
              </View>
              <View style={styles.distBarOuter}>
                <View style={[styles.distBarInner, { width: `${Math.max(pct, 8)}%` }]} />
              </View>
              <Text style={styles.distPct}>{pct}%</Text>
            </View>
          );
        })}

        <View style={styles.infoCard}>
          <View style={styles.infoIconWrap}>
            <MaterialCommunityIcons name="information" size={22} color={Colors.accent} />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Datos en tiempo real</Text>
            <Text style={styles.infoText}>
              Este panel muestra un resumen del catálogo de productos SOFTGAN y las comparaciones guardadas.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
  title: { fontFamily: "Inter_700Bold", fontSize: 24, color: Colors.text },
  subtitle: { fontFamily: "Inter_400Regular", fontSize: 13, color: Colors.textSecondary, marginTop: 4 },
  scroll: { flex: 1 },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    gap: 10,
    marginTop: 8,
  },
  metricCard: {
    width: "48%",
    flexGrow: 1,
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  metricIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  metricValue: { fontFamily: "Inter_700Bold", fontSize: 26, color: Colors.text },
  metricLabel: { fontFamily: "Inter_400Regular", fontSize: 12, color: Colors.textSecondary, marginTop: 4 },
  trendBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 8,
    backgroundColor: `${Colors.accentGreen}15`,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: "flex-start",
  },
  trendText: { fontFamily: "Inter_600SemiBold", fontSize: 11, color: Colors.accentGreen },
  chartCard: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    marginBottom: 24,
  },
  chartTitle: { fontFamily: "Inter_600SemiBold", fontSize: 15, color: Colors.text, marginBottom: 16 },
  barChart: { flexDirection: "row", alignItems: "flex-end", height: 140, gap: 8 },
  barItem: { flex: 1, alignItems: "center" },
  barValue: { fontFamily: "Inter_600SemiBold", fontSize: 11, color: Colors.textSecondary, marginBottom: 6 },
  barTrack: {
    width: "80%",
    height: 100,
    backgroundColor: Colors.surfaceLight,
    borderRadius: 6,
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  barFill: { width: "100%", borderRadius: 6 },
  barLabel: { fontFamily: "Inter_400Regular", fontSize: 9, color: Colors.textMuted, marginTop: 6, textAlign: "center" },
  sectionTitle: { fontFamily: "Inter_700Bold", fontSize: 16, color: Colors.text },
  distRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 12,
    gap: 10,
  },
  distLeft: { width: 120 },
  distName: { fontFamily: "Inter_500Medium", fontSize: 12, color: Colors.text },
  distCount: { fontFamily: "Inter_400Regular", fontSize: 10, color: Colors.textMuted },
  distBarOuter: {
    flex: 1,
    height: 8,
    backgroundColor: Colors.surfaceLight,
    borderRadius: 4,
    overflow: "hidden",
  },
  distBarInner: {
    height: "100%",
    backgroundColor: Colors.accent,
    borderRadius: 4,
  },
  distPct: { fontFamily: "Inter_600SemiBold", fontSize: 12, color: Colors.textSecondary, width: 36, textAlign: "right" },
  infoCard: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: `${Colors.accent}10`,
    borderRadius: 14,
    padding: 16,
    flexDirection: "row",
    gap: 12,
    borderWidth: 1,
    borderColor: `${Colors.accent}25`,
  },
  infoIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: `${Colors.accent}15`,
    alignItems: "center",
    justifyContent: "center",
  },
  infoContent: { flex: 1 },
  infoTitle: { fontFamily: "Inter_600SemiBold", fontSize: 14, color: Colors.text, marginBottom: 4 },
  infoText: { fontFamily: "Inter_400Regular", fontSize: 12, color: Colors.textSecondary, lineHeight: 18 },
});
