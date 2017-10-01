hash-map-proj
---

## Description

This is my implementation of a fixed-size hashmap, supporting the following functions:

**constructor(size):** return an instance of the class with pre-allocated space for the given number of objects.

**boolean set(key, value):** stores the given key/value pair in the hash map. Returns a boolean value indicating success / failure of the operation.

**get(key):** return the value associated with the given key, or null if no value is set.

**delete(key):** delete the value associated with the given key, returning the value on success or null if the key has no value.

**float load():** return a float value representing the load factor (`(items in hash map)/(size of hash map)`) of the data structure. Since the size of the dat structure is fixed, this should never be greater than 1.

## Compiling & Testing
To compile and run tests, just type `run` in a command line, which runs the batch script (only works on Windows). For Mac and Linux users, please compile the java files and execute `test.java` as you normally would in a shell:

```
javac -d ./bin ./src/*.java
java -cp ./bin -ea test
```

## Credits
Made with :heart: for my [KPCB Fellows](http://kpcbfellows.com/) application!