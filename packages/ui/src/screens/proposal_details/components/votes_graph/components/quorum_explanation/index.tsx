import React from 'react';
import Trans from 'next-translate/Trans';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '@/screens/proposal_details/components/votes_graph/components/quorum_explanation/styles';

const QuorumExplanation = (props: { quorum: number }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography>
        <Trans
          i18nKey="proposals:quorumExplanation"
          components={[<b />]}
          values={{
            quorum: props.quorum,
          }}
        />
      </Typography>
    </div>
  );
};

export default QuorumExplanation;
