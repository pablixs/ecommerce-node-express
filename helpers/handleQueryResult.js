//** Takes the success, 
//** data & error from the return of the promise of the query, 
//** handle it and resolve

function handleQueryResult(success, data, error, res) {
    if(success === undefined || !success){
        res.status(404).send('Error!!');
        return;
    } else {
        return data;
    }
}

module.exports = handleQueryResult;