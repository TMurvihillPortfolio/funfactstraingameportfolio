import { _MEDIA_QUERIES } from '../assets/constants';
export default {
    TrainInfoCardCSS: {
        backgroundColor: 'lightsalmon',
        padding: '50px'
    },
    trainNameCSS: {
        marginTop: '100px',
        marginBottom: '40px',
        borderRadius: '7px'
    },
    trainImageCSS: {
        marginTop: '40px',
        marginBottom: '40px',
        borderRadius: '7px',
        boxShadow: '10px 10px 15px 4px #333',
        [_MEDIA_QUERIES.down('xs')]: {
            width: '200px'
        }
    },
    factList: {
        listStyle: 'none',
        padding: '20px'
    },
    factItem: {       
    },
    button: {
        color: '#f3f2fa',
        margin: 'auto',
        marginBottom: '30px',
        backgroundColor: '#857cad',
        '&:hover': {
            backgroundColor: '#5f5592'
        }
    },
}