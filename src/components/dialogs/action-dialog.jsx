import LoadingButton from '@mui/lab/LoadingButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectState } from 'src/redux/actions/state-refresh';

export default function AlertDialog({ content, isDialogOpen, handleConfirm, handleClose }) {
  const dispatch = useDispatch();
  const currentState = useSelector((state) => state.stateRefreash.currentState);
  const [loading, setLoading] = useState(false);

  const handleAction = async () => {
    try {
      setLoading(true);
      handleConfirm();
      await new Promise((resolve) => setTimeout(resolve, 3000));
      dispatch(selectState(!currentState));
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onClose={handleClose}>
      <DialogTitle>Alert</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <LoadingButton loading={loading} onClick={handleAction}>Confirm</LoadingButton>
        <LoadingButton sx={{ color: 'error.main' }} onClick={handleClose}>Cancel</LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

AlertDialog.propTypes = {
  content: PropTypes.any,
  isDialogOpen: PropTypes.bool,
  handleConfirm: PropTypes.func,
  handleClose: PropTypes.func,
};