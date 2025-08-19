
import { useState, useEffect } from "react";
import axios from "axios";

export default function ListaProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [novoProduto, setNovoProduto] = useState("");



  useEffect(() => {

    
    axios.get("http://localhost:3001/produtos")
      .then(res => setProdutos(res.data))
      .catch(err => console.error("deu pau carregando", err));
  }, []);



  const adicionarProduto = () => {
    if (!novoProduto) return;


    axios.post("http://localhost:3001/produtos", { nome: novoProduto, preco: 0, categoria: "Indefinida" })
      .then(res => {
        console.log("foi", res.data);
        setNovoProduto("");
      })
      .catch(err => console.error("Deu pau postando", err));
  }


  return (


    <div className="p-6">


      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Lista de Produtos</h1>
      <div className="mb-6 flex gap-2 justify-center">
        <input
          type="text"
          placeholder="Produto"
          value={novoProduto}
          onChange={e => setNovoProduto(e.target.value)}
          className="border p-2 rounded w-1/3"
        />
        <button
          onClick={adicionarProduto}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          add produto
        </button>
      </div>



      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {produtos.map(prod => (
          <div key={prod.id} className="border rounded p-4 shadow hover:shadow-lg transition">

            <h2 className="text-xl font-semibold mb-2">{prod.nome}</h2>
            <p className="text-gray-700 mb-1">preco {prod.preco.toFixed(2)}</p>
            <p className="text-gray-500">tipo {prod.categoria}</p>

          </div>
        ))}
      </div>


    </div>
  );
}
