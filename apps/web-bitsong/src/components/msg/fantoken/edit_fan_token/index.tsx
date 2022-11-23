import React from 'react';
import Trans from 'next-translate/Trans';
import Typography from '@material-ui/core/Typography';
import Name from '@/components/name';
import MsgEditFanToken from '@/models/msg/fantoken/msg_edit_fan_token';
import { useProfileRecoil } from '@/recoil/profiles';

const EditFanToken: React.FC<{ message: MsgEditFanToken }> = (props) => {
  const { message } = props;

  const owner = useProfileRecoil(message.owner);
  const ownerMoniker = owner ? owner?.name : message.owner;

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txMsgEditFanToken"
        components={[<Name address={message.owner} name={ownerMoniker} />]}
      />
    </Typography>
  );
};

export default EditFanToken;
