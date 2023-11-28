const auth = `Basic ${btoa('gfg:gfgtech123')}`;

const testip = '192.46.215.236';

const prod = '139.162.12.150';

const local= '192.168.1.14:8000';

const ip = localStorage.getItem('isTestEnvironment') === 'true'
    ? testip
    : prod;

const ApiAppConstants = {
    apiEndPoint: `http://${testip}/api/`,
    signup: 'app_user/',
    otp: 'sendLoginOTP/',
    resendOTP: 'resendLogiOTP/',
    verifyOTP: 'verifyLoginOTP/',
    checkSeller: 'checkSeller',
    sellerConfig: 'sellerConfig',
    sellerTender: 'sellerTender_v2',
    sellerTraders: 'sellerTraders',
    tenderPostView: 'tenderPostView/',
    tender: 'tender/',
    order: 'order',
    orderListView: 'orderListView_v2',
    orderSeller: 'orderSeller/',
    updateOrderDetails: 'update-order-details/',
    tenderUpdateStatus: 'tenderUpdateStatus/',
    orderUpdateStatus: 'orderUpdateStatus/',
    removeFlexibleProducts: 'removeFlexibleProducts/',
    flexibleOrders: 'flexibleOrders/',
    payments: 'payments_v2',
    paymentHeadUpdateStatus: 'paymentHeadUpdateStatus/',
    traderPostView: 'traderPostView/',
    loadingInstructions: 'loadingInstructions/',
    buyCoal: 'buyCoal/',
    loadingInstructionUpdate: 'loadingInstructionUpdate/',
    loadingInstructionDetails: 'loading-instruction-details/',
    deliveryOrders: 'deliveryOrders',
    deliveryOrderViewSet: 'deliveryOrderViewSet/',
    mailDoc: 'mail_doc/do/',
    mailInvoice: 'mail_doc/invoice/',
    getInvoice: 'get_doc/invoice/',
    deliveryOrderUpdateStatus: 'deliveryOrderUpdateStatus/',
    invoices: 'invoices',
    invoiceDetails: 'invoice-details',
    generateInternalDO: 'generateInternalDO/',
    vehicles: 'vehicles/?seller_pk=', // For vehicle check
    sendOtp: 'sendOtp/', // For driver otp
    postDriver: 'postDriver/', // Post driver information and DL photo
    vehicle: 'vehicle/', // For check vehicle is already exist or not
    qualityCheckPost: 'qualityCheckPost/', // For check vehicle is already exist or not
    evQualityCheck: 'Ev_QualityCheck/',
    evehicleDoc: 'evehicledoc/',
    checkDOStatus: 'check_DO_status/',
    generateInvoice: 'generate_invoice/',
    sellerInwardLedgers: 'sellerInwardLedgers/', // for last five inwards
    inwardLedger: 'inwardLedger/',
    vehiclesListView: 'vehiclesListView/',
    inwardVehicleQC: 'inward-vehicle-qc/',
    inwardVehicles: 'list/inward-vehicles/',
    inwardDispatch: 'inwardDispatch/',
    internalDispatches: 'internalDispatches',
    receivable: 'receivable',
    storeHouse: 'storeHouse',
    avgPrice: 'avg_price_sugar',
    fcmPost: 'fcmPost/',
    reports: 'reports',
    scanDOdest: 'scan_DO_dest/',
    doUnload: 'deliveryOrderUpdateStatus/',
    gatePass: 'gatepass/',
    getDoDoc:'get_doc/do/',
    getInvoiceDoc:'/get_doc/invoice/'
};

export { ApiAppConstants, auth, ip, testip };
