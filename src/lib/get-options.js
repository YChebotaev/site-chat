module.exports = function() {
  var optionsElement = document.querySelector("[data-sc-options]");

  if (optionsElement == null) {
    optionsElement = { dataset: {} };
  }

  var options = {
    chatId: "--test-id--",
    zIndex: 9999,
    bottom: 80,
    right: 100
  };

  var optionKeys = Object.keys(options);

  for (var i = 0; i < optionKeys.length; i++) {
    var key = optionKeys[i];
    var strValue = optionsElement.dataset[key] || options[key];
    var intValue = parseInt(strValue, 10);
    options[key] = isNaN(intValue) ? strValue : intValue;
  }

  return options;
};
