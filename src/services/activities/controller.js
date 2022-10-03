const { getActivity, formActivityPayload, filterActivityByuserPreferences } = require('./helper')

const get = async (db, userId) => {
    // Note: My assumption of AC `should now only return activities 
    // that fit the user’s requirements` was that its like a onClick returner
    // based on condition, return the activity, or err messaging/handling.
    // if it was a case where we want to always return some type of activity,
    // we should use recursion upon the try clause such that we spam 3rd party api
    // ( we really shouldn't ) until we fetch the correct data, or better yet, we should  
    //store  list of activities to fetch from there if this is utilized in higher traffic
    if(userId){
        try {
            const users = await db.getCollection()
            // Note: Because I have choose poor 3rd party fake DB where it cannot initiate empty array 
            // of database, i've opted to seed the db with initial user to get fake DB going on memory,
            // and use this logic as a checker to see if user is added or not
            if(users.length <= 1){
                return { 'message': 'You have not added any user yet'}      
            }
            //based on an assumption the last added user to our db is the latest user
            const {accessibility, price} = users[users.length - 1]
            const resp = await getActivity()
            const result = await filterActivityByuserPreferences(accessibility, price, resp.data)
            if(result){
                return formActivityPayload(resp.data)
            } else {
                return { 'message': 'Your random activity suggestion does not match your preferences!'}        
            }
        } catch (error) {
            throw new Error('Error while getting custom activity for a specific user', error);
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


