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
        "アドバイザーはアドバイザリー契約が必要",
        "カギカッコ「Azure」は OK",
        "全角の ”Office 365” や",
        "全角のシングル クォーテーション ‘Microsoft’ も利用可能"
    ],
    invalid: [
        // single match
        {
            text: "UPN が user012457@contoso.onmicrosoft.comのユーザーの UPN が user01@contoso.com に自動変更されます",
            output: "UPN が user012457@contoso.onmicrosoft.com のユーザーの UPN が user01@contoso.com に自動変更されます",
            errors: [
                {
                    message: "スペースが必要です",
                    line: 1,
                    column: 42
                }
            ],
        },
        {
            text: "更新プログラムを適用後、コンピュータを再起動してください。",
            output: "更新プログラムを適用後、コンピューターを再起動してください。",
            errors: [
                {
                    message: "コンピュータ に長音記号が必要です",
                    line: 1,
                    column: 13
                }
            ],
        },
        {
            text: "Azure ADに登録済みデバイス一覧",
            output: "Azure AD に登録済みデバイス一覧",
            errors: [
                {
                    message: "スペースが必要です",
                    line: 1,
                    column: 8
                }
            ]
        },
        {
            text: "Intuneモバイル アプリをiPhoneにインストールする。",
            output: "Intune モバイル アプリを iPhone にインストールする。",
            errors: [
                {
                    message: "スペースが必要です",
                    line: 1,
                    column: 6
                },
                {
                    message: "スペースが必要です",
                    line: 1,
                    column: 15
                },
                {
                    message: "スペースが必要です",
                    line: 1,
                    column: 21
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