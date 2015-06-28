File diff parser
============

Parse and compare two files

## API

````
compare(file1, file2)

Compares file1 content to file2 content and return the result
 * usage: compare(file1, file2);
 * where:
 *    file1 - required string path to file 1
 *    file2 - required string path to file 2

````
 The goal of this task is to develop application that can compare the content of two files.
 Input parameters for the application are paths of two files (it’s a plus if application supports more than two files)
 The result of program is show the difference between the files. The format of result is shown below.

 For example:

 #File1

```sh
 Some
 Simple
 Text
 File
```

 #File2
```sh
 Another
 Text
 File
 With
 Additional
 Lines
```

 The result of program should look like this:
```sh
 1  *   Some|Another
 2  -   Simple
 3      Text
 4      File
 5  +   With
 6  +   Additional
 7  +   Lines
```

 The first column shows line number regarding the first file.

 The second column shows:

     1. * in case if line has changed

     2. – in case line exists in the first file but does not exist in the second one

     3. + in case line does not exist in the first file but exists in the second one

     4. Nothing if line has not changed.

 The third column shows:

    1. If line has changed, it shows text in the following format:

        Line content from the first file | line content from the second file

    2. If line exists in the first file but is missing in the second file – show the line content

    3. If the line is added in the second file – show the line content

 For more examples, please check http://www.diffnow.com/.

 From the code prospective, program should be implemented as a component that can be reused in any other applications easily.
