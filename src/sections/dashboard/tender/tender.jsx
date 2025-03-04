
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import { format, parseISO } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import SkeletonLoader from 'src/layouts/dashboard/common/skeleton-loader';
import { setFullScreen } from 'src/redux/actions/full-screen-action';
import { selectTenderStep } from 'src/redux/actions/tab-step-action';
import { useRouter } from 'src/routes/hooks';
import NetworkRepository from '../../../app-utils/network_repository'; // Adjust the path
import { QontoConnector } from '../stepper-line';
import TableEmptyRows from '../table-empty-rows';
import SharedTableHead from '../table-head';
import TableNoData from '../table-no-data';
import TableToolbar from '../table-toolbar';
import { applyFilter, emptyRows, getComparator } from '../utils';
import TenderTableRow from './tender-table-row/tender-table-row';
import { useTenderTableFormat } from './use-tender-table-formate';

export default function TenderView() {
    const selectedStep = useSelector((state) => state.tabSteps.tenderStepState);
    const dispatch = useDispatch();

    const router = useRouter();
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState(1);
    const [activeStep, setActiveStep] = useState(selectedStep);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('name');
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [tenderData, setTenderData] = useState([]);
    const [totalDataCount, setTotalDataCount] = useState(0);
    const steps = useMemo(() => ['Live', 'Pending Approval', 'Rejected', 'Closed', 'Completed', 'All',], []);
    const querySteps = useMemo(() => ['Active', 'Added', 'Rejected', 'Close', 'Completed', ''], []);
    const totalPages = Math.ceil(totalDataCount / rowsPerPage);
    const { generateLocation, formatPrice, getPropertyValue, tenderHeaderRow } = useTenderTableFormat();
    const [loading, setLoading] = useState(true);
    const selectedMill = useSelector((state) => state.mill.selectedMill);
    const searchTerm = useSelector((state) => state.search.searchTerm);
    const [transformValue, setTransformValue] = useState('scale(0.75)');
    const [isMouseOver, setIsMouseOver] = useState(true);
    const currentState = useSelector((state) => state.stateRefreash.currentState);
    const selectedUser = useSelector((state) => state.user.selectedUser);





    const handleStepSize = (isOver) => {
        setIsMouseOver(isOver);
        setTransformValue(!isMouseOver ? 'scale(0.85)' : 'scale(0.75)');
    };

    const handleOpenTender = () => {
        router.replace('/home/tender-create');
    };

    console.log('tenderData', tenderData)

    useEffect(() => { }, [searchTerm])

    useEffect(() => {
        setPage(1)
        setTenderData([])
    }, [currentState])

    useEffect(() => {
        setPage(1)
        setTenderData([])
    }, [selectedMill])

    const handleStepClick = (index) => {
        console.log(activeStep);
        setPage(1)
        setTenderData([]);
        dispatch(selectTenderStep(index));
        setActiveStep(index);
    };

    useEffect(() => {
        console.log('sdfsdfsdf')
        const fetchTenderData = async (tenderPage, status, millId) => {
            try {
                setLoading(true);

                const data = await NetworkRepository.sellerTender(tenderPage, status, millId, selectedUser.id);
                console.log('tenderMillId', data)
                setTotalDataCount(data.count);
                console.log('pagination', pagination, 'tenderPage', tenderPage)


                setTenderData(data.results);
                console.log('sdfsdfsdf', ...data.results, page)
            } catch (error) {
                console.error('Error fetching tender data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTenderData(page, querySteps[activeStep], selectedMill.id);
    }, [page, activeStep, querySteps, pagination, selectedMill, currentState, selectedUser.id]);


    console.log('tenderData', tenderData)

    const handleSort = (event, id) => {
        const isAsc = orderBy === id && order === 'asc';
        if (id !== '') {
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(id);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        if (newRowsPerPage === 25 || newRowsPerPage === 50 || newRowsPerPage === 100) {
            setRowsPerPage(newRowsPerPage);
        }
    };

    const tenderSearch =
        tenderData.filter((item) =>
            item.mill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.id.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );

    const dataFiltered = applyFilter({
        inputData: tenderSearch,
        comparator: getComparator(order, orderBy),
    });

    const notFound = !dataFiltered.length;


    const dataFormated = dataFiltered.map(row => ({
        key: row.id,
        tenderId: row.id,
        name: row.mill.name,
        location: generateLocation(row.mill.location, row.mill.state.name),
        date: format(parseISO(row.date), 'dd/MMM/yyyy'),
        price: formatPrice(row.price, row.product.product_type.unit),
        status: row.status,
        tenderType: row.tender_type,
        productType: row.product.product_type.product_type,
        grade: getPropertyValue(row.product.properties, 'Grade', 'Grade not given'),
        season: getPropertyValue(row.product.properties, 'Season', 'Season Not given'),
        total: row.qty,
        sold: row.approved_qty,
        balance: row.available_qty,
        remark:row.remark
    }));

    const handleExportCSV = () => {
        const dataToExport = [
            tenderHeaderRow.map((row) =>
                row.label
            ),
            ...dataFormated.map((row) => [
                row.tenderId,
                row.name,
                row.location.replace(/,/g, '-'),
                row.date,
                row.price.replace(/,/g, ''),
                row.status,
                row.tenderType,
                row.productType,
                row.grade,
                row.season,
                row.total,
                row.sold,
                row.balance,
            ]),
        ];



        const csvContent =
            `data:text/csv;charset=utf-8,${dataToExport.map((row) => row.join(',')).join('\n')}`;

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'tender_data.csv');
        document.body.appendChild(link);
        link.click();
    };

    const [isFullScreen, setIsFullScreen] = useState(true);


    const fullScreen = () => {
        dispatch(setFullScreen(!isFullScreen));
        setIsFullScreen(!isFullScreen)
    }

    return (
        <>


            {isFullScreen && (
                <>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Typography variant="h4">Tenders</Typography>
                        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenTender}>
                            Add tenders
                        </Button>
                    </Stack>

                </>

            )}




            <Box sx={{ width: 1, transform: transformValue, transition: 'transform 0.3s ease', }}
                onMouseEnter={() => handleStepSize(true)}
                onMouseLeave={() => handleStepSize(false)}>
                <Stepper activeStep={activeStep} connector={<QontoConnector />} alternativeLabel style={{ marginTop: '2.5%', marginBottom: '1.5%' }}
                >
                    {steps.map((label, index) => (
                        <Step key={`${label}${index}`}>
                            <StepLabel
                                style={{ cursor: 'pointer' }}

                                onClick={() => handleStepClick(index)}>
                                <Box sx={{ width: 1, transform: 'scale(0.85)' }}>
                                    {label}
                                </Box>
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>
            {!loading ? (
                <Card>


                    <TableToolbar
                        numSelected={0}
                        onDownload={handleExportCSV}
                        label='Search tenders..'
                        onFullScreen={() => fullScreen()}
                    />
                    <Scrollbar>

                        <TableContainer sx={{ height:  '70vh', overflow: 'auto' }}>
                            <Table stickyHeader sx={{ minWidth: 800 }}>

                                <SharedTableHead
                                    order={order}
                                    orderBy={orderBy}
                                    rowCount={dataFiltered.length}
                                    numSelected={selected.length}
                                    onRequestSort={handleSort}
                                    headLabel={tenderHeaderRow}
                                />

                                <TableBody>
                                    {dataFormated
                                        .map((row) => (
                                            <TenderTableRow
                                                key={row.id}
                                                tenderId={row.tenderId}
                                                name={row.name}
                                                location={row.location}
                                                date={row.date}
                                                price={row.price}
                                                status={row.status}
                                                tenderType={row.tenderType}
                                                productType={row.productType}
                                                grade={row.grade}
                                                season={row.season}
                                                total={row.total}
                                                sold={row.sold}
                                                balance={row.balance}
                                                remark={row.remark}
                                            />
                                        ))}
                                    <TableEmptyRows
                                        height={77}
                                        emptyRows={emptyRows(page - 1, rowsPerPage / 15, dataFiltered.length)}
                                    />
                                    {notFound && <TableNoData query={searchTerm} />}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Scrollbar>
                    <TablePagination
                        page={page}
                        component="div"
                        count={dataFiltered.length}
                        rowsPerPage={rowsPerPage}
                        onPageChange={handleChangePage}
                        nextIconButtonProps={{ disabled: page >= totalPages }}
                        backIconButtonProps={{ disabled: !(page > 1) }}
                        rowsPerPageOptions={[15, 30, 45]}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Card>) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                    <SkeletonLoader />
                </Box>
            )}
        </>
    );
}
