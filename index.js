var fs = require('fs-extra'),
    schema = require('gedcomx-fs-json-schema'),
    Handlebars = require('handlebars'),
    directory = __dirname + '/out';

// Clear output directory
fs.removeSync(directory);

// Create output directory
fs.mkdirSync(directory);

// Load templates
var templates = {
  'class': Handlebars.compile(fs.readFileSync(__dirname + '/templates/class.js', 'utf8'))
};

// Register template helpers
Handlebars.registerHelper('capitalizeFirst', capitalizeFirstLetter);

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
  
  // Fill template
  return templates.class({
    className: className,
    baseClass: schema.allOf ? nameFromRef(schema.allOf[0].$ref) : 'Base',
    properties: schema.properties
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
 * http://stackoverflow.com/a/1026087
 * 
 * @param {String} string
 * @return {String}
 */
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}