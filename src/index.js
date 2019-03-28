"use strict";
const chouon = require('./chouon')

module.exports = function(context, options = {}) {
    const {Syntax, RuleError, report, getSource} = context;
    return {
        [Syntax.Str](node){ // "Str" node
            console.log(chouon)
            const text = getSource(node); // Get text
            chouon.forEach( c => {
                const matches = new RegExp(c + "[^ー]", 'g' ).exec(text); // Found "bugs"
                if (!matches) {
                    return;
                }
                const indexOfBugs = matches.index;
                const ruleError = new RuleError(`${c} に長音記号が必要です`, {
                    index: indexOfBugs // padding of index
                });
                report(node, ruleError);                
            });
        }
    }
};
