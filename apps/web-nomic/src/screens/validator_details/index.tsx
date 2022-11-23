import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { NextSeo } from 'next-seo';
import Layout from '@/components/layout';
import LoadAndExist from '@/components/load_and_exist';
import DesmosProfile from '@/components/desmos_profile';
import { useStyles } from '@/screens/validator_details/styles';
import Profile from '@/screens/validator_details/components/profile';
import VotingPower from '@/screens/validator_details/components/voting_power';
import Blocks from '@/screens/validator_details/components/blocks';
import ValidatorOverview from '@/screens/validator_details/components/validator_overview';
import { useValidatorDetails } from '@/screens/validator_details/hooks';

const ValidatorDetails = () => {
  const { t } = useTranslation('validators');
  const classes = useStyles();
  const { state } = useValidatorDetails();
  const { desmosProfile, status } = state;

  return (
    <>
      <NextSeo
        title={t('validatorDetails')}
        openGraph={{
          title: t('validatorDetails'),
        }}
      />
      <Layout navTitle={t('validatorDetails')}>
        <LoadAndExist exists={state.exists} loading={state.loading}>
          <span className={classes.root}>
            {desmosProfile ? (
              <DesmosProfile className={classes.profile} {...desmosProfile} />
            ) : (
              <Profile className={classes.profile} profile={state.overview} />
            )}
            <ValidatorOverview
              className={classes.address}
              overview={state.overview}
              status={state.status}
            />
            <VotingPower
              className={classes.votingPower}
              data={state.votingPower}
              inActiveSet={status.inActiveSet}
            />
            <Blocks className={classes.blocks} />
          </span>
        </LoadAndExist>
      </Layout>
    </>
  );
};

export default ValidatorDetails;
