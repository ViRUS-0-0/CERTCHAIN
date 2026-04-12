import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ShieldCheck, Copy, CheckCircle, AlertCircle } from 'lucide-react-native';
import * as Clipboard from 'expo-clipboard';
import { theme } from '../../src/theme';
import { Button } from '../../src/components/Button';
import { Card } from '../../src/components/Card';
import { Input } from '../../src/components/Input';
import { issueCert } from '../../src/utils/blockchain';

export default function IssueScreen() {
  const [formData, setFormData] = useState({
    studentName: '',
    regNo: '',
    degree: '',
    institution: '',
    issueDate: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [txResult, setTxResult] = useState<{ certId: string; txHash: string } | null>(null);
  const [error, setError] = useState('');

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.studentName || !formData.regNo || !formData.degree || !formData.institution || !formData.issueDate) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const result = await issueCert(formData);
      setTxResult(result);
      setSuccess(true);
    } catch (err: any) {
      console.log('Issue error:', err);
      setError(err?.reason || err?.message || 'Failed to issue certificate.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (text: string) => {
    await Clipboard.setStringAsync(text);
    Alert.alert('Copied to clipboard');
  };

  const handleReset = () => {
    setSuccess(false);
    setTxResult(null);
    setFormData({ studentName: '', regNo: '', degree: '', institution: '', issueDate: '' });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(200, 220, 255, 0.4)', 'rgba(240, 240, 250, 0.5)']}
        style={StyleSheet.absoluteFillObject}
      />
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.title}>Issue New Certificate</Text>
          <Text style={styles.subtitle}>Fill in the details below to mint a certificate on the blockchain.</Text>
        </View>

        {success && txResult ? (
          <Card style={styles.successCard}>
            <View style={styles.successIconBox}>
              <CheckCircle size={32} color={theme.colors.success} />
            </View>
            <Text style={styles.successTitle}>Certificate Minted</Text>
            <Text style={styles.successDesc}>The certificate has been successfully recorded on the blockchain.</Text>

            <View style={styles.infoBox}>
              <View style={styles.infoHeader}>
                <Text style={styles.infoLabel}>CERTIFICATE ID</Text>
                <Button title="Copy" variant="ghost" onPress={() => handleCopy(txResult.certId)} style={styles.copyBtn} />
              </View>
              <Text style={styles.infoValue}>{txResult.certId}</Text>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>TRANSACTION HASH</Text>
              <Text style={styles.txHash}>{txResult.txHash}</Text>
            </View>

            <Button title="Issue Another" onPress={handleReset} variant="secondary" style={styles.resetBtn} />
          </Card>
        ) : (
          <Card style={styles.formCard}>
            {error ? (
              <View style={styles.errorBox}>
                <AlertCircle size={20} color={theme.colors.error} />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            <Input label="Student Name" placeholder="e.g. John Doe" value={formData.studentName} onChangeText={(v) => handleChange('studentName', v)} />
            <Input label="Registration Number" placeholder="e.g. 21BCE1234" value={formData.regNo} onChangeText={(v) => handleChange('regNo', v)} />
            <Input label="Degree / Course" placeholder="e.g. B.Tech Computer Science" value={formData.degree} onChangeText={(v) => handleChange('degree', v)} />
            <Input label="Institution" placeholder="e.g. VIT University" value={formData.institution} onChangeText={(v) => handleChange('institution', v)} />
            <Input label="Issue Date" placeholder="e.g. 2025-06-15" value={formData.issueDate} onChangeText={(v) => handleChange('issueDate', v)} />

            <View style={styles.divider} />
            <Button title={loading ? "Minting on Blockchain..." : "Issue Certificate"} onPress={handleSubmit} loading={loading} />
          </Card>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  scrollContent: { padding: 24, paddingTop: 60, paddingBottom: 100 },
  header: { marginBottom: 32 },
  title: { fontSize: 32, fontWeight: '800', color: theme.colors.primary, marginBottom: 8 },
  subtitle: { fontSize: 16, color: theme.colors.subtext, lineHeight: 24 },
  formCard: { gap: 20 },
  divider: { height: 1, backgroundColor: theme.colors.border, marginVertical: 10 },
  errorBox: { flexDirection: 'row', backgroundColor: theme.colors.errorBg, padding: 12, borderRadius: 8, gap: 10, alignItems: 'center' },
  errorText: { color: theme.colors.error, fontSize: 14, flex: 1 },
  successCard: { alignItems: 'center', paddingVertical: 40 },
  successIconBox: { width: 64, height: 64, borderRadius: 32, backgroundColor: theme.colors.successBg, alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  successTitle: { fontSize: 24, fontWeight: '800', color: theme.colors.primary, marginBottom: 8 },
  successDesc: { fontSize: 14, color: theme.colors.subtext, textAlign: 'center', marginBottom: 32 },
  infoBox: { width: '100%', backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: theme.colors.border, borderRadius: 12, padding: 16, marginBottom: 16 },
  infoHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  infoLabel: { fontSize: 11, fontWeight: '700', color: theme.colors.subtext, letterSpacing: 0.5 },
  infoValue: { fontSize: 14, color: theme.colors.primary, fontFamily: 'Courier' },
  txHash: { fontSize: 12, color: theme.colors.cta, fontFamily: 'Courier', marginTop: 4 },
  copyBtn: { height: 24, paddingHorizontal: 8 },
  resetBtn: { marginTop: 16, width: '100%' },
});
