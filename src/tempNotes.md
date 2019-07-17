## get trains moving in status window

- change data to have a contract state which is either offered, accepted, or started
- add start Contract button which adds an active train to local storage
- create local storage object with a couple of active trains
- make Get Active trains get trains from local storage
- make update positions update positions in local storage (do we need state, don't think so, just draw from local in didmount and update in unmount)