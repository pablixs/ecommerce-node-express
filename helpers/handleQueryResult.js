//** Takes the success, 
//** data & error from the return of the promise of the query, 
//** handle it and resolve

function handleQueryResult(success, data, error) {
    if(success){
        console.log(success)
        return data;
    } else {
        return error;
    }
}

module.exports = handleQueryResult;