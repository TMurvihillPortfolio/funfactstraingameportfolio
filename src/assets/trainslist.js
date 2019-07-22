//***** command to seed local storage */

// localStorage.setItem('companyData', JSON.stringify({
//     trains: 
//         [ 
//             {
//                 id: '0001-illcent201'
//             },
//             {
//                 id: '0002-jennylind'
//             }
//         ],
//     contracts: 
//         [
//             {
//                 id: 'f859306a-cce8-47b9-9a65-f9363396116d',
//                 pathName: 'coal1_chicago_newyork16',
//                 from: 'Chicago',
//                 to: 'NewYork',
//                 payment: '16',
//                 units: '1',
//                 cargo: 'coal',
//                 status: 'offered'
//             }]}))

export default {
    trains: 
        [ 
            {
                id: '0001-illcent201'
            },
            {
                id: '0002-jennylind'
            }
        ],
    contracts: 
        [
            {
                id: 'f859306a-cce8-47b9-9a65-f9363396116d',
                pathName: 'coal1_chicago_newyork16',
                from: 'Chicago',
                to: 'NewYork',
                payment: '16',
                units: '1',
                cargo: 'coal',
                status: 'offered' //offered, accepted, started               
            },
            {
                id: 'f85739206a-cce8-47b9-9a65-f9363396116d',
                pathName: 'textiles1_atlanta_columbus20',
                from: 'Atlanta',
                to: 'Columbus',
                payment: '12',
                units: '1',
                cargo: 'textiles',
                status: 'offered' //offered, accepted, started               
            },
            {
                id: '2b64c7ad-d69b-428e-a405-17c351a08f9b',
                pathName: 'wheat1_newyork_boston3',
                from: 'NewYork',
                to: 'Boston',
                payment: '3',
                units: '1',
                cargo: 'wheat',
                status: 'started' //offered, accepted, started               
            },
            {
                id: 'f859306a-cce8-47b9-9a65-f93asfd96116d',
                pathName: 'milk1_boston_washington5',
                from: 'Boston',
                to: 'Washington',
                payment: '5',
                units: '1',
                cargo: 'milk',
                status: 'accepted' //offered, accepted, started               
            }
        ],
        activeTrains: [
            {
                id: 1,
                contractId: 'f859306a-cce8-47b9-9a65-f93asfd96116d',
                top: 15,
                right: 0,
                lengthOfTrip: 460
            },
            {
                id: 2,
                contractId: '',
                top: 10,
                right: 0,
                lengthOfTrip: 500
            },
            {
                id: 3,
                contractId: '',
                top: 10,
                right: 0,
                lengthOfTrip: 400
            },
            {
                id: 4,
                contractId: '',
                top: 10,
                right: 0,
                lengthOfTrip: 180
            },
        ]  
}
// export default [
//     {assets: [{
//         trains: [    
//             {
//                 trainId: uuid(),
//                 trainName: 'Illinois 201',
//                 trainImage: image1,       
//                 trainFacts: [ 
//                     'Casey Jones was one of its engineers',
//                     'On display at Illinois Railway Museum',
//                     'Built in 1880, retired 1928'
//                 ]
//             },
//             {
//                 trainId: uuid(),
//                 trainName: 'Jenny Lind',
//                 trainImage: jennyLind,
//                 trainFacts: [
//                     'Named after Jenny Lind, who was a famous opera singer of the period.',
//                     'Due to advancements in suspension, it steamed freely and was economical on fuel.',
//                     'Standard gauge locomotive buit in 1847'
//                 ]
//             }

//         ],
//         contracts: [
//             {
//                 from: 'Chicago',
//                 to: 'NewYork',
//                 payment: '20',
//                 units: '1',
//                 cargo: 'coal',
//                 offerDate: 'June 4, 1878', 
//                 accepted: 'true' //boolean for now, do date later
//             },
//             {
//                 from: 'Atlanta',
//                 to: 'Columbus',
//                 payment: '12',
//                 units: '1',
//                 cargo: 'textiles',
//                 offerDate: 'June 4, 1878',
//                 accepted: 'false' //boolean for now, do date later
//             },
//             {
//                 from: 'New York',
//                 to: 'Boston',
//                 payment: '3',
//                 units: '1',
//                 cargo: 'wheat',
//                 offerDate: 'January 26, 1878',
//                 accepted: 'true' //boolean for now, do date later
//             },
//             {
//                 from: 'Boston',
//                 to: 'Washington',
//                 payment: '5',
//                 units: '1',
//                 cargo: 'rice',
//                 offerDate: 'April 17, 1878',
//                 accepted: 'false'
//             }
//         ],
//         companyInfo: [
//             {
//                 companyName: '',
//                 companyId: '',
//                 userId: '',
//                 money: '',
//                 inceptionDate: ''
//             }
//         ],
//         cargoTypes: [
//             'coal',
//             'wheat',
//             'ice',
//             'textiles',
//             'milk'
//         ]
//     }
//     }
// ]