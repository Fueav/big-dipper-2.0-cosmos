import React from 'react';
import classnames from 'classnames';
import numeral from 'numeral';
import Typography from '@material-ui/core/Typography';
import useTranslation from 'next-translate/useTranslation';
import Box from '@/components/box';
import CustomToolTip, { type CustomToolTipData } from '@/components/custom_tool_tip';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import chainConfig from '@/chainConfig';
import { useStyles } from '@/screens/home/components/tokenomics/styles';
import { useTokenomics } from '@/screens/home/components/tokenomics/hooks';

const Tokenomics: React.FC<{
  className?: string;
}> = ({ className }) => {
  const { t } = useTranslation('home');
  const { classes, theme } = useStyles();
  const { state } = useTokenomics();

  const customToolTip = (
    <CustomToolTip>
      {(x) => (
        <>
          <Typography variant="caption">{t(x.legendKey)}</Typography>
          <Typography variant="body1">
            {x.value} ({x.percent})
          </Typography>
        </>
      )}
    </CustomToolTip>
  );

  const data: CustomToolTipData[] = [
    {
      legendKey: 'bonded',
      percentKey: 'bondedPercent',
      value: numeral(state.bonded).format('0,0'),
      rawValue: state.bonded,
      percent: `${numeral((state.bonded * 100) / state.total).format('0.00')}%`,
      fill: theme.palette.custom.tokenomics.one,
    },
    {
      legendKey: 'unbonded',
      percentKey: 'unbondedPercent',
      value: numeral(state.unbonded).format('0,0'),
      rawValue: state.unbonded,
      percent: `${numeral((state.unbonded * 100) / state.total).format('0.00')}%`,
      fill: theme.palette.custom.tokenomics.two,
    },
    {
      legendKey: 'unbonding',
      value: numeral(state.unbonding).format('0,0'),
      rawValue: state.unbonding,
      percent: `${numeral((state.unbonding * 100) / state.total).format('0.00')}%`,
      fill: theme.palette.custom.tokenomics.three,
    },
  ];

  return (
    <Box className={classnames(className, classes.root)}>
      <Typography variant="h2" className={classes.label}>
        {t('tokenomics')}
      </Typography>
      <div className={classes.data}>
        {data.slice(0, 2).map((x) => (
          <div className="data__item" key={x.percentKey}>
            <Typography variant="h4">
              {x.value} {chainConfig.tokenUnits[state.denom]?.display?.toUpperCase()}
            </Typography>
            <Typography variant="caption">
              {x.percentKey
                ? t(x.percentKey, {
                    percent: x.percent,
                  })
                : ''}
            </Typography>
          </div>
        ))}
      </div>
      <div className={classes.content}>
        <PieChart width={200} height={100} cy={100}>
          <Pie
            stroke="none"
            // cornerRadius={40}
            cy={90}
            data={data}
            startAngle={180}
            endAngle={0}
            // innerRadius={79}
            outerRadius={90}
            fill="#8884d8"
            // paddingAngle={-10}
            dataKey="rawValue"
            // stroke={theme.palette.background.paper}
            // strokeWidth={3}
            isAnimationActive={false}
          >
            {data.map((entry) => (
              <Cell key={entry.legendKey} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip content={customToolTip} />
        </PieChart>

        <div className={classes.legends}>
          {data.map((x: any) => (
            <div className="legends__item" key={x.legendKey}>
              <Typography variant="caption">{t(x.legendKey)}</Typography>
            </div>
          ))}
        </div>
      </div>
    </Box>
  );
};

export default Tokenomics;
