var fs = require('fs-extra'),
    schema = require('gedcomx-fs-json-schema'),
    directory = __dirname + '/out';

// Clear output directory
fs.removeSync(directory);

// Create output directory
fs.mkdirSync(directory);

// Load templates
var templates = {
  'class': fs.readFileSync(__dirname + '/templates/class.js', 'utf8')
};

// Iterate over classes
var className, classOutput;

for(className in schema.definitions){
  if(!(schema.definitions[className] && schema.definitions[className].properties)){
    continue;
  }
  
  classOutput = generateClass(className, schema.definitions[className]);
  
  // Write to file
  fs.writeFileSync(directory + '/' + className + '.js', classOutput);
  process.exit();
}

/**
 * @param {String} className
 * @param {Object} schema
 * @return {String} generated class definition
 */
function generateClass(className, schema){
  var jsonProps = [],
      initMethods = [],
      prototypeMethods = [],
      propertyName,
      property;
  
  initMethods = [];
  prototypeMethods = [];
  
  // Generate jsonProps list
  jsonProps = Object.keys(schema.properties);
  
  // Generate method calls
  for(propertyName in schema.properties){
    property = schema.properties[propertyName];
    // TODO
  }
  
  // Fill template
  return fillTemplate(templates.class, {
    className: className,
    baseClass: schema.allOf ? nameFromRef(schema.allOf[0].$ref) : 'Base',
    jsonProps: `'` + jsonProps.join(`',\r\n    '`) + `'`
  });
}

/**
 * @param {String} ref
 * @return {String} name
 */
function nameFromRef(ref){
  return ref.split('/').pop();
}

/**
 * @param {String} template
 * @param {Object} variables
 * @return {String}
 */
function fillTemplate(template, variables){
  var output = template;
  for(var name in variables){
    output = output.replace(new RegExp(`{{${name}}}`, 'g'), variables[name]);
  }
  return output;
}