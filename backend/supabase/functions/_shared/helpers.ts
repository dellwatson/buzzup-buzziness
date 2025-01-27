// Helper: Merge and randomize two arrays
export function mergeAndRandomizeArrays(array1, array2) {
    const mergedArray = [...array1, ...array2];
    for (let i = mergedArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [mergedArray[i], mergedArray[j]] = [mergedArray[j], mergedArray[i]];
    }
    return mergedArray;
}
  

// Helper: Construct URL with query parameters
export function constructUrl(baseUrl: string, path: string, params: Record<string, string | number>) {
    const url = new URL(`${baseUrl}/${path}`);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
    return url.toString();
  }