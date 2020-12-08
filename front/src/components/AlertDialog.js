import React, { memo } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

const AlertDialogSlide = memo(({ open, close, data, deleteNotif }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={close}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        {`Deletar ${data && data.patient.profile.name} ?`}
      </DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Essa ação não pode ser desfeita.
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={close} color="primary">
          Cancelar
        </Button>
        <Button
          onClick={() => {
            deleteNotif(data && data.id);
            close();
          }}
          color="primary"
        >
          Deletar
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default AlertDialogSlide;
