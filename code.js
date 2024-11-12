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
        let iteration = 0;  //Counter to track number of iterations
        const maxIterations = 1000; // Set a limit of iterations prevent infinite loops
        const noImprovementLimit = 100; // Set a limit for no improve 
        let noImprovementCounter = 0; //counter consecutive iterations with no improve

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
            iterationcount++; 
            if (!improved) {
                noImprovementCounter++; //Incase no imporvements were made 
                if (noImprovementCOunter >= noImprovementLimit) {
                    //Stop if we reach threshold
                    break;
                }
            }
        }

        //Step 5: return the length of the shortest route found
        return currentDistance; 
}
