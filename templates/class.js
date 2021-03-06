module.exports = function(GedcomX){
  
  /**
   * Class description
   * 
   * @class {{className}}
   * @extends {{baseClass}}
   * @param {Object} [json]
   */ 
  var {{className}} = function(json){
    
    // Protect against forgetting the new keyword when calling the constructor
    if(!(this instanceof {{className}})){
      return new {{className}}(json);
    }
    
    // If the given object is already an instance then just return it. DON'T copy it.
    if({{className}}.isInstance(json)){
      return json;
    }
    
    this.init(json);
  };
  
  {{className}}.prototype = Object.create(GedcomX.{{baseClass}}.prototype);

  {{className}}._gedxClass = {{className}}.prototype._gedxClass = 'GedcomX.{{className}}';
  
  {{className}}.jsonProps = [
    {{#each properties}}
    '{{@key}}'{{#unless @last}},{{/unless}} 
    {{/each}}
  ];
  
  /**
   * Check whether the given object is an instance of this class.
   * 
   * @param {Object} obj
   * @returns {Boolean}
   */
  {{className}}.isInstance = function(obj){
    return GedcomX.utils.isInstance(obj, this._gedxClass);
  };
  
  /**
   * Initialize from JSON
   * 
   * @param {Object}
   * @return {{{className}}} this
   */
  {{className}}.prototype.init = function(json){
    
    GedcomX.{{baseClass}}.prototype.init.call(this, json);
    
    if(json){
      {{#each properties}}
      this.set{{capitalizeFirst @key}}(json.{{@key}}); 
      {{/each}}
    }
    return this;
  };
  {{#each properties}}
  
    {{#isArrayProperty this}}
  {{> arrayMethod className=../className propertyName=@key property=this}}
    {{else isClassProperty this}}
  {{> classMethod className=../className propertyName=@key property=this}}
    {{else}}
  {{> literalMethod className=../className propertyName=@key property=this}}
    {{/isArrayProperty}}
    
  {{/each}}
  
  /**
   * Export the object as JSON
   * 
   * @return {Object} JSON object
   */
  {{className}}.prototype.toJSON = function(){
    return this._toJSON(GedcomX.{{baseClass}}, {{className}}.jsonProps);
  };
  
  GedcomX.{{className}} = {{className}};
  
};