/**
 * Get the {{propertyName}}{{#isBoolean type}} flag{{/isBoolean}}
 * 
 * @returns {{type}} {{propertyName}}
 */
{{className}}.prototype.get{{capitalizeFirst propertyName}} = function(){
  return this.{{propertyName}};
};

/**
 * Set the {{propertyName}}
 * 
 * @param {{{type}}} {{propertyName}}
 * @returns { {{~className~}} } this
 */
{{className}}.prototype.set{{capitalizeFirst propertyName}} = function({{propertyName}}){
  this.{{propertyName}} = {{propertyName}};
  return this;
};