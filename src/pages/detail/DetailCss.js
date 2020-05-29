import { DrawerWidth } from "../../libs/const";

const DetailCss = (theme) => ({
    item: {
        [theme.breakpoints.up('md')]: {
            height: `calc(100vh - 100px)`,
        },
    },
    itemImg: {
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column'
        },
        margin: 'auto', 
    },
    itemDescrp: {
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            flexDirection: 'column',
        },
    },
    img: {
        width: '100%',
        maxHeight: '90%', 
        objectFit: 'contain',
        [theme.breakpoints.down('md')]: {
            paddingTop: `${theme.spacing(1)}px`,
        },
    },
    root: {
        backgroundColor: 'white',
        [theme.breakpoints.down('sm')]: {
            paddingBottom: 50,
        }
    },
    title: {
        fontWeight: 600,
        fontSize: '1.5rem'
    },
    nextItems: {
        marginTop: theme.spacing(3),
        fontWeight: 600,
        fontSize: '1.2rem',
    },
    nextSwipeableRoot: {
        display: 'flex',
        marginTop: theme.spacing(1),
        "& img": {
            width: '60%',
            height: 250,
            objectFit: 'contain',
            margin: 'auto',
            "&:hover": {
                cursor: "pointer"
            }
        }
    },
    nextRoot: {
        display: 'flex', 
        justifyContent: 'space-between',
        marginTop: theme.spacing(1), 
    },
    naviagteBtn: {
        minWidth: 40, 
        width: 40,
    },
    flexRoot: {
        display: 'flex',
        width: '100%',
    },
    category: {
        fontSize: '0.9rem'
    },
    categoryDash: {
        color: theme.palette.secondary.main
    },
    price: {
        color: theme.palette.primary.main,
        fontWeight: 'bold'
    },
    btnNoDrawer: {
        position: 'fixed',
        left: 0,
        bottom: 0,
        display: 'flex',
        width: '100%'
    },
    btnFav: {
        flex: 1,
        borderRadius: 0, 
        height: 40, 
    },
    btnDrawerFixed: {
        position: 'fixed',
        left: DrawerWidth,
        bottom: 0,
        width: `calc(100% - ${DrawerWidth}px)`,
        display: 'flex',
    },
    btnDrawerNotFixed: {
        marginTop: 'auto',
        width: '100%',
        display: 'flex'
    },
    skelVMargins: {
        margin: `${theme.spacing(0.5)}px 0px`
    },
});

export default DetailCss;