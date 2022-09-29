const { getActivity, formActivityPayload, recursiveActivityCaller } = require('./helper')

const get = async (db, userId) => {
    
    if(userId){
        try {
            const users = await db.getCollection()
            const {accessibility, price} = users[0]
            const result = recursiveActivityCaller(accessibility, price)
            return formActivityPayload(result)  
        } catch (error) {
            throw new Error('Error while getting activity', error);
        }
    }

    try {
        const resp = await getActivity()
        return formActivityPayload(resp.data)
    } catch (error) {
        throw new Error('Error while getting activity', error);
    }
  }

module.exports = {
    get,
};


