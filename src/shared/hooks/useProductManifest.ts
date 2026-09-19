import { useEffect, useRef, useState } from 'react';

export interface ProductImage {
  src: string;
  name: string;
}

export type ProductManifest = Record<string, ProductImage[]>;

const MANIFEST_URL = '/assets/product-manifest.json';

/**
 * Loads the auto-generated product manifest (see `scripts/generate-product-manifest.js`)
 * and keeps it fresh by polling. The manifest is regenerated on the server
 * whenever a photo is added to or removed from a `storage/<category>` folder,
 * so polling is what makes the gallery reflect that change without a
 * deployment or a manual page reload.
 *
 * The fetched payload is only applied to state when it actually changed, so
 * carousels the user is browsing don't reset on every poll.
 */
export function useProductManifest(pollIntervalMs = 20000): ProductManifest {
  const [manifest, setManifest] = useState<ProductManifest>({});
  const lastPayloadRef = useRef<string>('');

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const response = await fetch(MANIFEST_URL, { cache: 'no-store' });
        if (!response.ok || cancelled) return;

        const raw = await response.text();
        if (cancelled || raw === lastPayloadRef.current) return;

        lastPayloadRef.current = raw;
        setManifest(JSON.parse(raw) as ProductManifest);
      } catch {
        // Network hiccup or manifest not ready yet — keep previous state.
      }
    };

    load();
    const intervalId = setInterval(load, pollIntervalMs);

    return () => {
      cancelled = true;
      clearInterval(intervalId);
    };
  }, [pollIntervalMs]);

  return manifest;
}
