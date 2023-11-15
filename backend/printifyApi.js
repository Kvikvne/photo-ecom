const TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzN2Q0YmQzMDM1ZmUxMWU5YTgwM2FiN2VlYjNjY2M5NyIsImp0aSI6ImVlNTI0OWEzNzVlYTA3YTFhNTY1MTRiZGY5NGM1OGU4YjYwN2ZiMTdlOWU0MDdhZWQwMmNjM2I4OTNlMmEwZjNlOTJlZTJlOTk2MDhkYWM2IiwiaWF0IjoxNjk5NTYwMTQ1LjQxMTgwNCwibmJmIjoxNjk5NTYwMTQ1LjQxMTgwOCwiZXhwIjoxNzMxMTgyNTQ1LjQwMTgxNywic3ViIjoiMTU4NjU5NTEiLCJzY29wZXMiOlsic2hvcHMubWFuYWdlIiwic2hvcHMucmVhZCIsImNhdGFsb2cucmVhZCIsIm9yZGVycy5yZWFkIiwib3JkZXJzLndyaXRlIiwicHJvZHVjdHMucmVhZCIsInByb2R1Y3RzLndyaXRlIiwid2ViaG9va3MucmVhZCIsIndlYmhvb2tzLndyaXRlIiwidXBsb2Fkcy5yZWFkIiwidXBsb2Fkcy53cml0ZSIsInByaW50X3Byb3ZpZGVycy5yZWFkIl19.Ahdtnv8H3pd3rftahuDhl95qozr5xL8AGxS9FsNK4d9q_BmfnSp61vivIngkmFHAKZcsVNvMyyGCi3_hKZI"


const axios = require('axios');
const PRINTIFY_API_URL = 'https://api.printify.com/v1/shops.json';

const printifyApi = axios.create({
  baseURL: PRINTIFY_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${TOKEN}`,
  },
});

const getProducts = async () => {
    try {
      const response = await axios.get('https://api.printify.com/v1/shops/12652066/products.json', {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
  
      return response.data; // Assuming Printify API returns JSON data
    } catch (error) {
      throw error;
    }
  };

// Add more functions as needed...

module.exports = { getProducts };