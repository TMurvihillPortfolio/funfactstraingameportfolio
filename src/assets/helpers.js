import uuid from 'uuid';
import { _CARGO_TYPES, _TRIP_LENGTHS } from '../assets/constants'

function syncLocalCompanyStorage(companyData) {
    localStorage.setItem(
        'companyData', 
        JSON.stringify(companyData))
    ;
}
function syncLocalActiveTrainStorage(activeTrains) {
    localStorage.setItem(
        'funFactsActiveTrains', 
        JSON.stringify(activeTrains))
    ;
}
function getPathName(companyData, cargo, units, to, from) {
    let pathName =  `_${cargo}${units}_${to}_${from}`;
    //check for duplicates
    companyData[0].contracts.map(contract => {
        if (contract.pathName === pathName) {
            pathName = `pathName${uuid()}`;
        }
    });
    return pathName;
}
function getRandomCity() {
    const cityArr = Object.keys(_TRIP_LENGTHS);
    cityArr.push(Object.keys(_TRIP_LENGTHS['NewYork'])[0]);
    return cityArr[Math.floor(Math.random()*cityArr.length)]
}
function getContractOffer(companyData) {
    
    //if enough contracts, return
    if (companyData[0].contracts.length >= 6) {
        return;
    }

    //prepare new contract object variables
    const cargo = _CARGO_TYPES[Math.floor(Math.random()*_CARGO_TYPES.length)].name;
    const units = 1; //NOT YET IMPLEMENTED random units
    const from = getRandomCity();
    let to = getRandomCity();

    //make sure from and to cities are different
    while (from===to) {
        to = getRandomCity();
    }
    const pathName = getPathName(companyData, cargo, units, to, from);

    //create new contract object
    const newContract = {
        id: uuid(),       
        pathName: pathName,             
        from: from,
        to: to,
        cargo: cargo,
        units: units,
        status: 'offered'
    }
    //update data
    companyData[0].contracts.push(newContract);
    return companyData;
}
function getLengthOfTrip(from, to) {
    //Get trip distance between cities, data found in constants.js (_TRIP_LENGTHS)
    function getDistance(city1, city2) {
        for(let key in _TRIP_LENGTHS) {
            if(key === city1) {
                let cityList = _TRIP_LENGTHS[key];
                for(let city in cityList) {
                    if(city === city2) {
                        return cityList[city];
                    }
                }
            }
        }
        //if distance not found, switch city order and find again       
        city1 = to;
        city2 = from;
        const distance = getDistance(city1, city2)
        return distance !== undefined ? distance : 'Distance not found';
    }
    //Initialize variables
    let distance;
    let city1 = from;
    let city2 = to;
    
    //find for distance
    distance = getDistance(city1, city2); 
    
    //Error handling NOT YET IMPLEMENTED
    if (distance===undefined) {           
        return 'Distance between cities not found';
    }

    //return result
    return distance;        
}
export { 
    getRandomCity, 
    getContractOffer, 
    syncLocalCompanyStorage, 
    syncLocalActiveTrainStorage,
    getLengthOfTrip
 };