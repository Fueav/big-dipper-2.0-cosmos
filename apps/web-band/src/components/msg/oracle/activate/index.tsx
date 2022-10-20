import React from 'react';
import Trans from 'next-translate/Trans';
import { Typography } from '@material-ui/core';
import { Name } from '@components';
import { MsgActivate } from '@models';
import { useProfileRecoil } from '@recoil/profiles';

const Activate = (props: {
  message: MsgActivate;
}) => {
  const { message } = props;

  const validator = useProfileRecoil(message.validator);
  const validatorMoniker = validator ? validator?.name : message
    .validator;

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txActivate"
        components={[
          (
            <Name
              address={message.validator}
              name={validatorMoniker}
            />
          ),
        ]}
      />
    </Typography>
  );
};

export default Activate;
