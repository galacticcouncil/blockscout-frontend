import { chakra, Icon, Link, Tooltip, Hide } from '@chakra-ui/react';
import { route } from 'nextjs-routes';
import React from 'react';

import svgFileIcon from 'icons/files/csv.svg';
import useIsMobile from 'lib/hooks/useIsMobile';

interface Props {
  address: string;
  type: 'transactions' | 'internal-transactions' | 'token-transfers';
  className?: string;
}

const AddressCsvExportLink = ({ className, address, type }: Props) => {
  const isMobile = useIsMobile();

  return (
    <Tooltip isDisabled={ !isMobile } label="Download CSV">
      <Link
        className={ className }
        display="inline-flex"
        alignItems="center"
        whiteSpace="nowrap"
        href={ route({ pathname: '/csv-export', query: { type, address } }) }
        flexShrink={ 0 }
      >
        <Icon as={ svgFileIcon } boxSize={{ base: '30px', lg: 6 }}/>
        <Hide ssr={ false } below="lg"><chakra.span ml={ 1 }>Download CSV</chakra.span></Hide>
      </Link>
    </Tooltip>
  );
};

export default React.memo(chakra(AddressCsvExportLink));