import { _MEDIA_QUERIES, _DRAWER_WIDTH as drawerWidth} from '../assets/constants';
import backgroundEngine from '../img/steamEngineEdit.gif';
export default theme => ({
    root: {
        height: '900px',
        backgroundImage: `linear-gradient(rgba(205,149,117,.5), rgba(205,149,117,.5)), url(${backgroundEngine})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        [_MEDIA_QUERIES.down('sm')]: {
          width: '100%'
        },
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
        backgroundColor: 'teal',
        borderRadius: '7px',
        padding: '5px 7px',
        fontSize: '36px',
        '&:hover': {
            backgroundColor: '#265b5f'
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
    },   
    goal: {
        display: "block",
        fontSize: "24px",
        width: "fit-content",
        position: "absolute",
        top: "30%",
        left: "65%",
        [_MEDIA_QUERIES.down('sm')]: {
          left: '50%',
          top: '25%'
        },
        transform: "translate(-50%,-50%)",
        color: 'whitesmoke',
        backgroundColor: 'transparent',
        padding: '10px 15px',
        backgroundImage: `linear-gradient(rgba(0,0,0,.1), rgba(0,0,0,.1))`,
        borderRadius: "7px"
    },   
    waiting: {
        display: "block",
        fontSize: "14px",
        width: "235px",
        position: "absolute",
        top: "40px",
        [_MEDIA_QUERIES.down('sm')]: {
          right: '50%',
          transform: "translate(50%, 50%)"
        },
        right: "0",
        color: 'whitesmoke',
        backgroundColor: 'transparent',
        padding: '10px 15px',
        backgroundImage: "linear-gradient(rgba(0,0,0,.1), rgba(0,0,0,.1))",
        borderRadius: "7px"
    },
    reset: {
      position: 'absolute',
      top: '35%',
      right: '50%',
      transform: 'translate(50%,50%)',
      [_MEDIA_QUERIES.down('md')]: {
        top: '25%',
        zIndex: 500
      },
    }   
});