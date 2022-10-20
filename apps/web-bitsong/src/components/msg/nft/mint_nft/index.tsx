import React from 'react';
import Trans from 'next-translate/Trans';
import { Typography } from '@material-ui/core';
import { Name } from '@components';
import { MsgMintNFT } from '@models';
import { useProfileRecoil } from '@recoil/profiles';

const MintNFT = (props: {
  message: MsgMintNFT;
}) => {
  const { message } = props;

  const sender = useProfileRecoil(message.sender);
  const senderMoniker = sender ? sender?.name : message.sender;

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txMintNFTContent"
        components={[
          (
            <Name
              address={message.sender}
              name={senderMoniker}
            />
          ),
          <b />,
        ]}
        values={{
          id: message.id,
        }}
      />
    </Typography>
  );
};

export default MintNFT;
