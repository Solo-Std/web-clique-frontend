import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import FileUpload from '@material-ui/icons/FileUpload';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 10,
  },
});

function IconLabelButtons(props) {
  const { classes } = props;
  return (
      <Button variant="contained" color="default" className={classes.button}>
        Upload
        <FileUpload className={classes.rightIcon} />
      </Button>
  );
}

IconLabelButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconLabelButtons);
