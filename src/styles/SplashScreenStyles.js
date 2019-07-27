export default {
    root: {
        position: 'relative',
        backgroundColor: 'transparent',
        height: '100vh',
        width: '100vh'
    },
    splashScreen: {
        border: '7px double #a74227',
        width: '0',
        height: '0',
        opacity: '0',
        backgroundColor: 'transparent',   
        transition: 'all 1s ease-in-out',
        position: 'absolute',
        top: '50%',
        right: '50%',
        transform: 'translate(50%, -50%)',
        zIndex: '10000'
    },
    splashScreenImg: {
        width: '100%',
        height: '100%'    
    },
    splashScreenShow: {
        opacity: '1',
        width: '700px',
        height: '700px' 
    }
}