const axios = require('axios');
const fetchUrl = 'https://api.hatchways.io/assessment/blog/posts?tag=';


/**
 * Fetches a collection of posts  
 * @param {Array of tags} tagArr  
 * @returns unordered filtered Array of posts based on tags
 * use filterResults() to sort
 * const ids = resultArr.map(i => i.id); creates list of every post id
 * const filteredResponse = resultArr.filter(({id}, index) => !ids.includes(id, index + 1)); 
 *  --> deconstructs obj in id only to check duplicates filter applies to index + 1 to
 *      ignore previous objects. reduces runtime
 */
exports.fetchPostsByTags = (tagArr) =>
{           
    return new Promise(function(resolve,reject)
    {        
        let promises = [];
        let resultArr = [];
        for(let t of tagArr)
        {
            promises.push(exports.fetchPostsByTagName(t));
        }
        Promise.all(promises).then((responses) =>
        {
            //combine all results
            responses.forEach((res) => {resultArr = [].concat(resultArr,res.posts);});
            //remove duplicates
            const ids = resultArr.map(i => i.id);
            const filteredResponse = resultArr.filter(({id}, index) => !ids.includes(id, index + 1)); 

            resolve(filteredResponse);
        }).catch((err) => console.log(err))               
    });    
};

/**
 * fetches posts based on a SINGLE tag
 * uses axios
 */
exports.fetchPostsByTagName = (tagName) =>
{    
    return new Promise( async function(resolve,reject){        
        axios.get(fetchUrl + tagName)
        .then((response) =>
        {
            resolve(response.data);
        })
        .catch((error) =>
        {
            console.log(error)
            reject(error)
        })
        
    })
}

/**
 * filters posts based on query params
 * default filter by id asc order
 * @param {Array of posts} postSet 
 * @param {sortBy && direction} queryParams 
 * @returns array based on array provided and filter params
 */
exports.filterResults = (postSet, queryParams) =>
{    
    if(queryParams.sortBy)
    {
        switch(queryParams.sortBy)
        {
            case "reads":
                if(queryParams.direction === 'desc')
                    return Array.from(postSet).sort((x,y) => y.reads - x.reads);
                else
                    return Array.from(postSet).sort((x,y) => x.reads - y.reads);
            case 'likes':                
                if(queryParams.direction === 'desc')
                    return Array.from(postSet).sort((x,y) => y.likes - x.likes);    
                else
                    return Array.from(postSet).sort((x,y) => x.likes - y.likes);
            case 'popularity':
                if(queryParams.direction === 'desc')
                    return Array.from(postSet).sort((x,y) => y.popularity * 100 - x.popularity * 100);
                else
                    return Array.from(postSet).sort((x,y) => x.popularity * 100 - y.popularity * 100);
            default:
                if(queryParams.direction === 'desc')
                    return Array.from(postSet).sort((x,y) => y.id - x.id);
                else
                    return Array.from(postSet).sort((x,y) => x.id - y.id);
        };

    }else if(queryParams.direction === 'desc')   
        return Array.from(postSet).sort((x,y) => y.id - x.id); 
    else
        return Array.from(postSet).sort((x,y) => x.id - y.id); 
}