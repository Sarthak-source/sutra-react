import { useTheme } from '@emotion/react';
import { Box, Button, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NetworkRepository from 'src/app-utils/network_repository';
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
import SkeletonLoader from 'src/layouts/dashboard/common/skeleton-loader';
import { updateWarehouse } from 'src/redux/actions/warehouse-update-action';
import { useRouter } from 'src/routes/hooks';
import TableHeader from '../table-header';

export default function WarehouseTableView() {
  const theme = useTheme();
  const router = useRouter();
  const [warehouse, setWarehouseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const selectedUserConfig = useSelector((state) => state.user.selectUserConfig);
  const [selectedOption, setSelectedOption] = useState('');

  const dispatch = useDispatch();

  const handleOpenWarehouseView = () => {
    dispatch(updateWarehouse({}));
    router.replace('/home/warehouse-management/add-warehouse-form');
  }

  const handleUpdateWarehouse = (row) => {
    dispatch(updateWarehouse(row));
    router.replace('/home/warehouse-management/add-warehouse-form');
  }

  useEffect(() => {
    const fetchWareHouseBatchData = async () => {
      try {
        setLoading(true);
        const data = await NetworkRepository.getWarehouseList(selectedOption, selectedUserConfig.seller.id);
        setWarehouseData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWareHouseBatchData();

    return () => {
      setWarehouseData([]); // Reset data on component unmount
    };
  }, [selectedUserConfig, selectedOption]);


  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Warehouse
        </Typography>
        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenWarehouseView}>
          Add Warehouse
        </Button>
      </Stack>

      <TableHeader
        selectedUser={selectedUserConfig.seller} 
        selectedOption={selectedOption} 
        handleSelectChange={handleSelectChange} 
      />

      {loading ? (
        <SkeletonLoader marginTop='-100' />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Code</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Mill</TableCell>
                <TableCell>Area</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Status</TableCell>
                <TableCell style={{ position: 'sticky', right: 0, zIndex: 0 }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {warehouse.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.code}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.mill.name}</TableCell>
                  <TableCell>{item.area}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>
                    <Label>
                      {item.is_active === 'Active' ? 'Active' : 'Inactive'}
                    </Label>
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{
                      position: 'sticky',
                      right: 0,
                      zIndex: 0,
                      backgroundColor: theme.palette.common.white,
                    }}
                  >
                    <IconButton onClick={() => handleUpdateWarehouse(item)}>
                      <Iconify icon="eva:edit-fill" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
