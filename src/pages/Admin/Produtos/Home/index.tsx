import { useEffect, useState } from "react"
import Iproduto from "../../../../interfaces/produto"
import { api } from "../../../../service/api"

function Home(){
    const [produtos, setProduto] = useState<Iproduto[]>([])
    useEffect(() => { getAllProdutos() })
    async function getAllProdutos() {
      const response = await api.get<Iproduto[]>('/produto/produtos')
      setProduto(response.data)
    }
    return(
        <div>
            <header>
                {/* Aqui vai ser NavBar ADM */}
            </header>
            <main>
                <table>
                    <thead>
                        <tr>
                            <th>Nome: </th>
                            <th>Preço: </th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                    {produtos && produtos.map(i => {
                        return(
                            <tr key={i.id}>
                                <td>{i.nome}</td>
                                <td>{i.preco}</td>
                                <td></td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </main>
        </div>
    )
}
export default Home;