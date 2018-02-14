# patNum.js
### A Mathematics/Statistics Library in Javascript


## Example Usage
``` javascript
var stats = require("./Stats");
var Matrix = require("./Matrix");
var print = require('./Print');

var data = [11,2,45,5,3,2,4,11,4,3,5];

// Min
print("Min");
print(stats.min(data));

// Max
print("Max");
print(stats.max(data));

// Range
print("Range");
print(stats.Range(data))

// Frequency for A Number
print("A Frequency");
print(stats.AFrequency(data,2));
print(stats.AFrequency(data,4));
print(stats.AFrequency(data,45));
print(stats.AFrequency(data,11));

// Frequency for Some Number
print("Some Frequencies");
print(stats.SomeFrequencies(data,[4,2]));

// Frequency for All Number
print("All Frequencies");
print(stats.AllFrequencies(data));

// Mean
print("Mean");
print(stats.Mean(data));

// Medain
print("Medain");
print(stats.Median(data));

// Mode
print("Mode");
print(stats.Mode(data));

// Sample Standard Deviation
print("Sample Standard Deviation")
print(stats.SampleStandardDeviation(data))

// Population Standard Deviation
print("Population Standard Deviation")
print(stats.PopulationStandardDeviation(data))

// Mean Absolute Deviation
print("Mean Absolute Deviation")
print(stats.MeanAbsoluteDeviation(data))

// Median Absolute Deviation
print("Median Absolute Deviation")
print(stats.MedianAbsoluteDeviation(data))

// Matrix Add
let m1 = new Matrix([
    [1000,2000,3000,4000],
    [100,200,300,400]
]);


let m2 = new Matrix([
    [100,200,300,400],
    [1000,2000,3000,4000]
]);

print(m1.add(m2));


// Matrix Substract
m1 = new Matrix([
    [10,20],
    [100,200]
]);

m2 = new Matrix([
    [100,200,300,400],
    [1000,2000,3000,4000]
]);

print(m1.substract(m2));

// Hadamard Product
m1 = new Matrix([
    [1,2],
    [10,20]
]);

m2 = new Matrix([
    [5,10],
    [50,100]
]);

print(m1.multiply(m2));

// Matrix Multiplication or Linear Algebra Multiplication

m1 = new Matrix([
    [10,20],
    [30,40],
    [50,60]
])

m2 = new Matrix([
    [10,20,30],
    [40,50,60]
])

console.log(m1.dot(m2));

//Matrix Transpose
console.log(m1.transpose());

// Matrix Divide
m1 = new Matrix([
    [1,2],
    [10,20]
]);

m2 = new Matrix([2,20]);

console.log(m1.divide(m2));
```
