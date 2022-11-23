import { useCallback, useState } from 'react';
import * as R from 'ramda';
import {
  useProvidersQuery,
  // ProvidersQuery,
  useActiveProvidersListenerSubscription,
  useActiveLeasesListenerSubscription,
  useCpuMemoryStorageListenerSubscription,
  CpuMemoryStorageListenerSubscription,
  ProvidersQuery,
} from '@/graphql/types/general_types';
import type { ProviderInfo, ProvidersState } from '@/screens/providers/types';

export const useProviders = () => {
  const [state, setState] = useState<ProvidersState>({
    loading: true,
    exists: true,
    activeProvidersCount: 0,
    activeLeasesCount: 0,
    cpu: {
      used: 0,
      available: 0,
    },
    memory: {
      used: 0,
      available: 0,
    },
    storage: {
      used: 0,
      available: 0,
      pending: 0,
    },
    providers: {
      isNextPageLoading: false,
      items: [],
      pages: [],
      pagination: {
        itemsPerPage: 15,
        currentPage: 0,
        totalCount: 0,
      },
    },
  });

  const handleSetState = useCallback((stateChange: Partial<ProvidersState>) => {
    setState((prevState) => {
      const newState = { ...prevState, ...stateChange };
      return R.equals(prevState, newState) ? prevState : newState;
    });
  }, []);

  /**
   * Paginates the given data by splitting it into a list of arrays,
   * each one having the selected number of items.
   */
  const createPagination = (data: any[]): any[][] => {
    const pages: Array<unknown[]> = [];
    data.forEach((x, i) => {
      const selectedKey = Math.floor(i / state.providers.pagination.itemsPerPage);
      pages[selectedKey] = pages[selectedKey] || [];
      pages[selectedKey].push(x);
    });
    return pages;
  };

  const handleSearch = (value: string) => {
    filterAndPaginateProviders(state.providers.items, value);
  };

  // ================================
  // tx subscription
  // ================================
  useActiveProvidersListenerSubscription({
    onData: (data) => {
      handleSetState({
        activeProvidersCount: data.data.data?.activeProviders.aggregate?.count ?? 0,
      });
    },
  });

  useActiveLeasesListenerSubscription({
    onData: (data) => {
      handleSetState({
        activeLeasesCount: data.data.data?.activeLeases.aggregate?.sum?.lease_count,
      });
    },
  });

  useCpuMemoryStorageListenerSubscription({
    onData: (data) => {
      if (!data.data.data) return;
      const activeData = formatCPUMemoryStorageData(data.data.data);
      handleSetState({
        cpu: activeData.cpu,
        memory: activeData.memory,
        storage: activeData.storage,
      });
    },
  });

  const formatCPUMemoryStorageData = (data: CpuMemoryStorageListenerSubscription) => {
    const mappedData = data.specs.map((item) => ({
      memory: {
        available: item.available.memory,
        used: item.active.memory,
      },
      cpu: {
        available: item.available.cpu,
        used: item.active.cpu,
      },
      storage: {
        available: item.available.storage_ephemeral,
        used: item.active.storage_ephemeral,
        pending: item.pending.storage_ephemeral,
      },
    }));

    return mappedData.reduce(
      (total, row) => ({
        memory: {
          available: total.memory.available + row.memory.available,
          used: total.memory.used + row.memory.used,
        },
        cpu: {
          available: total.cpu.available + row.cpu.available,
          used: total.cpu.used + row.cpu.used,
        },
        storage: {
          available: total.storage.available + row.storage.available,
          used: total.storage.used + row.storage.used,
          pending: total.storage.pending + row.storage.pending,
        },
      }),
      {
        memory: {
          available: 0,
          used: 0,
        },
        cpu: {
          available: 0,
          used: 0,
        },
        storage: {
          available: 0,
          used: 0,
          pending: 0,
        },
      }
    );
  };

  // ================================
  // tx query
  // ================================

  const formatProviders = (data: ProvidersQuery['list']) =>
    data.map((item) => {
      const { attributes, hostUri, info, ownerAddress } = item;
      const organization = attributes?.find(
        (attribute: { key: string; value: string }) => attribute.key === 'organization'
      )?.value;
      const region = attributes?.find(
        (attribute: { key: string; value: string }) => attribute.key === 'region'
      )?.value;
      return {
        ownerAddress,
        hostURI: hostUri,
        region,
        organization,
        emailAddress: info.email,
        website: info.website,
      };
    });

  const filterAndPaginateProviders = (items: ProviderInfo[], search: string) => {
    let filteredPaginatedItems = items;

    // Filter the providers based on the search
    if (search) {
      filteredPaginatedItems = state.providers.items.filter((x) => {
        const formattedSearch = search.toLowerCase().replace(/ /g, '');
        return x.ownerAddress.toLowerCase().includes(formattedSearch);
        // if x.organization !==undefined, then return search results
        // || x.organization.toLowerCase().replace(/ /g, '').includes(formattedSearch);
      });
    }

    // Handle the pagination
    handleSetState({
      loading: false,
      providers: {
        items,
        pages: createPagination(filteredPaginatedItems),
        isNextPageLoading: false,
        pagination: {
          totalCount: filteredPaginatedItems.length,
        },
      },
    });
  };

  // ===================
  // === Fetch data
  // ===================

  useProvidersQuery({
    onError: () => {
      handleSetState({
        loading: false,
      });
    },
    onCompleted: (data) => {
      filterAndPaginateProviders(formatProviders(data.list), '');
    },
  });

  return {
    state,
    handleSearch,
  };
};
