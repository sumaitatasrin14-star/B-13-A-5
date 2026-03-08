1.What is the difference between var, let, and const?
Ans.
# var:

Scope: Function বা global

শুরুতে undefined

Re-declare: সম্ভব

Re-assign: সম্ভব

# let

Scope: Block ({ ... })

Hoisting: Hoisted কিন্তু ব্যবহার আগে করলে Error (TDZ)

Re-declare: একই block-এ না

Re-assign: সম্ভব

# const

Scope: Block

Hoisting: Hoisted কিন্তু TDZ

Re-declare: not possible

Re-assign: not possible

2.What is the spread operator (...)?
Ans.
array বা object এর উপাদানগুলো আলাদা আলাদা করে ফেলে দেয়
#Ex:

const arr1 = [3, 4, 5];
const arr2 = [...arr1, 6, 7];

console.log(arr2); // [3, 4, 5,6,7]

3.What is the difference between map(), filter(), and forEach()?

# forEach()

Array এর প্রতিটি element এর উপর function চালায়।

Return value নেই।

মূল array কে পরিবর্তন করতে পারে, কিন্তু নতুন array তৈরি করে না।

# filter()

Array এর প্রতিটি element এর উপর condition check করে।

Condition true হলে element নতুন array তে থাকে, false হলে বাদ যায়।

নতুন array দেয়, মূল array অপরিবর্তিত থাকে।

# map()

Array এর প্রতিটি element এর উপর কাজ করে নতুন array তৈরি করে।

Return value আছে, সব element এর পরিবর্তিত value সহ নতুন array দেয়।

মূল array অপরিবর্তিত থাকে।

4.What is an arrow function?
Ans.
Arrow function হলো JavaScript এর একটি ছোট ও সংক্ষিপ্ত function syntax, যা function keyword ছাড়া লেখা যায়।
লিখতে কম কোড লাগে|
Ex:
const square = x => x * x;

console.log(square(5)); // 25

5.What are template literals?
Ans.
Template literals হলো JavaScript এর string লেখার সহজ এবং শক্তিশালী উপায়, যা backticks ` দিয়ে লেখা হয়।
Ex:
const name = "Sumaita";
const age = 23;

const message = `My name is ${name} and I am ${age} years old.`;

console.log(message);
// Output: My name is Sumaita and I am 23 years old.