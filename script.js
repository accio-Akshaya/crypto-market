let cryptoData =[];

function fetchDataWithThen(){
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
         .then(response => response.json())
         .then(data =>{
            cryptoData = Date;
            renderTable(data);
         })
         .catch(error => console.error('Error Fetching data:',error));

}

async function fetchDataWithAsync(){
   try{
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
      const data = await response.json();
      cryptoData = data;
      renderTable(data);
   }catch(error){
      console.error('Error fetching data:', error);
   }
}

function renderTable(data){
   const tableBody = document.getElementById("cryptoTable");
   tableBody.innerHTML = "";
   data.forEach(coin =>{
      tableBody.innerHTML +=`
          <tr>
            <td><img src="${coin.image}" alt="${coin.name}"></td>
            <td>${coin.symbol.toUpperCase()}</td>
            <td>$${coin.current_price.toLocaleString()}</td>
            <td>$${coin.market_cap.toLocaleString()}</td>
            <td style="color: ${coin.price_change_percentage_24h >= 0 ? 'green' : 'red'};">
               ${coin.price_change_percentage_24h.toFixed(2)}%
            </td> 
            </tr> `;

   });

}

function filterData(){
   const query = document.getElementById("search").value.toLowerCase();
   const filteredData = cryptoData.filter(coin =>
      coin.name.toLowerCase().includes(query) || coin.symbol.toLowerCase().includes(query)
   );
   renderTable(filteredData);
}

function sortData(type){
   if(type==='market_cap'){
      cryptoData.sort((a,b)=>b.market_cap - a.market_cap);
   }else if(type === 'price_change'){
      cryptoData.sort((a,b)=>b.price_change_percentage_24h - a.price_change_percentage_24h);
   }
   renderTable(cryptoData);
}