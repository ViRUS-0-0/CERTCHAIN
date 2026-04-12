import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, ShieldCheck, XCircle, AlertCircle } from 'lucide-react-native';
import { useLocalSearchParams } from 'expo-router';
import { theme } from '../../src/theme';
import { Button } from '../../src/components/Button';
import { Card } from '../../src/components/Card';
import { Input } from '../../src/components/Input';
import { verifyCert } from '../../src/utils/blockchain';

export default function VerifyScreen() {
  const params = useLocalSearchParams();
  const [certId, setCertId] = useState(params?.id?.toString() || '');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleVerify = async () => {
    if (!certId.trim()) return;
    setLoading(true);
    setResult(null);
    setError('');

    try {
      const data = await verifyCert(certId.trim());
      setResult(data);
    } catch (err: any) {
      console.log('Verify error:', err);
      setError(err?.message || 'Failed to verify certificate.');
    } finally {
      setLoading(false);
    }
  };

  const formatTimestamp = (ts: number) => {
    if (!ts) return 'N/A';
    return new Date(ts * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(200, 220, 255, 0.4)', 'rgba(240, 240, 250, 0.5)']}
        style={StyleSheet.absoluteFillObject}
      />
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.title}>Verify Certificate</Text>
          <Text style={styles.subtitle}>Enter the certificate ID below to instantly verify its authenticity.</Text>
        </View>

        <View style={styles.searchBox}>
          <View style={styles.searchInputWrapper}>
            <Search size={20} color={theme.colors.subtext} style={{ marginLeft: 16 }} />
            <Input
              placeholder="e.g. 21BCE1234_17135..."
              value={certId}
              onChangeText={setCertId}
              style={styles.searchInput}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <Button title="Verify" onPress={handleVerify} loading={loading} style={styles.verifyBtn} />
        </View>

        {error ? (
           <View style={styles.errorBox}>
             <AlertCircle size={20} color={theme.colors.error} />
             <Text style={styles.errorText}>{error}</Text>
           </View>
        ) : null}

        {result && result.exists && (
          <Card style={styles.resultCard}>
            <View style={styles.resultHeader}>
              <View style={styles.validIconBox}>
                <ShieldCheck size={28} color={theme.colors.success} />
              </View>
              <View>
                <Text style={styles.resultTitle}>Valid Certificate</Text>
                <Text style={styles.resultSubtitle}>Verified on Blockchain</Text>
              </View>
            </View>

            <View style={styles.grid}>
              <View style={styles.gridItem}>
                <Text style={styles.dataLabel}>STUDENT NAME</Text>
                <Text style={styles.dataValue}>{result.studentName}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.dataLabel}>REGISTRATION NO.</Text>
                <Text style={styles.dataValue}>{result.regNo}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.dataLabel}>DEGREE</Text>
                <Text style={styles.dataValue}>{result.degree}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.dataLabel}>INSTITUTION</Text>
                <Text style={styles.dataValue}>{result.institution}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.dataLabel}>ISSUE DATE</Text>
                <Text style={styles.dataValue}>{result.issueDate}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.dataLabel}>MINTED ON</Text>
                <Text style={styles.dataValue}>{formatTimestamp(result.timestamp)}</Text>
              </View>
              <View style={[styles.gridItem, { width: '100%' }]}>
                <Text style={styles.dataLabel}>ISSUER ADDRESS</Text>
                <View style={styles.issuerPill}>
                  <Text style={styles.issuerText}>{result.issuedBy}</Text>
                </View>
              </View>
            </View>
          </Card>
        )}

        {result && !result.exists && (
          <Card style={[styles.resultCard, { borderColor: theme.colors.errorBg }]}>
            <View style={{ flexDirection: 'row', gap: 16, alignItems: 'flex-start' }}>
              <XCircle size={28} color={theme.colors.error} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.resultTitle, { color: theme.colors.error }]}>Certificate Not Found</Text>
                <Text style={styles.errorDesc}>
                  The certificate ID provided could not be found on the blockchain. Please check the ID and try again.
                </Text>
              </View>
            </View>
          </Card>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  scrollContent: { padding: 24, paddingTop: 60, paddingBottom: 100 },
  header: { marginBottom: 32, alignItems: 'center' },
  title: { fontSize: 32, fontWeight: '800', color: theme.colors.primary, marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 16, color: theme.colors.subtext, lineHeight: 24, textAlign: 'center' },
  searchBox: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  searchInputWrapper: { flex: 1, backgroundColor: theme.colors.surface, borderRadius: theme.borderRadius.lg, borderWidth: 1, borderColor: theme.colors.border, flexDirection: 'row', alignItems: 'center' },
  searchInput: { flex: 1, height: 48, fontSize: 16, paddingHorizontal: 16, borderWidth: 0, backgroundColor: 'transparent' },
  verifyBtn: { paddingHorizontal: 24 },
  errorBox: { flexDirection: 'row', backgroundColor: theme.colors.errorBg, padding: 12, borderRadius: 8, gap: 10, alignItems: 'center', marginBottom: 24 },
  errorText: { color: theme.colors.error, fontSize: 14, flex: 1 },
  resultCard: { padding: 24, gap: 24 },
  resultHeader: { flexDirection: 'row', alignItems: 'center', gap: 16, paddingBottom: 24, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  validIconBox: { width: 56, height: 56, borderRadius: 28, backgroundColor: theme.colors.successBg, alignItems: 'center', justifyContent: 'center' },
  resultTitle: { fontSize: 20, fontWeight: '700', color: theme.colors.primary, marginBottom: 4 },
  resultSubtitle: { fontSize: 14, fontWeight: '600', color: theme.colors.success },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 20 },
  gridItem: { width: '45%', gap: 4 },
  dataLabel: { fontSize: 10, fontWeight: '700', color: theme.colors.subtext, letterSpacing: 0.5 },
  dataValue: { fontSize: 15, fontWeight: '600', color: theme.colors.primary },
  issuerPill: { backgroundColor: '#EFF6FF', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, alignSelf: 'flex-start', marginTop: 4 },
  issuerText: { fontSize: 12, fontFamily: 'Courier', color: theme.colors.cta },
  errorDesc: { color: 'rgba(220, 38, 38, 0.8)', fontSize: 14, lineHeight: 20, marginTop: 4 },
});
