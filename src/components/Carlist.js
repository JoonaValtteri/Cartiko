import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import Addcar from './Addcar';
import EditCar from './Editcar'

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function Carlist () {
    const [cars, setCars] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg,setMsg] = useState('');

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = () => {
        fetch(process.env.REACT_APP_API_URL)
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
    }

    const deleteCar = (link) => {
        if (window.confirm('Are you sure?')) {
        fetch(link, {method: 'DELETE' })
        .then(response => {
            if (response.ok) {
                setMsg('Car deleted')
                setOpen(true);
                fetchCars();
            }
            else {
                alert('Something went wrong');
            }
        })
    }
    }

    const addCar = (car) => {
        fetch(process.env.REACT_APP_API_URL,{
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(car)
        })
        .then(response => {
            if (response.ok) {
                fetchCars();
            }
            else{
                alert('Something whent wrong when adding a car');
            }
        })
        .catch(err => console.error(err))
    }

    const updateCar = (updatedCar, link) => {
        fetch(link,{
            method: 'PUT',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(updatedCar)
        })
        .then(response => {
            if (response.ok) {
                setMsg('Car edited succesfully');
                setOpen(true);
                fetchCars();
            }
            else {
                alert('Something went wrong when editing car');
            }
        })
        .catch(err => console.error(err))
    }

    const columns = [
        {field: 'brand', sortable: true, filter: true},
        {field: 'model', sortable: true, filter: true},
        {field: 'color', sortable: true, filter: true},
        {field: 'fuel', sortable: true, filter: true, width: 120},
        {field: 'year', sortable: true, filter: true, width: 120},
        {field: 'price', sortable: true, filter: true, width: 120},
        {
        headerName: '',
        width: 100,
        field: '_links.self.href',
        cellRenderer: params => <EditCar updateCar={updateCar} params={params} />
        },
        {
            headerName: '', 
            width: 100,
            field: '_links.self.href',
            cellRenderer: params =>
            <IconButton color="error" onClick={() => deleteCar(params.value)}>
                <DeleteIcon />
                </IconButton>
        }
    ]

    return(
        <>
        <Addcar addCar={addCar} />
            <div className="ag-theme-material" style={{height: 600, width: '90%'}}>
                 <AgGridReact
                    columnDefs={columns}
                    rowData={cars}
                    pagination={true}
                    paginationPageSize={10}
                    suppressCellFocus={true}

                />
            </div>
            <Snackbar 
                open={open}
                message={msg}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
            />
        </>
    )
}

export default Carlist;