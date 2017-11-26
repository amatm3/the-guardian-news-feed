const AppConstants = {
    screens: {
        HOME: 'home',
        ARTICLE: 'article'
    },
    NetworkErrors : {
        NO_NETWORK: 'no_network',
        INVALID_REQUEST_PARAMS: 'invalid_request_parameters',
        INVALID_RESPONSE_DATA: 'invalid_response_data',
        RESPONSE_PARSING_ERROR: 'response_parsing_error'
    },
    network_request_methods: {
        GET: 'GET',
        POST: 'POST',
        PUT: 'PUT',
        DELETE: 'DELETE'
    },
    network_types: {
        NONE: 'none',
        WIFI: 'wifi',
        MOBILE: 'mobile',
        UNKNOWN: 'unknown'
    },
    API_BASE_URL: 'https://content.guardianapis.com/search',
    API_TEST_KEY_VALUE: '94a23868-092b-4fd6-a930-8b63ae873b98',
    API_TEST_KEY: 'api-key',
    SHOW_FIELDS: 'show-fields',
    DEFAULT_PHOTO_URL: 'https://www.colourmebronze.com.au/media/catalog/product/cache/1/image/500x500/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/noImage.jpg'
}

module.exports = AppConstants;
