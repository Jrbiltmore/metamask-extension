import { cloneDeep } from 'lodash';
import { hasProperty, isObject } from '@metamask/utils';

export const version = 90;

/**
 * Explain the purpose of the migration here.
 *
 * @param originalVersionedData - Versioned MetaMask extension state, exactly what we persist to dist.
 * @param originalVersionedData.meta - State metadata.
 * @param originalVersionedData.meta.version - The current state version.
 * @param originalVersionedData.data - The persisted MetaMask state, keyed by controller.
 * @returns Updated versioned MetaMask extension state.
 */
export async function migrate(originalVersionedData: {
  meta: { version: number };
  data: Record<string, unknown>;
}) {
  const versionedData = cloneDeep(originalVersionedData);
  versionedData.meta.version = version;
  versionedData.data = transformState(versionedData.data);
  return versionedData;
}

function transformState(state: Record<string, unknown>) {
  if (
    !hasProperty(state, 'PhishingController') ||
    !isObject(state.PhishingController) ||
    !hasProperty(state.PhishingController, 'listState')
  ) {
    return state;
  }

  delete state.PhishingController.listState;

  return state;
}
