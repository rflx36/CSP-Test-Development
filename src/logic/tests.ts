export  default function permute(inputArray: number[]): number[][] {
    const results: number[][] = [];

    function backtrack(currentPermutation: number[], remainingItems: number[]) {
        if (remainingItems.length === 0) {
            results.push([...currentPermutation]); // Add the current permutation to results
            return;
        }

        for (let i = 0; i < remainingItems.length; i++) {
            const newPermutation = [...currentPermutation, remainingItems[i]];
            const newRemainingItems = [...remainingItems.slice(0, i), ...remainingItems.slice(i + 1)];
            backtrack(newPermutation, newRemainingItems);
        }
    }

    backtrack([], inputArray); // Start backtracking with an empty permutation
    return results;
}

// Example usage:

