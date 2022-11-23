import React from 'react';
import classnames from 'classnames';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useStyles } from '@/components/linear_loading/styles';

const LinearLoading: React.FC<{
  className?: string;
}> = ({ className }) => {
  const classes = useStyles();
  return (
    <div className={classnames(className, classes.root)}>
      <LinearProgress />
    </div>
  );
};

export default LinearLoading;
