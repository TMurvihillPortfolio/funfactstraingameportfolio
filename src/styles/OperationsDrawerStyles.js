import { _DRAWER_WIDTH as drawerWidth } from '../assets/constants';
export default theme => ({
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: '#a74227'
      },
      appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      menuButton: {
        marginRight: theme.spacing(2),
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
        padding: '20px',
        fontFamily: 'Algerian, sans-serif',
        fontSize: '24px',
        textAlign: 'center'
    },
    drawerPaper: {
        background: "#fbF6d2"
        //background: "#e8d8d3"
    },
    buttons: {
        display: 'flex',
        flexDirection: 'column'
    },
    button: {
        color: '#f3f2fa',
        margin: '15px',backgroundColor: '#857cad',
        '&:hover': {
            backgroundColor: '#5f5592'
        }
    },
    listSubheader: {
        fontFamily: 'Algerian, sans-serif'
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    locoIcon: {
        height: '25px',
        opacity: '0.7'
    },
    tracksIcon: {
        height: '30px',
        opacity: '0.7',
        transform: 'translateX(-14px)'
    },
    mapIcon: {
        height: '30px',
        opacity: '0.7'
    },
    labelIcon: {
      opacity: '0.4',
      fontSize: '14px',
      marginLeft: '30px'
    },
    closeDrawerIcon: {
        textAlign: 'left'
    },
    contractDialogMain: {
        textAlign: 'center'
    },
    contractDialogPrompt: {
        fontSize: '24px'
    }
});