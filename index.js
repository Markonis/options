var _ = require('underscore');

module.exports = (function() {
  var Options = function(params, defaults, validators) {
    var self = this;
    var keys = _.keys(defaults);
    var data = null;

    if (params) {
      data = _.extend(defaults, params);
    }
    else {
      data = defaults;
    }

    // Validate that all options are passed in

    _.each(keys, function(key) {
      if (_.isUndefined(data[key]) || _.isNull(data[key])) {
        throw new Error('OptionsError: ' + 'The "' + key + '" option must be passed in.');
      }
    });

    // Get

    this.get = function(key, defaultValue) {
      if (data.hasOwnProperty(key)) {
        return data[key];
      }
      else if (defaultValue !== undefined) {
        return defaultValue;
      }
      else {
        throw new Error('OptionsError: ' + 'The "' + key + '" option does not exist.');
      }
    };

    // Custom validators

    function shouldValidate(key) {
      return validators.hasOwnProperty(key);
    }

    function canValidate(key) {
      return _.isFunction(validators[key]);
    }

    function applyValidator(key) {
      if (!validators[key](self.get(key)))
        throw new Error('OptionsError: ' + 'The "' + key + '" option is not valid.');
    }

    if (validators) {
      _.each(keys, function(key) {
        if (shouldValidate(key)) {
          if (canValidate(key)) {
            applyValidator(key);
          }
          else {
            throw new Error('OptionsError: ' + 'The "' + key + '" validator is not a function.');
          }
        }
      });
    }
  };

  return Options;
})();
