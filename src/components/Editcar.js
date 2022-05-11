import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

function Editcar({ updateCar, params }) {
  const [open, setOpen] = React.useState(false);
  const [car, setCar] = React.useState({
      brand: '',
      model: '',
      fuel: '',
      price: '',
      year: ''
  })

  const handleClickOpen = () => {
    setOpen(true);
    setCar({
        brand: params.data.brand,
        model: params.data.model,
        color: params.data.color,
        fuel: params.data.fuel,
        price: params.data.price,
        year: params.data.year
    })
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    updateCar(car, params.value);
  }

  const inputChanged =(event) => {
    setCar({...car, [event.target.name]: event.target.value})
  }

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit car</DialogTitle>
        <DialogContent>
          <TextField
          name="brand"
          value={car.brand}
          onChange={inputChanged}
          margin="dense"
          label="Brand"
          fullWidth
          variant="standard"
        />
        <TextField
          name="model"
          value={car.model}
          onChange={inputChanged}
          margin="dense"
          label="Model"
          fullWidth
          variant="standard"
        />
         <TextField
          name="color"
          onChange={inputChanged}
          value={car.color}
          margin="dense"
          label="Color"
          fullWidth
          variant="standard"
        />
         <TextField
          name="fuel"
          onChange={inputChanged}
          value={car.fuel}
          margin="dense"
          label="Fuel"
          fullWidth
          variant="standard"
        />
        <TextField
          name="year"
          onChange={inputChanged}
          value={car.year}
          margin="dense"
          label="Year"
          fullWidth
          variant="standard"
        />
        <TextField
          name="price"
          onChange={inputChanged}
          value={car.price}
          margin="dense"
          label="Price"
          fullWidth
          variant="standard"
        />
        
    


        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Editcar;