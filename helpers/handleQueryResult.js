function handleQueryResult(success, data, error) {
    if(success){
        console.log(success)
        return data;
    } else {
        return error;
    }
}

module.exports = handleQueryResult;