// import * as React from 'react';
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { format } from 'date-fns';
import { useTheme } from "@mui/material/styles";
import { TextField, Typography } from "@mui/material";

const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 90 },
    { field: "products", headerName: "Product", width: 90 },
    { field: "qty", headerName: "Jumlah Pesanan", type: "number", width: 100 },
    { field: "created_date", headerName: "Date", width: 110 },
    { field: "status", headerName: "Status", width: 120 },
    {
        field: "total_price",
        headerName: "Total Harga",
        width: 120,
        valueFormatter: (params) => {
            const { value } = params;
            const numericValue = String(value).replace(/\D/g, '');

            const formattedValue = numericValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

            return formattedValue;
        },
    },
];

export default function DataReport() {
    const [rows, setRows] = useState([]);
    const [dateFilter, setDateFilter] = useState(format(new Date(), 'yyyy-MM-dd'));

    const getOrder = async () => {
        try {
            let url = "/datareport";

            const response = await axios.get(url);
            const paidOrders = response.data.filter((order) => {
                if (dateFilter) {
                    const orderDate = new Date(order.created_date);
                    const filterDate = new Date(dateFilter);
                    return (
                        order.status === "Paid" &&
                        orderDate.getFullYear() === filterDate.getFullYear() && 
                        orderDate.getMonth() === filterDate.getMonth()
                        // orderDate.getDate() === filterDate.getDate()
                    );
                } else {
                    return order.status === "Paid";
                }
            });
            setRows(paidOrders);
        } catch (error) {
            console.log("Error:", error);
        }
    };

    useEffect(() => {
        getOrder();
    }, [dateFilter]);

    const onStartDateFilterChange = (event) => {
        setDateFilter(event.target.value);
    };

    return (
        <>
            <TextField
              
                type="date"
                label="Date"
                value={dateFilter|| ''}
                // defaultValue={dateFilter}
                onChange={onStartDateFilterChange}
                InputLabelProps={{
                    shrink: true,
                }}
                sx={{ ml: 2 }}
            />
            <div className="px-4" style={{ height: 400, width: "100%" }}>
                {rows.length > 0 ? (
                    <DataGrid
                        
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                        
                        // checkboxSelection
                    />
                ) : (
                    <Typography variant="body1" align="center" mt={3}>
                        No products order found.
                    </Typography>
                )}
            </div>
        </>
    );
}
