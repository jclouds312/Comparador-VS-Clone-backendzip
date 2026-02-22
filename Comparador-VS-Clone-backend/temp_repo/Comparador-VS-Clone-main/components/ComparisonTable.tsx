import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/colors";
import { ComparisonResult } from "@/lib/data";

interface ComparisonTableProps {
  results: ComparisonResult[];
  brandAName: string;
  brandBName: string;
}

function SpecRow({ result }: { result: ComparisonResult }) {
  const isWinnerA = result.winner === "A";
  const isWinnerB = result.winner === "B";
  const isTie = result.winner === "tie";

  return (
    <View style={styles.row}>
      <View
        style={[
          styles.valueCell,
          styles.valueCellLeft,
          isWinnerA && { backgroundColor: Colors.winnerGlow },
        ]}
      >
        <Text
          style={[
            styles.valueText,
            isWinnerA && { color: Colors.accentGreen, fontFamily: "Inter_700Bold" },
          ]}
        >
          {result.valueA}
        </Text>
        {isWinnerA && (
          <Ionicons
            name="trophy"
            size={12}
            color={Colors.accentGreen}
            style={styles.trophyIcon}
          />
        )}
      </View>

      <View style={styles.labelCell}>
        <Text style={styles.labelText}>{result.specLabel}</Text>
        {isTie && (
          <View style={styles.tieBadge}>
            <Text style={styles.tieText}>EMPATE</Text>
          </View>
        )}
      </View>

      <View
        style={[
          styles.valueCell,
          styles.valueCellRight,
          isWinnerB && { backgroundColor: Colors.winnerGlow },
        ]}
      >
        {isWinnerB && (
          <Ionicons
            name="trophy"
            size={12}
            color={Colors.accentGreen}
            style={styles.trophyIcon}
          />
        )}
        <Text
          style={[
            styles.valueText,
            isWinnerB && { color: Colors.accentGreen, fontFamily: "Inter_700Bold" },
          ]}
        >
          {result.valueB}
        </Text>
      </View>
    </View>
  );
}

export default function ComparisonTable({
  results,
  brandAName,
  brandBName,
}: ComparisonTableProps) {
  const winsA = results.filter((r) => r.winner === "A").length;
  const winsB = results.filter((r) => r.winner === "B").length;
  const ties = results.filter((r) => r.winner === "tie").length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.headerSide, styles.headerLeft]}>
          <View style={[styles.brandDot, { backgroundColor: Colors.brandA }]} />
          <Text style={[styles.headerBrand, { color: Colors.brandA }]} numberOfLines={1}>
            {brandAName}
          </Text>
        </View>
        <View style={styles.headerCenter}>
          <Text style={styles.vsText}>VS</Text>
        </View>
        <View style={[styles.headerSide, styles.headerRight]}>
          <Text style={[styles.headerBrand, { color: Colors.brandB }]} numberOfLines={1}>
            {brandBName}
          </Text>
          <View style={[styles.brandDot, { backgroundColor: Colors.brandB }]} />
        </View>
      </View>

      <View style={styles.scoreBar}>
        <View style={styles.scoreItem}>
          <Text style={[styles.scoreNumber, { color: Colors.brandA }]}>{winsA}</Text>
          <Text style={styles.scoreLabel}>Ventajas</Text>
        </View>
        <View style={styles.scoreDivider} />
        <View style={styles.scoreItem}>
          <Text style={[styles.scoreNumber, { color: Colors.accentYellow }]}>{ties}</Text>
          <Text style={styles.scoreLabel}>Empates</Text>
        </View>
        <View style={styles.scoreDivider} />
        <View style={styles.scoreItem}>
          <Text style={[styles.scoreNumber, { color: Colors.brandB }]}>{winsB}</Text>
          <Text style={styles.scoreLabel}>Ventajas</Text>
        </View>
      </View>

      <View style={styles.table}>
        {results.map((result, index) => (
          <SpecRow key={index} result={result} />
        ))}
      </View>

      {(winsA > winsB || winsB > winsA) && (
        <View style={styles.verdictContainer}>
          <Ionicons name="ribbon" size={20} color={Colors.accentGreen} />
          <Text style={styles.verdictText}>
            {winsA > winsB
              ? `${brandAName} gana en ${winsA} de ${results.length} categorías`
              : `${brandBName} gana en ${winsB} de ${results.length} categorías`}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  headerSide: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  headerLeft: {
    justifyContent: "flex-start",
  },
  headerRight: {
    justifyContent: "flex-end",
  },
  brandDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 6,
  },
  headerBrand: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    letterSpacing: 0.5,
    flex: 1,
  },
  headerCenter: {
    paddingHorizontal: 12,
  },
  vsText: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    color: Colors.textMuted,
    letterSpacing: 2,
  },
  scoreBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  scoreItem: {
    flex: 1,
    alignItems: "center",
  },
  scoreNumber: {
    fontFamily: "Inter_700Bold",
    fontSize: 22,
  },
  scoreLabel: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  scoreDivider: {
    width: 1,
    height: 30,
    backgroundColor: Colors.surfaceBorder,
  },
  table: {
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceBorder,
  },
  valueCell: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
  },
  valueCellLeft: {
    justifyContent: "flex-start",
  },
  valueCellRight: {
    justifyContent: "flex-end",
  },
  valueText: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    color: Colors.text,
  },
  trophyIcon: {
    marginHorizontal: 4,
  },
  labelCell: {
    width: 90,
    paddingVertical: 14,
    paddingHorizontal: 6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.surfaceLight,
  },
  labelText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 10,
    color: Colors.textSecondary,
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  tieBadge: {
    backgroundColor: `${Colors.accentYellow}20`,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginTop: 4,
  },
  tieText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 8,
    color: Colors.accentYellow,
    letterSpacing: 0.5,
  },
  verdictContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.winnerGlow,
    borderRadius: 12,
    padding: 14,
    marginTop: 16,
    gap: 10,
    borderWidth: 1,
    borderColor: `${Colors.accentGreen}30`,
  },
  verdictText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    color: Colors.accentGreen,
    flex: 1,
  },
});
