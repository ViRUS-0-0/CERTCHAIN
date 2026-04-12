import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Shield, Globe, FileCheck, ArrowRight, ExternalLink, Sparkles, Loader2 } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { theme } from '../../src/theme';
import { Button } from '../../src/components/Button';
import { Card } from '../../src/components/Card';
import { StatusBadge } from '../../src/components/StatusBadge';
import { fetchRecentCerts } from '../../src/utils/blockchain';

export default function HomeScreen() {
  const router = useRouter();
  const [liveCerts, setLiveCerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCerts();
  }, []);

  const loadCerts = async () => {
    setLoading(true);
    try {
      const certs = await fetchRecentCerts();
      setLiveCerts(certs);
    } catch (err) {
      console.log('Failed to fetch certs:', err);
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
    });
  };

  const shortenHash = (hash: string) => {
    if (!hash) return '';
    return `${hash.substring(0, 8)}...`;
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(200, 220, 255, 0.4)', 'rgba(240, 240, 250, 0.5)']}
        style={StyleSheet.absoluteFillObject}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={loadCerts} />}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.pill}>
            <Sparkles size={14} color="#3B82F6" />
            <Text style={styles.pillText}>IDENTITY ON CHAIN</Text>
          </View>
          <Text style={styles.heroTitle}>Verifiable Trust</Text>
          <Text style={styles.heroSubtitle}>made simple.</Text>
          <Text style={styles.heroDescription}>
            The standard for secure, tamper-proof credential verification. Powered by Ethereum.
          </Text>
          <View style={styles.heroButtons}>
            <Button
              title="Start Issuing"
              onPress={() => router.push('/issue')}
              icon={<ArrowRight size={20} color="#fff" />}
              style={styles.actionBtn}
            />
            <Button
              title="Verify Credential"
              variant="secondary"
              onPress={() => router.push('/verify')}
              style={styles.actionBtn}
            />
          </View>
        </View>

        {/* Features Level */}
        <View style={styles.featuresSection}>
          <Card style={styles.featureCard}>
            <View style={[styles.iconBox, { backgroundColor: '#EFF6FF' }]}>
              <Shield size={24} color="#2563EB" />
            </View>
            <Text style={styles.featureTitle}>Tamper Proof</Text>
            <Text style={styles.featureDesc}>Cryptographically secured records that serve as immutable proof of achievement.</Text>
          </Card>
          
          <Card style={styles.featureCard}>
            <View style={[styles.iconBox, { backgroundColor: '#FAF5FF' }]}>
              <Globe size={24} color="#9333EA" />
            </View>
            <Text style={styles.featureTitle}>Global Access</Text>
            <Text style={styles.featureDesc}>Decentralized infrastructure ensures verification works instantly from anywhere.</Text>
          </Card>

          <Card style={styles.featureCard}>
            <View style={[styles.iconBox, { backgroundColor: '#F0FDF4' }]}>
              <FileCheck size={24} color="#16A34A" />
            </View>
            <Text style={styles.featureTitle}>Instant Verify</Text>
            <Text style={styles.featureDesc}>One-click validation of any certificate ID against the blockchain ledger.</Text>
          </Card>
        </View>

        {/* Live Activity Section */}
        <View style={styles.activitySection}>
          <View style={styles.activityHeader}>
            <View>
              <Text style={styles.activityTitle}>Live Activity</Text>
              <Text style={styles.activitySubtitle}>Real-time issuance on the network</Text>
            </View>
            <Button title="Refresh" variant="ghost" onPress={loadCerts} />
          </View>

          {loading ? (
            <Card style={styles.centerCard}>
              <Loader2 size={24} color={theme.colors.subtext} style={{ marginBottom: 12 }} />
              <Text style={styles.emptyText}>Fetching on-chain activity...</Text>
            </Card>
          ) : liveCerts.length === 0 ? (
            <Card style={styles.centerCard}>
              <FileCheck size={32} color={theme.colors.subtext} style={{ marginBottom: 12, opacity: 0.5 }} />
              <Text style={[styles.featureTitle, { marginBottom: 4 }]}>No certificates issued yet</Text>
              <Text style={styles.emptyText}>Issue your first certificate to see it appear here.</Text>
            </Card>
          ) : (
            <View style={styles.list}>
              {liveCerts.map((cert) => (
                <Card key={cert.txHash} style={styles.activityItem}>
                  <View style={styles.activityItemHeader}>
                    <View style={styles.itemIconBox}>
                      <FileCheck size={20} color={theme.colors.subtext} />
                    </View>
                    <View style={styles.itemInfo}>
                      <Text style={styles.itemName}>{cert.studentName}</Text>
                      <Text style={styles.itemCourse}>{cert.degree}</Text>
                    </View>
                    <StatusBadge label="Verified" />
                  </View>
                  <View style={styles.activityItemDetails}>
                    <View style={styles.detailCol}>
                      <Text style={styles.detailLabel}>TIME</Text>
                      <Text style={styles.detailValue}>{formatTimestamp(cert.timestamp)}</Text>
                    </View>
                    <View style={styles.detailCol}>
                      <Text style={styles.detailLabel}>TX HASH</Text>
                      <Text style={styles.detailValueMono}>{shortenHash(cert.txHash)}</Text>
                    </View>
                    <Button
                      variant="ghost"
                      title=""
                      icon={<ExternalLink size={18} color={theme.colors.subtext} />}
                      onPress={() => router.push({ pathname: '/verify', params: { id: cert.certId } })}
                      style={styles.pushBtn}
                    />
                  </View>
                </Card>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  scrollContent: { padding: 24, paddingBottom: 100 },
  heroSection: { alignItems: 'center', marginVertical: 40 },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
    marginBottom: 16,
  },
  pillText: { fontSize: 10, fontWeight: '700', color: theme.colors.subtext, letterSpacing: 1 },
  heroTitle: { fontSize: 48, fontWeight: '800', color: theme.colors.primary, textAlign: 'center' },
  heroSubtitle: { fontSize: 36, fontWeight: '800', color: '#3B82F6', textAlign: 'center', marginBottom: 16 },
  heroDescription: { fontSize: 16, color: theme.colors.subtext, textAlign: 'center', paddingHorizontal: 20, marginBottom: 32, lineHeight: 24 },
  heroButtons: { width: '100%', gap: 12, flexDirection: 'column' },
  actionBtn: { width: '100%' },
  featuresSection: { gap: 16, marginBottom: 40 },
  featureCard: { gap: 12 },
  iconBox: { width: 48, height: 48, borderRadius: theme.borderRadius.lg, alignItems: 'center', justifyContent: 'center' },
  featureTitle: { fontSize: 20, fontWeight: '700', color: theme.colors.primary },
  featureDesc: { fontSize: 14, color: theme.colors.subtext, lineHeight: 22 },
  activitySection: { marginTop: 10 },
  activityHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20, paddingHorizontal: 4 },
  activityTitle: { fontSize: 24, fontWeight: '700', color: theme.colors.primary },
  activitySubtitle: { fontSize: 14, color: theme.colors.subtext, marginTop: 4 },
  centerCard: { alignItems: 'center', justifyContent: 'center', paddingVertical: 40 },
  emptyText: { fontSize: 14, color: theme.colors.subtext },
  list: { gap: 12 },
  activityItem: { padding: 16 },
  activityItemHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  itemIconBox: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#E5E7EB', alignItems: 'center', justifyContent: 'center' },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: '600', color: theme.colors.primary },
  itemCourse: { fontSize: 13, color: theme.colors.subtext, marginTop: 2 },
  activityItemDetails: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: 'rgba(0,0,0,0.05)', paddingTop: 12 },
  detailCol: { gap: 4 },
  detailLabel: { fontSize: 10, fontWeight: '700', color: theme.colors.subtext, letterSpacing: 0.5 },
  detailValue: { fontSize: 13, fontWeight: '500', color: theme.colors.secondary },
  detailValueMono: { fontSize: 13, color: theme.colors.secondary, fontFamily: 'Courier' },
  pushBtn: { paddingHorizontal: 8, height: 36 },
});
