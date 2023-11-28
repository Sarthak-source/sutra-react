import PropTypes from 'prop-types';
import { useState } from 'react';

import { Avatar, Stack, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { ApiAppConstants, ip } from 'src/app-utils/api-constants';
import Iconify from 'src/components/iconify';
import { useDispatchTableFuctions } from './use-dispatch-table-fuctions';

export default function DispatchTableRow({
    orderNo,
    invoiceNo,
    millName,
    name,
    date,
    vehicleNumber,
    quantity,
    billedTo,
    shipTo,
    rate,
    grade,
}) {
    const [open, setOpen] = useState(null);

    const handleOpenMenu = (event) => {
        setOpen(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpen(null);
    };

    const { handlePrint } = useDispatchTableFuctions();
    const pdfUrl = `http://${ip}/${ApiAppConstants.getInvoiceDoc}${invoiceNo}`;


    return (
        <>
            <TableRow hover tabIndex={-1} role="checkbox">
                <TableCell>{orderNo}</TableCell>
                <TableCell>{invoiceNo}</TableCell>
                <TableCell component="th" scope="row" padding="normal" >
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar alt={millName} src='avatarUrl' />
                        <Typography variant="subtitle2" noWrap>
                            {millName}
                        </Typography>
                    </Stack>
                </TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{date}</TableCell>
                <TableCell>{vehicleNumber}</TableCell>
                <TableCell>{quantity}</TableCell>
                <TableCell>{billedTo}</TableCell>
                <TableCell>{shipTo}</TableCell>
                <TableCell>{rate}</TableCell>
                <TableCell>{grade}</TableCell>
                <TableCell align="right">
                    <IconButton onClick={handleOpenMenu}>
                        <Iconify icon="eva:more-vertical-fill" />
                    </IconButton>
                </TableCell>
            </TableRow>
            <Popover
                open={!!open}
                anchorEl={open}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: { width: 140 },
                }}
            >
                <MenuItem onClick={() => handlePrint(pdfUrl)}>
                    <Iconify icon="lets-icons:print" sx={{ mr: 2 }} />
                    Print
                </MenuItem>

                <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
                    <Iconify icon="fluent:calendar-cancel-24-regular" sx={{ mr: 2 }} />
                    Cancel
                </MenuItem>
            </Popover>
        </>
    );
}

DispatchTableRow.propTypes = {
    orderNo: PropTypes.string,
    invoiceNo: PropTypes.string,
    millName: PropTypes.string,
    name: PropTypes.string,
    date: PropTypes.string,
    vehicleNumber: PropTypes.string,
    quantity: PropTypes.string,
    billedTo: PropTypes.string,
    shipTo: PropTypes.string,
    rate: PropTypes.string,
    grade: PropTypes.string,
};