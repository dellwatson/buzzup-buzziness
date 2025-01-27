

  // Utility: Fetch data from API
  export async function fetchDataFromApi(url: string, headers: Record<string, string> = {}) {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status} ${response.statusText}`);
    }
    return response.json();
  }
  

  // Utility to add a timeout to promises
export function withTimeout(promise, timeoutMs) {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error("Request timed out")), timeoutMs);
      promise.then(
        (result) => {
          clearTimeout(timeout);
          resolve(result);
        },
        (error) => {
          clearTimeout(timeout);
          reject(error);
        }
      );
    });
  }
  


