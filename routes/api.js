const express = require('express');
const router = express();
const cacheService = require('../services/cacheService')
const blogService = require('../services/blogService');
const validationService = require('../services/validationService');
const cache = new cacheService();

router.get("/ping", (req,res) =>
{
    res.status(200).json({sucess : "true"});
});


router.get("/posts", async (req,res) =>
{        
    let validation = validationService.validateGetQueryParams(req.query)    
    if(validation.msg)
    {
        res.status(400).json({error: validation.msg});
        return;
    }
    let tags = req.query.tags.split(',');
    try
    {
        let resultSet = await cache.get(JSON.stringify(req.query) , async ()=>
        {
            let resultSet = await blogService.fetchPostsByTags(tags)
            resultSet = blogService.filterResults(resultSet, req.query);                    
            return resultSet
        });        
        res.status(200).json(resultSet)
    }catch(error)
    {
        console.log(error)
        res.status(400).json(error)
    }
});

module.exports = router;