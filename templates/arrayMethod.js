/**
 * Get the {{propertyName}}
 * 
 * @return { {{~refName property.items.$ref~}} []}
 */
{{className}}.prototype.get{{capitalizeFirst propertyName}} = function(){
  return this.{{propertyName}} || [];
};

/**
 * Set the {{propertyName}}
 * 
 * @param { {{~refName property.items.$ref~}} []} {{propertyName}}
 * @returns { {{~className~}} } this
 */
{{className}}.prototype.set{{capitalizeFirst propertyName}} = function({{propertyName}}){
  return this._setArray({{propertyName}}, '{{propertyName}}', '{{capitalizeFirst propertyName}}');
};

/**
 * Add a {{singular propertyName}}
 * 
 * @param { {{~refName property.items.$ref~}} } {{singular propertyName}}
 * @returns { {{~className~}} } this
 */
{{className}}.prototype.add{{capitalizeFirst propertyName}} = function({{singular propertyName}}){
  return this._arrayPush({{singular propertyName}}, '{{propertyName}}', GedcomX.{{refName property.items.$ref}});
};