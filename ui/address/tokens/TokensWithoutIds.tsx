import { Show, Hide } from '@chakra-ui/react';
import type { UseQueryResult } from '@tanstack/react-query';
import React from 'react';

import type { AddressTokensResponse } from 'types/api/address';

import useIsMobile from 'lib/hooks/useIsMobile';
import ActionBar from 'ui/shared/ActionBar';
import DataListDisplay from 'ui/shared/DataListDisplay';
import Pagination from 'ui/shared/Pagination';
import type { Props as PaginationProps } from 'ui/shared/Pagination';

import TokensListItem from './TokensListItem';
import TokensTable from './TokensTable';

type Props = {
  tokensQuery: UseQueryResult<AddressTokensResponse> & {
    pagination: PaginationProps;
    isPaginationVisible: boolean;
  };
}

const TokensWithoutIds = ({ tokensQuery }: Props) => {
  const isMobile = useIsMobile();

  const { isError, isLoading, data, pagination, isPaginationVisible } = tokensQuery;

  const actionBar = isMobile && isPaginationVisible && (
    <ActionBar mt={ -6 }>
      <Pagination ml="auto" { ...pagination }/>
    </ActionBar>
  );

  const content = data?.items ? (
    <>
      <Hide below="lg" ssr={ false }><TokensTable data={ data.items } top={ isPaginationVisible ? 72 : 0 }/></Hide>
      <Show below="lg" ssr={ false }>{ data.items.map(item => <TokensListItem key={ item.token.address } { ...item }/>) }</Show></>
  ) : null;

  return (
    <DataListDisplay
      isError={ isError }
      isLoading={ isLoading }
      items={ data?.items }
      skeletonDesktopColumns={ [ '30%', '30%', '10%', '20%', '10%' ] }
      emptyText="There are no tokens of selected type."
      content={ content }
      actionBar={ actionBar }
    />
  );

};

export default TokensWithoutIds;
