"use strict";
const TextLintTester = require("textlint-tester");
const tester = new TextLintTester();
// rule
const rule = require("../src/index");
// ruleName, rule, { valid, invalid }
tester.run("rule", rule, {
    valid: [
        // no problem
        "コンピューター"
    ],
    invalid: [
        // single match
        {
            text: "更新プログラムを適用後、コンピュータを再起動してください。",
            errors: [
                {
                    message: "コンピュータ に長音記号が必要です",
                    line: 1,
                    column: 13
                }
            ]
        },
//         // multiple match
//         {
//             text: `It has many bugs.

// One more bugs`,
//             errors: [
//                 {
//                     message: "Found bugs.",
//                     line: 1,
//                     column: 13
//                 },
//                 {
//                     message: "Found bugs.",
//                     line: 3,
//                     column: 10
//                 }
//             ]
//         },

    ]
});