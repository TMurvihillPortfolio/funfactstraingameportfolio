import { _MEDIA_QUERIES } from '../assets/constants';
export default {
    NavBar: {
        backgroundColor: '#a74227',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: '-15px'
    },
    logo: {
        '& img': {
            width: '50px',
        }       
    }, 
    links: {
        display: 'flex',
        [_MEDIA_QUERIES.down('md')]: {
            display: 'none'
        },
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        "& a": {
            textDecoration: 'none',
            fontSize: '17px',
            padding: '5px 12px',
            color: '#f7f6f5',
            borderBottom: '1px solid transparent',
            transition: 'all 1s ease-in-out'           
        },
        '& a:hover': {
            textDecoration: 'underline'
        }      
    },
    selectContainer: {
        listStyle: 'none',
        fontSize: '17px',
        transform: 'translateY(-15px)',
        cursor: 'pointer',
        position: 'relative',
        marginRight: '25px',
        marginLeft: '-25px',
        color: 'whitesmoke',
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    selectItemsShow: {
        display: 'none',
        flexDirection: 'column',
        position: 'absolute',
        right: '0',
        backgroundColor: '#c79382',
        width: '140px',
        borderRadius: '4px',
        padding: '5px 7px'       
    },
    selectItems: { 
        fontSize: '14px',
        border: 'none',
        '&:hover': {
            border: 'none'
        }
    },
    showMobileMenu: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        position: 'absolute',
        width: '166px',
        right: '0',
        textAlign: 'right',      
        top: '0',
        backgroundColor: 'lightgrey'
    },
    mobileMenu: {
        display: 'none',
        [_MEDIA_QUERIES.down('md')]: {
            display: 'flex'
        },
        marginLeft: '500px',
        position: 'absolute',
        right: '0'
    }
}
