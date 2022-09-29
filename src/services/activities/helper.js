const axios = require('axios');
const { ACTIVITY_API } = require('../../../config')

const getActivity = async () => {
    return axios.get(ACTIVITY_API);
}

const mapAccessibility = accessibility => {
    // Note: We can use switch case here, but my Golang bias coming in hot ;)
    if(accessibility <= 0.25){
        return 'High'
    } else if (accessibility > 0.25 && accessibility <= 0.75){
        return 'Medium'
    } else {
        return 'Low'
    }
};

const mapPrice = price => {
    if( price < 0){
        return 'Price value is minus'
    } else if (price === 0){
        return 'Free'
    } else if (price > 0 && price <= 0.5){
        return 'Low'
    } else {
        return 'High'
    }
};

const recursiveActivityCaller = async (accessibility, price) => {
    const resp = await getActivity()
    const mappedAccessibility = mapAccessibility(resp.data.accessibility)
    const mappedPrice = mapPrice(resp.data.price)
    if(accessibility !== mappedAccessibility  || price !== mappedPrice) {
        recursiveActivityCaller();
    }
    else {
        return activity
    }
}

const formActivityPayload = (data) => {
    const { price: rawPrice, accessibility: rawAcc, ...rest } = data;
    const price = mapPrice(rawPrice)
    const accessibility = mapAccessibility(rawAcc)
    return {
        ...rest,
        price,
        accessibility
    }
}

  
module.exports = { formActivityPayload, getActivity, mapAccessibility, mapPrice, recursiveActivityCaller };
