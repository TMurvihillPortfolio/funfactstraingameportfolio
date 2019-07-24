import uuid from 'uuid';
import { _TRAIN_DETAILS, _CARGO_TYPES, _TRIP_LENGTHS } from '../assets/constants'

function getRandomCity() {
    const cityArr = Object.keys(_TRIP_LENGTHS);
    cityArr.push(Object.keys(_TRIP_LENGTHS['NewYork'])[0]);
    return cityArr[Math.floor(Math.random()*cityArr.length)]
}
function getContractOffer() {
    //refresh data
    let companyData = JSON.parse(localStorage.getItem('companyData'));
    
    //if enough contracts, return
    if (companyData.contracts.length >= 6) {
        return;
    }

    //prepare new contract object
    const newCargo = _CARGO_TYPES[Math.floor(Math.random()*_CARGO_TYPES.length)].name;
    const from = getRandomCity();
    let to = getRandomCity();
    //make sure from and to cities are different
    while (from===to) {
        to = this.getRandomCity();
    }
    //create new contract object
    const newContract = {
        id: uuid(),
        pathName: uuid(),              
        from: from,
        to: to,
        cargo: newCargo,
        units: 1,
        status: 'offered'
    }
    //update data
    companyData.contracts.push(newContract);
    this.syncLocalStorage();
}
export { getRandomCity, getContractOffer };