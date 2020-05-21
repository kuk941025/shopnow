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
        },
    },
    itemDescrp: {
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            flexDirection: 'column',
        },
    },
    img: {
        width: '100%',

        [theme.breakpoints.down('md')]: {
            paddingTop: `${theme.spacing(2)}px`,
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
    nextItemRoot: {
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
        borderRadius: 3,
    },
    btnFav: {
        borderRadius: 3
    },
    btnDrawerFixed: {
        position: 'fixed',
        left: DrawerWidth,
        bottom: 0,
        width: `calc(100% - ${DrawerWidth}px)`,
    },
    btnDrawerNotFixed: {
        marginTop: 'auto',
        width: '100%'
    },
    skelVMargins: {
        margin: `${theme.spacing(0.5)}px 0px`
    }
});

export default DetailCss;