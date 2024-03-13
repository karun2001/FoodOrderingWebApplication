export async function fetchData(){
    const response = await fetch("http://localhost:3000/meals");
    const responseData = await response.json();

    if(!response.ok){
        throw new Error("Failed to fetch Data")
    }
    return responseData;
}

export async function putData(items, data){
    const response = await fetch('http://localhost:3000/orders',
          { method: 'POST',
            hearders: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order:{
                items: items,
                customer: data,
            }}),       
          }
    );
    const resData = await response.json();
    if(!response.ok){
        throw new Error('Failed to update Data');
    }
    return resData.message;

}