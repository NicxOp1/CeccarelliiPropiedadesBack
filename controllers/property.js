const Property = require('../models/Property')

const controller = {
    read: async (req,res)=>{
        let query = {}
        let min = {}
if (req.query.typeValue) {
    query = {
        ...query,
        typeValue: req.query.typeValue
    }
}
if (req.query.min) {
    min = {
        value: req.query.min
    }
}
if (req.query.typeProperty) {
    query = {
        ...query,
        typeProperty: req.query.typeProperty
    }
}

if (req.query.rooms) {
    query= {
        ...query,
        rooms: req.query.rooms
    }
}

        try {
            let properties = await Property.find(query)
            if(properties){
                res.status(200).json({
                    properties,
                    success:true,
                    messagge: `${properties.length} properties founded`
                })
            }
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message
            })
        }
    }
}



module.exports= controller