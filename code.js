function tsp_ls(distance_matrix) {
    const n = distance_matrix.length;

    //Function to calculate the length of a given route
    //CRD = Calculate Route Distance
    function CRD(route) {
        let distance = 0; 
        for (let i = 0; i < route.length - 1; i++) {
            distance += distance_matrix[route[i]][route[i + 1]]; 
        }
        return distance;
    }

        //Function to perform 2-opt swap between indices i and k in route
        //TOS = Two Opt Swap
        function TOS(route, i, k) {
            let newRoute = route.slice(0, i).concat(route.slice(i, k + 1).reverse(), route.slice(k + 1));
            return newRoute; 
        }

        //Step 1: Initialize with a random route
        let currentRoute = Array.from({ length: n }, (_, i) => i); 
        for (let i = n - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [currentRoute[i], currentRoute[j]] = [currentRoute[j], currentRoute[i]]; 
        }

        //Step 2: Calculate the total distance of the initial random route
        let currentDistance = CRD(currentRoute); 
        let improved = true; //Check if any improved 
        let iterationCount = 0;  //Counter to track the number of iterations. 0 is also the starting value. 
        const maxIterations = 1000; // Set a limit of iterations to prevent infinite loops. I tried doing 100 and it did not pass]
        // the test so I did 1000 so that it could explore a larger range of values. 
        const noImprovementLimit = 100; // Set a limit for no improvement. I gave it a larger number in case it finds a improvement at number 99 
        // once it hits 100 it will stop. 
        let noImprovementCounter = 0; //counter consecutive iterations with no improvement. 0 is the starting value. 

        //Step 3: Begin 2-opt algorithm loop
        while (improved && iterationCount < maxIterations) {
            improved = false; 
            //Try all possible swaps between i and k
            for (let i = 1; i < n - 1; i++) {
                for (let k = i + 1; k < n; k++) {
                    //Perform a 2-opt swap
                    let newRoute = TOS(currentRoute, i, k);
                    let newDistance = CRD(newRoute); 
                    //If new route has a shorter route update the route
                    if (newDistance < currentDistance) {
                        currentRoute = newRoute; 
                        currentDistance = newDistance; 
                        improved = true; 
                        noImprovementCounter = 0; 
                        break; // break inner to start new loop 
                    }
                }
                if (improved) break; //If improvement found break outer loop 
            }

            //Step 4: Track iteration count and manage stopping conditions
            iterationCount++; 
            if (!improved) {
                noImprovementCounter++; //Incase no imporvements were made 
                if (noImprovementCounter >= noImprovementLimit) {
                    //Stop if we reach threshold
                    break;
                }
            }
        }

        //Step 5: return the length of the shortest route found
        return currentDistance; 
}
