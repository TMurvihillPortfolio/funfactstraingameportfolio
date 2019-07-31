import { _MEDIA_QUERIES } from '../assets/constants';
export default {
    root: {
        width: '100%'
    },
    NavBar: {
        backgroundColor: '#a74227',
        display: 'flex',
        [_MEDIA_QUERIES.down('md')]: {
            display: 'none'
        },
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
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        listStyle: 'none',
        "& a": {
            textDecoration: 'none',
            fontSize: '14px',
            padding: '5px 12px 10px 0',
            color: '#f7f6f5',
            borderBottom: '1px solid transparent',
            transition: 'border 1s ease-in-out'           
        },
        '& a:hover': {
            borderBottom: '1px solid whitesmoke',
            [_MEDIA_QUERIES.down('md')]: {
                borderBottom: 'none'
            }
        }      
    },
    selectContainer: {
        listStyle: 'none',
        fontSize: '14px',
        cursor: 'pointer',
        position: 'relative',
        color: 'whitesmoke',
        marginLeft: '3px',
        padding: '2px 0 10px',
        borderBottom: '1px solid transparent',
        transition: 'border 1s ease-in-out',
        testAlign: 'center',
        '&:hover': {
            borderBottom: '1px solid whitesmoke',
            [_MEDIA_QUERIES.down('md')]: {
                borderBottom: 'none'
            }
        }
    },
    selectItemsShow: {
        display: 'none',
        flexDirection: 'column',
        position: 'absolute',
        right: '0',
        top: '30px',
        backgroundColor: 'teal',
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
        width: 'fit-content',
        right: '0',
        textAlign: 'right',      
        top: '0',
        backgroundColor: 'rgb(0,128,128,0.5)'
    },
    mobileMenu: {
        display: 'none',
        [_MEDIA_QUERIES.down('md')]: {
            display: 'flex',
            backgroundColor: '#a74227'
        },
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
}
