import React from 'react';
import Trans from 'next-translate/Trans';
import Typography from '@material-ui/core/Typography';
import Name from '@/components/name';
import MsgMintFanToken from '@/models/msg/fantoken/msg_mint_fan_token';
import { useProfileRecoil } from '@/recoil/profiles';

const MintFanToken: React.FC<{ message: MsgMintFanToken }> = (props) => {
  const { message } = props;

  const recipient = useProfileRecoil(message.recipient);
  const recipientMoniker = recipient ? recipient?.name : message.recipient;

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txMsgMintFanToken"
        components={[<Name address={message.recipient} name={recipientMoniker} />]}
      />
    </Typography>
  );
};

export default MintFanToken;
