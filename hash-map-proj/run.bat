@ECHO OFF
REM compile, keep .class files in ./bin
javac -d ./src ./src/*.java
REM run, -ea flag enables assertions
java -cp ./src -ea test