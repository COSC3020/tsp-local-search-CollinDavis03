# Traveling Salesperson Problem -- Local Search

This exercise is about the Traveling Salesperson Problem I mentioned in the
lecture on NP-hard problems -- given a set of cities, determine the length of
the shortest tour that visits all of them. We can get from any city to any other
city, i.e. the graph of cities is completely connected. We consider the version
of the Traveling Salesperson Problem that finds the shortest tour to visit $n$
cities, starting at a city and ending at the $n$ th city; it *does not* go
back to the start. The start city may be any of the cities. Remember that the
graph for a TSP is undirected, i.e. the cost is the same in either direction.

The 2-opt algorithm for solving the Traveling Salesperson Problem is a
randomized local search algorithm that, at each iteration, reverses part of the
route. It starts with a random route (this is the randomized part), and changes
part of the route in each step (this is the local search part, sprinkled with
more randomness). The pseudocode for one iteration is as follows:

```javascript
2optSwap(route, i, k)
  cities 1 to i-1 stay in the order they are
  cities i to k are reversed
  cities k + 1 to n stay in the order they are
```

For example, if I call the above function with route A--B--C--D--E--F, $i=2$,
$k=4$, the resulting route is A--B--E--D--C--F.

The algorithm starts with a random route; if the new route at the end of an
iteration decreases the total length, it is retained as the current incumbent.
The incumbent after the final iteration is returned as the solution.

Implement the 2-opt algorithm, which repeatedly runs the above steps. Your
implementation needs to fix two design parameters that I have left open. First,
you need to design a stopping criterion -- when would it make sense to stop and
return the shortest route found so far rather than trying another iteration?
Second, design a way to choose $i$ and $k$ -- note that they need to be
different in subsequent iterations, as one iteration would simply undo what
the previous one did otherwise. Start with the template I provided in `code.js`.
Describe in your code how you designed your stopping criterion and ways of
choosing $i$ and $k$ and why.

The function takes a distance matrix (the adjacency matrix for the graph where
the values in the cells are the distances between the corresponding cities) and
returns the length of the shortest tour (not the tour itself).

Test your new function; I've provided some basic testing code in `code.test.js`.

## Runtime Analysis

What is the worst-case asymptotic time complexity of your implementation? What
is the worst-case asymptotic memory complexity? Add your answer, including your
reasoning, to this markdown file.

## Answer 
Looking back at my code. Where we are in the 2-opt algorithm we have two for loops one is an outer loop and the other is the inner loop. 

The outer for loop iterates with all the possible values of i from 1 to n-2. This would make the worst-case runtime $O(n)$ for the outer loop. 

Then the inner loop iterates from the possible k values from i+1 to n-1. This gives us a runtime of $O(n)$ for the inner loop. 

We also have CRD which calculates the total distance of a route given to it. This involves summing up n distances. Making the worst-time runtime being $O(n)$. 

We also have the TOS function which swaps operations by slicing and concatenating arrays. This takes $O(n)$ time to do. 

We have the outer while loop at the start of the 2-opt algorithm loop. This performs $)(n^{2})$ operations. The reason is that each 2-opt swap ($O(n)$) and the CRD ($O(n)$) is being performed to make (O(n) + O(n)) per iteration. 

When we combine all the while loops with the for loops we will get $O(n^{3})$ as the worst-case runtime. 

The worst-case runtime for this code is $\Theta(n^{3})$ 


## Sources 
I do not have any sources for this code except for collaborating with Lily and Nolan on this to get an idea of where we all would start and execute the code. 

## Plagarism Statement
“I certify that I have listed all sources used to complete this exercise, including the use of any Large Language Models. All of the work is my own, except where stated otherwise. I am aware that plagiarism carries severe penalties and that if plagiarism is suspected, charges may be filed against me without prior notice.”
