/**
 * Parse variables from text in the format {{variableName}}
 * Returns an array of unique variable names found in the text
 * 
 * @param {string} text - The text to parse for variables
 * @returns {string[]} - Array of unique variable names
 */
export function parseVariables(text) {
  if (!text) return [];
  
  // Match pattern: {{ followed by valid JS variable name followed by }}
  // Valid JS variable name: starts with letter, $, or _, followed by letters, digits, $, or _
  const variableRegex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
  const variables = [];
  let match;
  
  while ((match = variableRegex.exec(text)) !== null) {
    const variableName = match[1];
    // Only add unique variables
    if (!variables.includes(variableName)) {
      variables.push(variableName);
    }
  }
  
  return variables;
}
