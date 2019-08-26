import { _MEDIA_QUERIES } from '../assets/constants';

export default {
    TrainInfoCardCSS: {
        backgroundColor: 'lightsalmon',
        padding: '50px'
    },
    trainNameCSS: {
        marginBottom: '40px',
        borderRadius: '7px',
        [_MEDIA_QUERIES.down('xs')]: {
            fontSize: '75%'
        }
    },
    trainImageCSS: {
        borderRadius: '7px',
        margin: '40px',
        boxShadow: '10px 10px 15px 4px #333',
        [_MEDIA_QUERIES.down('xs')]: {
            width: '200px'
        }
    },
    factList: {
        listStyle: 'none'
    },
    factItem: {   
        textAlign: 'center'    
    }
}