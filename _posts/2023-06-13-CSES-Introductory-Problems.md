---
layout: post
author: Malladi Pradyumna
tags: [welcome, miscellaneous]
---

# 1. Weird Algorithm

Let's try the most obvious solution:
```
void steps(int n) {
    while (n != 1) {
        std::cout<<n<<" ";
        if (n % 2 == 0) {
            n /= 2;
        } else {
            n = 3 * n + 1;
        }
    }
    std::cout<<n;
    return;
}
```
### Result: 

TIME LIMIT EXCEEDED on some test cases.

WRONG ANSWER on some test cases.

Wrong answer probably means some overflow occurred. Let's try changing all the `int` to `long` 
```
void steps(long n) {
    while (n != 1) {
        std::cout<<n<<" ";
        if (n % 2 == 0) {
            n /= 2;
        } else {
            n = 3 * n + 1;
        }
    }
    std::cout<<n;
    return;
}
```

### Result:
ACCEPTED on all test cases!

# 2. Missing Number

This is actually a very simple problem. We can find the sum of first n numbers by `n*(n+1)/2` and just subtract the sum of the numbers we received.

```
#include <iostream>
#include <vector>
#include <numeric>

int main(void){
    long n, sum=0;
    std::cin>>n;
    for(long i=0;i<n-1;i++){
        long no;
        std::cin>>no;
        sum+=no;
    }
    long actual_sum = n*(n+1)/2;
    long missing = actual_sum - sum;
    std::cout<<missing;
    return 0;
}
```

### Result: 

ACCEPTED!

# 3. Repetitions

From what I understood we have to find the length of the longest repeating character sequence without gaps.

Let's try the O(N) approach.

```
#include <iostream>
#include <string>

int main(void){
    std::string s;
    std::cin >> s;
    long len = s.length();
    long ans = 1;
    long max = 1;
    for(long i=0;i<len;i++){
        if(i<len-1){
            if(s[i]==s[i+1]){
                max++;
            } else {
                ans = std::max(max, ans);
                max = 1;
            }
        } else {
            ans = std::max(max, ans);
        }
    }
    std::cout<<ans;
    return 0;
}
```
Result: ACCEPTED!

Nice!

# 4. Increasing Array

`You are given an array of n
 integers. You want to modify the array so that it is increasing, i.e., every element is at least as large as the previous element.
`

So a solution is obvious:
1. Go through all the elements
2. If an element is less than the previous element (if any) we need to increase it.<br>`No of moves required = previous element - current element`
3. Update the current element to the previous value.
4. Add up all the moves required.

```
#include <iostream>

int main(void){
    long n;
    long moves = 0;
    long prev = -1;
    std::cin>>n;
    for (long i = 0; i < n; i++)
    {
        long val;
        std::cin >> val;
        if (i > 0) {
            if (val < prev) {
                moves += prev - val;
                val = prev;
            }
        }
        prev = val;
    }
    std::cout<<moves;
    return 0;
}
```
### Result: 

ACCEPTED

# 5. Permutations

I need to thank Rupanuga Mishra for the logic for this one. I simply couldn't figure it out :"(

Logic is simple:
1. Loop from `i=0 to i=n/2 (i++)`
2. Print the `ith` and `n/2+ith` numbers one after another

Quick Implementation:
```
for(long i=1;i<=n/2;i++){
    std::cout<<i<<" "<<i+n/2<<" ";
}
// If odd print the last one also
if(n%2==1){std::cout<<n<<" ";}
```
### Result:
FAILED on many test cases.

Seeing the test cases it failed, I noticed a similarity. They are all either:
1. `n==odd` or `n<6`

For `n==odd` the last two numbers were `n-1` and `n` so moving the if statement at the end 
to the beginning should fix it. (Thanks Dhruv!)

For the `n<6` I just added edge conditions (cheating according to Dhruv but it works haha)!
```
#include<iostream>

int main(void){
    long n;
    std::cin>>n;
    if(n==4){
        std::cout<<"3 1 4 2";
        return 0;
    }
    if(n==5){
        std::cout<<"2 4 1 3 5";
        return 0;
    }
    if(n==1){
        std::cout<<"1";
        return 0;
    }
    if(n<6){std::cout<<"NO SOLUTION"; return 0;}
    // If odd print the last one also
    if(n%2==1){std::cout<<n<<" ";}
    for(long i=1;i<=n/2;i++){
        std::cout<<i<<" "<<i+n/2<<" ";
    }
    return 0;
}
```
### Result:
ACCEPTED!

# 6. Number Spiral

Sadly I could not think of any elegant solution to the problem. After looking at it it seemed that the
solution could be found using some elaborate `if-else` blocks and so I did that.
```
// Usage: find_no(y-1, x-1)
long find_no(long row, long col){
    long num;
    // Lower Left
    if (row>col){
        long starting_element_of_row = row%2==1? (row+1)*(row+1) : row*row+1; 
        num = row%2==0? starting_element_of_row + col : starting_element_of_row - col;
    } 
    // Upper Right
    else if (row<col) {
        long starting_element_of_column = col%2==0? (col+1)*(col+1) : col*col+1; 
        num = col%2==0? starting_element_of_column - row : starting_element_of_column + row; 
    } else 
    // Diagonal
    {
        num = row*row+row+1;
    }
    return num;
}
```

### Result:
ACCEPTED!

# 7. Two Knights

This is a O(1) solution because there is a direct formula for the no of positions given a chessboard of some dimension.

Let's say there is a KxK chessboard. We can place two knights in it in `K^2C2` possible ways. How many of these ways make the two knights attack each other?

If two knights are attacking each other, they are at the corner squares of a `3x2` rectangle. In a `3x2` rectangle there are 4 ways we can arrange two knights so as to attack each other. So now how many 3x2 rectangles can we construct in a KxK chessboard?

Translating along the y-axis, we can have `K-3+1 = K-2` positions for the rectangle.
Translating along the x-axis, we can have `K-2+1 = K-1` positions for the rectangle.

Total no of positions where the two knights are attacking each other: `4*(K-2)*(K-1)`

Total no of positions where the two knights are NOT attacking each other: `K^2C2-4*(K-2)*(K-1)`

Quick Implementation:
```
long no_of_ways(long n){
    return (n*n*(n*n-1))/2 - 4*(n-1)*(n-2); 
}

int main(void){
    std::ios_base::sync_with_stdio(false);
    std::cin.tie(NULL);
    long n;
    std::cin>>n;
    for(long i=1;i<=n;i++){
        std::cout<<no_of_ways(i)<<std::endl;
    }
    return 0;
}
```

### Result:
ACCEPTED!

Luckily there were no edge cases for this problem!

# 8. Two Sets

So, I looked online and found out it is a DP Problem (which I unfortunately never learnt properly during my DSA Course.) Going briefly through some online brief explanations I saw the overall logic.

Let us say we have a set like this: `{1,2,3,4,5,6,7}`
The sum of the elements is `28` so we need to make two sets summing up to `14` each.

# todo!()

# 9. Bit Strings

This is a very simple problem. We just need to find 2^input. This can be done directly using a bitwise operation

```
#include<iostream>

int main(void){
    const long MOD = 1000000007; // 10^9 + 7
    long input;
    std::cin>>input;
    long result = 1 << input;
    std::cout<<result%MOD;
    return 0;
}
```
### Result:
FAILED on some test cases.

Observing a failed test case `input=447` we are getting negative values for both `2^result` and the final answer. We need to find a better way to do the power and % operations.

Luckily on googling I found this: https://www.geeksforgeeks.org/exponential-squaring-fast-modulo-multiplication/

Now let us use this method in our code. Basically we find `2^input % MOD` in a series of steps i=1 to i=n each time multiplying our input by 2 and taking the MOD.

The property used is: `a*a % mod = (a%mod) * (a%mod)`

```
#include<iostream>

int main(void){
    const long long MOD = 1000000007; // 10^9 + 7
    long long input;
    std::cin>>input;
    long long res = 1;
    for(long long i=0;i<input;i++){
        res = (res*2);
        res = res%MOD;
    }
    std::cout<<res;
    return 0;
}
```
### Result:
ACCEPTED!
Cool let's move on to the next one!

# 10. Trailing Zeros

Luckily this is a JEE Problem. We need to find the no of multiples of `5` in all the numbers upto the input number as that will give us the no of zeros.

`5` can come as either `5` or any of it's powers. No of occurences of `5^k` in the numbers upto `input` is `box[input/5^k]`

Quick Soln using this:
```
#include<iostream>

int main(void){
    long long n;
    std::cin>>n;
    long long zeros = 0;
    for(long long i=5;i<=n;i*=5){
        zeros += n/i;
        if(zeros==0) {
            break;
        }
    }
    std::cout<<zeros;
    return 0;
}
```
### Result: 
ACCEPTED!

# 11. Coin Piles

So some maths now:
Let `a = coins in left pile`
Let `b = coins in right pile`

We have two options for each of our operations:
1. Remove 2 coins from a and 1 coin from b
2. Remove 1 coin from a and 2 coins from b

Let `x = no of times 1 was performed`.
Let `y = no of times 2 was performed`.

So, `total no of moves = x+y`.

If at the end of `x+y` operations, the two piles became empty, we have two conditions:
1. `a = x*2 + y`
2. `b = x + 2*y`
   
Adding:
1. `a + b = 3*(x + y)`

So, we have 1 condition: That the sum of the two piles must be a multiple of 3!

But, this condition is not sufficient. We have one more also!

Let one pile be incredibly large and the other be incredibly small (less than twice the size of the other)! We keep on removing 2 elements from the bigger and one from the smaller but the smaller pile becomes empty first!!

So, we need to ensure that the bigger pile is no bigger than twice the smaller!

Quick Implementation:
```
#include <iostream>

int main(void){
    long long t;
    std::cin >> t;
    for (long long i = 0; i<t; i++){
        long long a, b;
        std::cin >> a >> b;
        if ((a+b)%3 == 0 && 2*a >= b && 2*b >= a)
            std::cout << "YES" << std::endl;
        else
            std::cout << "NO" << std::endl;
    }
    return 0;
}
```
### RESULT:
ACCEPTED!

# 12. Palindrome String

First, we make a frequency array for the string. We see that if the total number of characters having odd frequency is odd, no such palindrome is possible.

Let's say we have the frequency array and making a palindrome is possible. How to make it?

Let us make 2 strings for the left and right halves of the palindrome. Now let's go through our freq array from `0` to `26`. If a character has even frequency, we can keep half of the count in the starting of palindrome and half at the end. If it has odd frequency just keep all of them in the middle!

Not so quick implementation xD
```
#include<iostream>

int main(void){
    std::string input;
    std::cin>>input;
    int freq[26] = {0};
    for(int i=0; i<input.length(); i++){
        freq[input[i]-'A']++;
    }
    bool isOdd = input.length()%2 == 1;
    int noOfOdd = 0;
    for(int i=0; i<26; i++){
        if(freq[i]%2 == 1){
            noOfOdd++;
        }
    }
    if (noOfOdd > 1){
        std::cout<<"NO SOLUTION";
    } else {
        std::string outputleft = "";
        std::string outputright = "";
        // Fill all the even freq characters first
        for(int i=0; i<26; i++){
            if(freq[i]%2 == 0){
                int num = freq[i]/2;
                while(num--){
                    outputleft += (char)('A'+i);
                    outputright += (char)('A'+i);
                }
            }
        }
        // Print the outputleft + odd freq character + outputright
        for(int i=0;i<outputleft.length();i++) std::cout<<outputleft[i];
        for(int i=0;i<26;i++){
            if(freq[i]%2 == 1){
                int num = freq[i];
                while(num--) std::cout<<(char)('A'+i);
            }
        }
        for(int i=outputright.length()-1;i>=0;i--) std::cout<<outputright[i];
    }
    return 0;
}
```

### Result:
ACCEPTED on all test cases!

# 13. Gray Code

This can be solved by recursion. Assume we already have the Gray Code for some `n`. How to get for `n+1` ?

Let's consider the case of `n=2`:
```
GRAY CODE (n = 2):
00
01
11
10
```
Now, for n=3 we observe that if we keep a zero in the starting of these numbers, each still differs by one from the next! Same if we keep a one! Also note that taking both of these together (second one in reverse), we get all the numbers in the gray code for `n=3`!

```
GRAY CODE (n = 3):
000
001
011
010
110
111
101
100
```

Implementation:
```
std::vector<std::string> gray_code(long long n){
    if(n==1){
        std::vector<std::string> vec;
        vec.push_back("0");
        vec.push_back("1");
        return vec;
    } else {
        std::vector<std::string> vec;
        std::vector<std::string> vecprev = gray_code(n-1);
        for(int i=0;i<vecprev.size();i++){
            vec.push_back("0"+vecprev[i]);
        }
        for(int i=vecprev.size()-1;i>=0;i--){
            vec.push_back("1"+vecprev[i]);
        }
        return vec;
    }

}
```

### Result:
ACCEPTED on all test cases!

# 14. Tower of Hanoi

I am really sorry I wrote a really big post for this one but my laptop lost power and everything was gone. Seems the work wasn't saved (Loving first day of emacs already). 

So, A quick summary will have to suffice (No energy for anything more :"(  ) : 

The soln is simple. To move N Disks from Tower 1 to Tower 3 using Tower 2, We first move the top N-1 Disks to tower 2 and the Nth (Bottom Most) Disk to Tower 3. Then We Move the N-2 Disks on Tower 2 to Tower 3. It is a simple Recursion problem.


Quick Implementation:

```
#include<iostream>
#include<vector>
#include<utility>

typedef long long ll;
typedef std::pair<int, int> Move;

void tower_of_hanoi(ll from_tower, ll using_tower, ll to_tower, ll no_of_disks, std::vector<Move> &moves){
    if(no_of_disks == 0){
        // Base Case
        return;
    } else {
        // First move the N-1 disks to the middle tower
        tower_of_hanoi(from_tower, to_tower, using_tower, no_of_disks-1, moves);
        // Move one disk from the left tower to the right tower
        // Add the move to the moves vector
        moves.push_back(std::make_pair(from_tower, to_tower));
        // Move N-1 disks from the middle tower to the right tower
        tower_of_hanoi(using_tower, from_tower, to_tower, no_of_disks-1, moves);
    }
}


int main(void){
    ll n;
    std::cin>>n;
    std::vector<Move> moves;
    tower_of_hanoi(1, 2, 3, n, moves);
    std::cout<<moves.size()<<"\n";
    for(const auto &move: moves) {
        std::cout<<move.first<<" "<<move.second<<"\n";
    }
    return 0;
}

```

### Result:
ACCEPTED! (on all test cases)

# 15. Creating Strings

We have to take a string, find all the permutations of it and return the output in alphabetical order.

The method for generating permutations is pretty standard. If we store them in a `std::set`, that will take care of the lexicographic ordering automatically for us.

Implementation:
```
void permute(std::string str, int left, int right, std::set<std::string> &outputs){
  if(left == right) {
    std::cout<<str<<std::endl;
    outputs.insert(str);
  } else {
    for(int i=left;i<=right;i++){
      std::swap(str[left], str[i]);
      permute(str, left+1, right, outputs);
      std::swap(str[left], str[i]);
    }
  }
}

```

### Result:
ACCEPTED!

# 16. Apple Division

We have a set of some numbers. We have to divide it into two sets such that the difference in the sum of the two sets is the least and we have to find that sum.

```
Ex Input:
5
3 2 7 4 1
Two Sets:
{2,3,4}, {7,1}
```

First let us sort the input:

`7,4,3,2,1`

Then let us take a number from the left and insert into set 1 and take the next numbers till the sum exceeds the first number and insert into set two. If it exceeds, we repeat the process. In this way we can solve the problem!

Eg Soln:
1. `{7} {4,3,2}`
2. `{7,1} {4,3,2}`

Implementation:
```
#include<iostream>
#include<vector>
#include<set>
#include<algorithm>
#define ll long long
#define fio std::ios_base::sync_with_stdio(false); std::cin.tie(NULL); std::cout.tie(NULL)

ll abs(ll a){
  if(a>0){
    return a;
  } else {
    return -1*a;
  }
}

ll partition(std::vector<ll> &inputs, std::vector<ll> &grp1, std::vector<ll> &grp2, ll n){
  std::sort(inputs.begin(), inputs.end(), std::greater<ll>());
  bool insert_in_grp1 = true;
  ll sum1 = 0, sum2 = 0;
  for(auto x: inputs){
    if(sum1>=sum2 && sum1+sum2 != 0){
      insert_in_grp1 = false;
    } else {
      insert_in_grp1 = true;
    };
    if(insert_in_grp1){
      grp1.push_back(x);
      sum1 += x;
    } else {
      grp2.push_back(x);
      sum2 += x;
    }
  }
  return abs(sum1-sum2);
}

int main(void){
  fio;
  ll n;
  ll diff = 0;
  std::cin>>n;
  std::vector<ll> inputs(n);
  std::vector<ll> grp1, grp2;
  for(ll i = 0; i < n; i ++){
    std::cin>>inputs[i];
  }
  diff = partition(inputs, grp1, grp2, n);
  std::cout<<diff;
  return 0;
}
```

### Result:
FAILED! (On many test cases!)


Maybe we are better off finding all the different possible splits and choosing the minimum difference instead....

Also the constraint is: `1 <= n <= 20` which seems very favourible for a slow algorithm.

There is a very simple way to get all divisions of a set into two subsets. We go through all the numbers from `0` to `2^n -1` and the `1/0` in the binary representation of each of indicate whether the element at that particular index is present in grp1 or grp2. Let us try to generate all the divisions using this and then go through them and choose the one where the sum is the least!

(Not so quick) implementations!

```
#include <iostream>
#include <vector>
#include <cmath>
#include <limits>

#define ll long long
#define fio std::ios_base::sync_with_stdio(false); std::cin.tie(NULL); std::cout.tie(NULL)

ll partition(const std::vector<ll>& input, std::vector<ll>& grp1, std::vector<ll>& grp2, ll n) {
    std::vector<ll> tmp_grp1, tmp_grp2;
    ll diff = std::numeric_limits<ll>::max();
    for (ll i = 0; i < (1 << n) - 1; i++) {
        ll sum1 = 0, sum2 = 0;
        tmp_grp1.clear();
        tmp_grp2.clear();
        for (ll index = 0; index < input.size(); index++) {
            if ((i & (1 << index)) == 0) {
                tmp_grp1.push_back(input[index]);
                sum1 += input[index];
            } else {
                tmp_grp2.push_back(input[index]);
                sum2 += input[index];
            }
        }
        if (std::abs(sum1 - sum2) < diff) {
            diff = std::abs(sum1 - sum2);
            grp1 = tmp_grp1;
            grp2 = tmp_grp2;
        }
    }
    return diff;
}

int main() {
    fio;
    ll n;
    std::cin>>n;
    std::vector<ll> input(n);
    for(ll i = 0; i < n; ++i){
      std::cin>>input[i];
    }
    std::vector<ll> grp1, grp2;
    ll diff = partition(input, grp1, grp2, n);
    std::cout << diff << std::endl;

    return 0;
}
```

### Result:
ACCEPTED! (On all test cases!)

# 17. Chessboard and Queens

From now onwards I will not add any explanations as I don't have much time.

Maybe later I will add the explanations....

Solution:
```
#include<iostream>
#define fio std::ios_base::sync_with_stdio(false); std::cin.tie(NULL); std::cout.tie(NULL)

int count = 0;
char board[8][8];
// Availibility of a particular left/right diagonal and row
bool left_diag[15] = {false}, right_diag[15] = {false}, rows[7] = {false};


void calculate_possibilities(int col){
  if(col == 8){
    count++;
    return;
  } else {
    for(int row = 0; row < 8; ++row){
      if(board[row][col] == '.' &&
         left_diag[row-col+7] == false &&
         right_diag[row+col] == false &&
         rows[row] == false) {

        left_diag[row-col+7] = true;
        right_diag[row+col] = true;
        rows[row] = true;

        calculate_possibilities(col+1);

        left_diag[row-col+7] = false;
        right_diag[row+col] = false;
        rows[row] = false;
      }
    }
  }
}

int main(void){
  fio;
  for(int i = 0; i < 8; i++){
    for(int j = 0; j < 8; j++){
      std::cin>>board[i][j];
    }
  }
  calculate_possibilities(0);
  std::cout<<count;
  return 0;
}

```
