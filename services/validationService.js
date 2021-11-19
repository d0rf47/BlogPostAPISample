
/**
 * Used to validate url query params before requesting data 
 * from an external API
 * @param {tags, sortyBy, direction} queryParams 
 * @returns bool || error msg
 */
exports.validateGetQueryParams = (queryParams) =>
{        
    if(queryParams && Object.keys(queryParams).length === 0 && Object.getPrototypeOf(queryParams) === Object.prototype)
        return({msg: "Tags parameter is required"});

    if(!queryParams.tags)
        return({msg: "Tags parameter is required"});
    
    if(queryParams.sortBy && queryParams.sortBy !== 'id' && queryParams.sortBy !== 'reads' && queryParams.sortBy !== 'likes'
        && queryParams.sortBy !== 'popularity')
    {
        return({msg: "sortBy parameter is invalid"});
    }

    if(queryParams.direction  && queryParams.direction !== 'asc' && queryParams.direction !== 'desc')
        return({msg: "direction parameter is invalid"});

    return true;
}