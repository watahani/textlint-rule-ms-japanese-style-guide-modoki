"use strict";
const chouon = require("./chouon");
import { matchCaptureGroupAll } from "match-index";
import { RuleHelper } from "textlint-rule-helper";

const reporter = (context, options = {}) => {
  const { Syntax, RuleError, report, fixer, getSource } = context;
  const helper = new RuleHelper();
  const checkNoSpace = (node, text) => {
    const noSpaceBefore = matchCaptureGroupAll(
      text,
      /[^、。”「a-zA-Z0-9!"#-'()*-\/:-@¥\[\]\\^_{-~\s]([a-zA-Z0-9!#-'(*-\/;<=?-@¥\[\\^_{-~])+?/
    );
    const noSpaceAfter = matchCaptureGroupAll(
      text,
      /([a-zA-Z0-9!#-')*-\/:;=-@¥\]\\^_{-~])+?[^、。”」a-zA-Z0-9!"#-'()*-\/:-@¥\[\]\\^_{-~\s]/
    );

    const reportMatch = (match, padding) => {
      const index = match.index + padding;
      const replacer = fixer.insertTextAfterRange([index, index + 1] , ' ');
      report(
        node,
        new RuleError("スペースが必要です", {
          index: index,
          fix: replacer,
        })
      );
    };
    noSpaceBefore.forEach((v) => reportMatch(v, -1));
    noSpaceAfter.forEach((v) => reportMatch(v, 0));
  };

  return {
    [Syntax.Str](node) {
      const isIgnoredParentNode = helper.isChildNode(node, [
        Syntax.Header,
        Syntax.Link,
        Syntax.Image,
        Syntax.BlockQuote,
        Syntax.Emphasis,
      ]);
      if (isIgnoredParentNode) {
        return;
      }
      // "Str" node
      const text = getSource(node); // Get text
      chouon.forEach((c) => {
        const wrongMatches = matchCaptureGroupAll(
          text,
          new RegExp(`(${c.wrong}[^ー$])`)
        );

        const isMatchedIgnoreWord = (wrongWordRange, ignoreWordRange) => {
          return (
            ignoreWordRange[0] <= wrongWordRange[0] &&
            wrongWordRange[1] <= ignoreWordRange[1]
          );
        };

        wrongMatches.forEach((match) => {
          const indexOfBugs = match.index;
          const wordRange = [indexOfBugs, indexOfBugs + c.wrong.length];

          const matchedIgnoreWords = c.ignores.some((ignore) => {
            // match at least one ignore word
            return matchCaptureGroupAll(text, new RegExp(`(${ignore})`)).some(
              (match) => {
                const ignoreWordRange = [
                  match.index,
                  match.index + ignore.length,
                ];
                return isMatchedIgnoreWord(wordRange, ignoreWordRange);
              }
            );
          });
          if (matchedIgnoreWords) {
            return;
          }
          const ruleError = new RuleError(`${c.wrong} に長音記号が必要です`, {
            index: indexOfBugs, // padding of index
            fix: fixer.replaceTextRange(wordRange, c.expect),
          });
          report(node, ruleError);
        });
      });

      checkNoSpace(node, text);
    },
  };
};

module.exports = {
  linter: reporter,
  fixer: reporter,
};
