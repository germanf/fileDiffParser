var assert = require('assert'),
    path = require('path');

describe('File Diff Parser Tests', function () {
    var comparator = require("../index.js"),
        rootPath = process.cwd(),
        filePath1 = path.join(rootPath, "test/fixture/file1"),
        filePath2 = path.join(rootPath, "test/fixture/file2");

    console.log('current directory: %s', rootPath);

    describe('Arguments fixture', function () {
        it('no args fails', function () {
            assert.throws(function () {
                comparator.compare();
            }, /File1, File2, and callback required/);
        });

        it('no callback fails', function () {
            assert.throws(function () {
                comparator.compare(filePath1, filePath2);
            }, /Callback required/);
        });

        it('bad args quantity', function () {
            assert.throws(function () {
                comparator.compare(filePath1, filePath2, "aaa", function () {
                });
            }, /Invalid args length/);
        });

        it('bad callback fails', function () {
            assert.throws(function () {
                comparator.compare(filePath1, filePath2, "badcallback");
            }, /Callback required/);
        });

        it('all args right', function () {
            assert.doesNotThrow(function () {
                comparator.compare(filePath1, filePath2, function () {
                });
            });
        });
    });

    describe('Compare file contents', function () {
        it('expected diff result', function () {
            var callback = function (result) {
                var actual = data.split('\n'),
                    expected = [
                        "1	*	Some|Another",
                        "2	-	Simple",
                        "3		Text",
                        "4		File",
                        "5	+	With",
                        "6	+	Additional",
                        "7	+	Lines"];

                for(var i =0; i < expected.length;i++){
                    assert.strictEqual(actual[i], expected[i], actual[i] + " !== " + expected[i]);
                }
            };

            comparator.compare(filePath1, filePath2, callback);
        });
    });
});