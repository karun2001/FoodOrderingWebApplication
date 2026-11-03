// import { useEffect, useState, useCallback } from "react";

// async function sendHttpRequest(url, config){
//     const response = await fetch(url, config);
//     const responseData = await response.json();
//     if(!response.ok){
//         throw new Error(responseData.message || "Failed to fetch Data");
//     }
//     return responseData;
// }

// export default function useHttp(url, config, initialValue){

//     const [data, setData] = useState(initialValue);
//     const [error, setError] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
    
//     function clearData(){
//         setData(initialValue);        
//     }


//     const sendRequest = useCallback(
//         async function sendRequest(data){
//             setIsLoading(true);
//             try{
//                 const resData = await sendHttpRequest(url, {...config, body: data});
//                 setData(resData);
//             } catch(error) {
//                 setError(error.message || "something went wrong");
//             }
//             setIsLoading(false);
//     }, [url, config]) 

//     useEffect(()=>{
//         if(config.method != "POST"){
//             sendRequest();
//         }
//     }, [sendRequest])

//     return {
//         data,
//         error,
//         isLoading,
//         sendRequest,
//         clearData,
//     };
// }


import { useEffect, useState, useCallback } from "react";

async function sendHttpRequest(url, config) {
  // --- OPTION A INTERCEPTION FOR POST (SIMULATED BACKEND) ---
  if (config?.method === "POST") {
    // Simulate network latency (600ms) for realistic UX
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Return mock success payload matching the backend response contract
    return { message: "Order created successfully!" };
  }

  // --- STANDARD GET / FETCH FROM STATIC JSON ---
  const response = await fetch(url, config);
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message || "Failed to fetch data.");
  }

  return responseData;
}

export default function useHttp(url, config, initialValue) {
  const [data, setData] = useState(initialValue);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function clearData() {
    setData(initialValue);
    setError("");
  }

  const sendRequest = useCallback(
    async function sendRequest(customData) {
      setIsLoading(true);
      setError("");

      try {
        const finalConfig = customData
          ? { ...config, body: JSON.stringify(customData) }
          : config;

        const resData = await sendHttpRequest(url, finalConfig);
        setData(resData);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      }

      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    // Safe navigation: only auto-send if not explicitly configured as POST
    if (!config || config.method !== "POST") {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    error,
    isLoading,
    sendRequest,
    clearData,
  };
}