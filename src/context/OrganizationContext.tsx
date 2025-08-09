import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import type { OrganizationSettings } from '@fireforge/shared/src/models';
import { organizationSettingsSchema } from '@fireforge/shared/src/models';
import { useAuth } from './AuthContext';

type OrganizationContextValue = {
  organizationId: string;
  settings: OrganizationSettings | null;
  loading: boolean;
  ensureDefaults: () => Promise<void>;
};

const OrganizationContext = createContext<OrganizationContextValue | undefined>(undefined);

export function OrganizationProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  // Phase 1: single-tenant placeholder until org selection is implemented
  const organizationId = 'default';
  const [settings, setSettings] = useState<OrganizationSettings | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const ref = doc(db, 'organizations', organizationId, 'meta', 'settings');
        const snap = await getDoc(ref);
        if (!isMounted) return;
        if (snap.exists()) {
          const parsed = organizationSettingsSchema.safeParse(snap.data());
          if (parsed.success) setSettings(parsed.data);
        }
      } catch {
        // ignore; will use defaults until saved
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    load();
    return () => { isMounted = false; };
  }, [organizationId, user?.uid]);

  const ensureDefaults = async () => {
    const ref = doc(db, 'organizations', organizationId, 'meta', 'settings');
    const defaults: OrganizationSettings = {
      organizationId,
      plan: 'free',
      allowCustomPalettes: false,
      chartPreferences: {},
    };
    await setDoc(ref, { ...defaults, ...(settings ?? {}) }, { merge: true });
  };

  const value = useMemo<OrganizationContextValue>(
    () => ({ organizationId, settings, loading, ensureDefaults }),
    [organizationId, settings, loading]
  );

  return <OrganizationContext.Provider value={value}>{children}</OrganizationContext.Provider>;
}

export function useOrganization() {
  const ctx = useContext(OrganizationContext);
  if (!ctx) throw new Error('useOrganization must be used within OrganizationProvider');
  return ctx;
}


