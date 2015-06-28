/**
 * Compare two files base on their content
 * usage: compare(file1, file2);
 * where:
 *    file1 - required string path to file 1
 *    file2 - required string path to file 2
 */
var Args = require("vargs").Constructor,
    fs = require("fs");

exports.compare = function () {
    var file1,
        file2,
        callback;

    /**
     * Common argument checking for crop and resize
     */
    function checkArgs(args) {
        if (args.length < 2) throw new Error("File1, File2, and callback required");
        if (typeof args.at(0) != "string") throw new Error("File1 required");
        if (typeof args.at(1) != "string") throw new Error("File2 required");
        if (!args.callbackGiven()) throw new Error("Callback required");

        file1 = args.at(0);
        file2 = args.at(1);

        fs.exists(file1, function (exists) {
            if (!exists) throw new Error("The file1: " + file1 + " does not exists.");
        });

        fs.exists(file2, function (exists) {
            if (!exists) throw new Error("The file2: " + file2 + " does not exists.");
        });

        if (args.length > 2) {
            throw new Error("Invalid args length: " + args.length);
        }
    }

    var args = new Args(arguments);
    checkArgs(args);
    callback = args.callback;

    /**
     * Call the compare algorithm for both file, and send result to callback
     */
    compareFiles(file1, file2, callback);
};

/**
 * Create a compare result for the given files
 */
function compareFiles(file1, file2, callback) {
    fs.readFile(file1, function (err, f) {
        var contents1 = f.toString().split('\n');
        fs.readFile(file2, function (err, f) {
            var contents2 = f.toString().split('\n'),
                result = "",
                resultIdx = 1;

            diffContents(contents1, contents2, function (data) {
                result = result.concat((result ? '\n' : ''), resultIdx++, data);
            })

            callback(result);
        });
    });
}

/**
 * Compare the given contents, and call the fn for each line
 *
 * @param contents1
 * @param contents2
 * @param appendFn
 */
function diffContents(contents1, contents2, appendFn) {
    var idx1 = -1,
        idx2 = -1;

    contents1.some(function (element1, index1) {
        var hasSame = contents2.some(function (element2, index2) {
            return (element1 === element2 ? idx2 = index2 : false);
        });
        return (hasSame ? idx1 = index1 : false);
    });

    var subSet1 = getContentsToCompare(contents1, idx1),
        subSet2 = getContentsToCompare(contents2, idx2);

    processContents(subSet1, subSet2, appendFn);

    if (contents1[0] || contents2[0])
        diffContents(contents1, contents2, appendFn);
}

/**
 * Extract the contents to compare based on the given element index
 *
 * @param contents
 * @param idx
 * @returns {Array.<T>}
 */
function getContentsToCompare(contents, idx) {
    var qty = (idx ? idx : 1);

    return contents.splice(0, qty !== -1 ? qty : contents.length);
}

/**
 * Generate output result
 *
 * @param contents1
 * @param contents2
 * @param appendFn
 */
function processContents(contents1, contents2, appendFn) {
    for (var i = 0; i < contents1.length || i < contents2.length; i++) {
        var element1 = contents1[i],
            element2 = contents2[i],
            result;

        if (element1 === undefined) {
            result = "\t+\t" + element2;
        } else if (element2 === undefined) {
            result = "\t-\t" + element1;
        } else if (element1 === element2) {
            result = "\t\t" + element1;
        } else if (element1 !== element2) {
            result = "\t*\t" + element1 + "|" + element2;
        }

        if (result) appendFn(result);
    }
}