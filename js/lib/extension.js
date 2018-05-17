if (window.require) {
    window.require.config({
        map: {
            "*" : {
                'ivvv': 'nbextensions/ivvv/index',
                "jupyter-js-widgets": "nbextensions/jupyter-js-widgets/extension"
            }
        }
    });
}

// Export the required load_ipython_extention
module.exports = {
    load_ipython_extension: function() {}
};
