const express = require('express');
const router = express();
const blogService = require('../services/blogService');
const validationService = require('../services/validationService');


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
        let resultSet = await blogService.fetchPostsByTags(tags)
        resultSet = blogService.filterResults(resultSet, req.query);        
        res.status(200).json(resultSet)
    }catch(error)
    {
        console.log(error)
        res.status(400).json(error)
    }
});





module.exports = router;