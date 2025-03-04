import { Button, Grid, MenuItem, Paper, Popover, Stack } from '@mui/material';
import Container from '@mui/material/Container';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import Iconify from 'src/components/iconify';
import DispatchReportView from './dispatch-reports/dispatch-report';
import OrderReportView from './order-reports/order-report';
import ProductWiseReportView from './product-wise-report/product-wise-report';
import SeasonWiseReportView from './season-wise-report/season-wise-report';
import StockReportView from './stock-report/stock-report';
import StoreHouseReportView from './store-house-report/store-house-report';
import StoreHouseRD1ReportView from './store_house_rg1_report/store_house_rg1_report';
import WarehouseReportView from './warehouse-report/warehouse-report';
import WarehouseStockReportView from './warehouse-stock-report/warehouse-stock-report';

// ----------------------------------------------------------------------


/**
 * ReportView Component
 *
 * Renders a dashboard for selecting and displaying various reports.
 *
 * @returns {JSX.Element}
 */

export default function ReportView() {
  const [tab, setTab] = useState(0); // State for warehouse report tabs
  const [tabNew, setTabNew] = useState(0); // State for dispatch report tabs
  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState('');
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  /**
   * Handle click event to open Popover
   *
   * @param {Event} event - Click event
   */
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  /**
   * Handle menu item click to select a report category
   *
   * @param {string} val - Selected report category
   */
  const menuClick = (val) => {
    setSelected(val);
    handleClose();
  };

  return (
    <Container maxWidth="xl">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant='h4' mt={1}>Reports</Typography>
        <Button sx={{ gap: 2 }} aria-describedby={id} variant="contained" onClick={handleClick}>
          <Iconify icon={open ? "icon-park-outline:up-c" : "icon-park-outline:down-c"} />
          {selected || 'Select a report'}
        </Button>
        {/* Popover for selecting report category */}
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          maxWidth
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <MenuItem gap={20} onClick={() => menuClick('Warehouse reports')}>
            <Iconify icon="ph:warehouse-duotone" sx={{ mr: 2.5 }} />
            Warehouse reports
          </MenuItem>
          <MenuItem onClick={() => menuClick('Dispatch reports')}>
            <Iconify icon="carbon:delivery-parcel" sx={{ mr: 2.5 }} />
            Dispatch reports
          </MenuItem>
        </Popover>
      </Stack>
      {!selected ? (
        <>
          <Typography variant='h6' mt={1} mb={2} color="text.secondary">Select a report</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderRadius = '8px';
                  e.currentTarget.style.boxShadow = '5px 5px 10px rgba(77, 182, 172,0.9)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderRadius = '8px';
                  e.currentTarget.style.boxShadow = '2px 2px 10px rgba(0, 0, 0, 0.2)';
                }}

                elevation={5} onClick={() => menuClick('Warehouse reports')} sx={{ padding: 3, textAlign: 'center', cursor: 'pointer' }}>
                <Iconify icon="ph:warehouse-duotone" width={40} />
                <Typography variant="h6">Warehouse reports</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderRadius = '8px';
                  e.currentTarget.style.boxShadow = '5px 5px 10px rgba(77, 182, 172,0.9)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderRadius = '8px';
                  e.currentTarget.style.boxShadow = '2px 2px 10px rgba(0, 0, 0, 0.2)';
                }}

                elevation={5} onClick={() => menuClick('Dispatch reports')} sx={{ padding: 3, textAlign: 'center', cursor: 'pointer' }}>
                <Iconify icon="carbon:delivery-parcel" width={40} />
                <Typography variant="h6">Dispatch reports</Typography>
              </Paper>
            </Grid>
            {/* Add more report options as needed */}
          </Grid>
        </>
      ) : (
        <>
          {/* Render tabs based on selected report category */}
          {selected === 'Warehouse reports' && (
            <>
              <Tabs
                value={tab}
                onChange={(event, newValue) => setTab(newValue)}
                textColor="primary"
                indicatorColor="primary"
                variant="scrollable"
                allowScrollButtonsMobile
                scrollButtons="auto"
                style={{
                  marginBottom: '2%',
                  marginTop: -6,
                  marginLeft: -15,
                  display: 'flex',
                  justifyContent: 'flex-start',
                }}
              >
                <Tab label="Warehouse report" style={{ marginLeft: '-16px' }} />
                <Tab label="Stock report" />
                <Tab label="Product wise report" />
                <Tab label="Store house report" />
                <Tab label="Store house RG1 report" />
                <Tab label="Season-wise report" />
                <Tab label="Warehouse Stock report" />
              </Tabs>
              {tab === 0 && <WarehouseReportView />}
              {tab === 1 && <StockReportView />}
              {tab === 2 && <ProductWiseReportView />}
              {tab === 3 && <StoreHouseReportView />}
              {tab === 4 && <StoreHouseRD1ReportView />}
              {tab === 5 && <SeasonWiseReportView />}
              {tab === 6 && <WarehouseStockReportView/>}
            </>
          )}
          {selected === 'Dispatch reports' && (
            <>
              <Tabs
                value={tabNew}
                onChange={(event, newValue) => setTabNew(newValue)}
                textColor="primary"
                indicatorColor="primary"
                variant="scrollable"
                allowScrollButtonsMobile
                scrollButtons="auto"
                style={{
                  marginBottom: '2%',
                  marginTop: -6,
                  marginLeft: -15,
                  display: 'flex',
                  justifyContent: 'flex-start',
                }}
              >
                <Tab label="Dispatch report" style={{ marginLeft: '-16px' }} />
                <Tab label="Order report" />
              </Tabs>
              {/* Render corresponding report view based on tab selection */}
              {tabNew === 0 && <DispatchReportView />}
              {tabNew === 1 && <OrderReportView />}
            </>
          )}
        </>
      )}
    </Container>
  );
}