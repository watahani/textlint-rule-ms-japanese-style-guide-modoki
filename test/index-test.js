"use strict";
const TextLintTester = require("textlint-tester");
const tester = new TextLintTester();
// rule
const rule = require("../src/index");
// ruleName, rule, { valid, invalid }
tester.run("rule", rule, {
    valid: [
        // no problem
        "コンピューター",
        "[大かっこの中身]",
        "(小かっこの中身)",
        "<大なり小なりの中身>",
        "\"ダブルクォーテーションの中身\"",
        "コロンの前はスペース: いらない？",
        "句読点の前後の Alphabet、1 byte。Char",
        "「Alphabet」",
        "全角の ”double quote” は使えます",
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
        {
            text: "Azure ADに登録済みデバイス一覧",
            errors: [
                {
                    message: "スペースが必要です",
                    line: 1,
                    column: 7
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