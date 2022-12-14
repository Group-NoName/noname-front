import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardPacote from "../../components/CardPacote";
import Nav_ from "../../components/Nav";
import Ipacote from "../../interfaces/pacote";
import { api } from "../../service/api";
import * as S from "./styles";

function Pacotes() {
  const [pacotes, setPacote] = useState<Ipacote[]>([]);

  useEffect(() => {
    getAllPacotes();
  });

  async function getAllPacotes() {
    const response = await api.get<Ipacote[]>("/pacote/pacotes");
    setPacote(response.data);
  }

  const navigate = useNavigate();

  return (
    <>
      <S.Container>
        <section>
          <header>
            <Nav_ />
          </header>
          <main>
            <div className="pacotes">
              <h1>Pacotes</h1>
              <div className="pacotesmap"></div>
            </div>
          </main>
        </section>
      </S.Container>
    </>
  );
}

export default Pacotes;
