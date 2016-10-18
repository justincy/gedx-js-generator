/**
 * Get the {{propertyName}}
 * 
 * @returns { {{~refName property.$ref~}} } {{propertyName}}
 */
{{className}}.prototype.get{{capitalizeFirst propertyName}} = function(){
  return this.{{propertyName}};
};

/**
 * Set the {{propertyName}}
 * 
 * @param { {{~refName property.$ref~}} } {{propertyName}}
 * @returns { {{~className~}} } this
 */
{{className}}.prototype.set{{capitalizeFirst propertyName}} = function({{propertyName}}){
  if({{propertyName}}){
    this.{{propertyName}} = GedcomX.{{refName property.$ref}}({{propertyName}});
  }
  return this;
};