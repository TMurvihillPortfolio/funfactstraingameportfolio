import { _MEDIA_QUERIES, _DRAWER_WIDTH } from '../assets/constants';
export default {
    root: {
        height: '200px',
        width: '650px',
        position: 'fixed',
        bottom: 0,
        right: 0,
        border: '7px double #a74227',
        borderRadius: '10px',
        backgroundImage: 'linear-gradient(rgba(250,244,216,.8), rgba(250,244,216,.8))',
        [_MEDIA_QUERIES.down('md')]: {
            width: '500px'
        },
        [_MEDIA_QUERIES.down('sm')]: {
            width: `calc(100% - ${_DRAWER_WIDTH+40}px)`
        },
        [_MEDIA_QUERIES.down('xs')]: {
            width: '100%'
        }
    },
    progress: {
        display: 'flex',
        fontSize: '20px'     
    },
    progressCargo: {
        flex: '1',
    },
    progressTo: {
        flex: '1',
    },
    progressTrain: {
        flex: '4',
        border: '1px solid rgba(28,21,18,.075)',
        margin: '2px'
    },
    progressFrom: {
        flex: '1',
    },
    notification: {
        backgroundColor: 'teal',
        width: 'fit-content',
        height: '40px',
        color: 'whitesmoke',
        position: 'absolute',
        bottom: '0',
        left: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '5px 10px',
        margin: '10px',
        borderRadius: '4px',
        transform: 'translateY(60px)',
        transition: 'all 2s ease-in-out'
    }
}