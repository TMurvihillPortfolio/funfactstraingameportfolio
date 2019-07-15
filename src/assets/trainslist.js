import uuid from 'uuid';
import illinoisCentral201 from '../img/illinoisCentral201.jpg';
import jennyLind from '../img/jennylind.jpg';

export default [{
    trains: 
        [
            {
                trainId: uuid(),
                trainName: 'Illinois Central 201',
                pathName: 'illinoiscentral201',
                trainImage: illinoisCentral201,       
                trainFacts: [ 
                    'Casey Jones was one of its engineers',
                    'On display at Illinois Railway Museum',
                    'Built in 1880, retired 1928'
                ]
            },
            {
                trainId: uuid(),
                trainName: 'Jenny Lind',
                pathName: 'jennylind',
                trainImage: jennyLind,
                trainFacts: [
                    'Named after Jenny Lind, who was a famous opera singer of the period.',
                    'Due to advancements in suspension, it steamed freely and was economical on fuel.',
                    'Standard gauge locomotive buit in 1847'
                ]
            }
        ],
    contracts: 
        [
            {
                id: uuid(),
                from: 'Chicago',
                to: 'NewYork',
                payment: '20',
                units: '1',
                cargo: 'coal',
                offerDate: 'June 4, 1878', 
                accepted: 'true' //boolean for now, do date later
            },
            {
                id: uuid(),
                from: 'Atlanta',
                to: 'Columbus',
                payment: '12',
                units: '1',
                cargo: 'textiles',
                offerDate: 'June 4, 1878',
                accepted: 'false' //boolean for now, do date later
            },
            {
                id: uuid(),
                from: 'New York',
                to: 'Boston',
                payment: '3',
                units: '1',
                cargo: 'wheat',
                offerDate: 'January 26, 1878',
                accepted: 'true' //boolean for now, do date later
            },
            {
                id: uuid(),
                from: 'Boston',
                to: 'Washington',
                payment: '5',
                units: '1',
                cargo: 'rice',
                offerDate: 'April 17, 1878',
                accepted: 'false'
            }

        ]        
    
}]


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