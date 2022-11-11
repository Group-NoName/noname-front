import Button from "../../../components/Button";
import Nav_ from "../../../components/Nav";
import * as S from "./styles";

function Login() {
  return (
    <>
      <S.Login>
        <section>
          <header>
            <Nav_ />
          </header>
          <main>
            <h1>Login</h1>
            <label>E-mail</label>
            <input type="email" placeholder="example@gmail.com" />
            <label>Senha</label>
            <input type="password" id="senha" />
            <Button
              color={"white"}
              width={"7"}
              height={"3"}
              fontSize={"15"}
              backgroundColor={"blue"}
              text={"Entrar"}
            />
          </main>
        </section>
      </S.Login>
    </>
  );
}

export default Login;
