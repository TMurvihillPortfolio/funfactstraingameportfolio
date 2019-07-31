import { _MEDIA_QUERIES, _DRAWER_WIDTH as drawerWidth} from '../assets/constants';
import backgroundMap from '../img/usmap1930NewYorkChicagowNames.jpg';
export default theme => ({
    root: {
        height: '900px',
        backgroundImage: `url(${backgroundMap})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        marginTop: '25px',
        position: 'relative'      
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: '#a74227'
      },
      appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,        
        marginLeft: drawerWidth-100,
        [_MEDIA_QUERIES.down('xs')]: {
          width: '100%',
          marginLeft: 0,
        },
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      menuButton: {
        marginRight: '35px',
      },
      hide: {
        display: 'none',
      },
    drawer: {
        width: `${drawerWidth}px`,
        overflow: 'hidden',
        padding: '20px'
    },
    drawerHeader: {
        textAlign: 'left'  
    },
    drawerPaper: {
        background: "#fbF6d2"
    },
    buttons: {
        display: 'flex',
        flexDirection: 'column'
    },
    button: {
        color: '#f3f2fa',
        margin: '20px',
        backgroundColor: '#857cad',
        '&:hover': {
            backgroundColor: '#5f5592'
        }
    },
    drawHeader: {
        padding: '20px'
    },
    TrainOperationsHeaderOpen: {
        color: '#a74227',
        backgroundColor: '#c79382',
        fontFamily: 'algerian, sans-serif',
        fontSize: '36px',
        
        width: 'fit-content',
        padding: '7px 10px',
        marginLeft: drawerWidth + 225,
        marginTop: '40px',
        [_MEDIA_QUERIES.down('md')]: {
          marginTop: '25px',
          fontSize: '24px',
          //width: `calc(50% - ${drawerWidth}px)`,
        },
        [_MEDIA_QUERIES.down('sm')]: {
          marginTop: '-10px',
          fontSize: '14px',
          //width: `calc(50% - ${drawerWidth}px)`,
        },
        borderRadius: '7px',
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    labelIcon: {
      opacity: '0.4',
      fontSize: '14px',
      marginLeft: '30px'
    }
});