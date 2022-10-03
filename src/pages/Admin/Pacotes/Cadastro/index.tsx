import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form'
import Button from '../../../../components/Button';
import Nav_Admin from '../../../../components/Nav_Admin';
import * as S from './styles';



interface CadastroPacote {
  nome: string,
  descricao: string,
  preco: number,
  images: [
      { url: string },
      { url: string },
      { url: string },
  ]
  produtos: [
    {},
    {},
    {},
  ]
}

function cadastro() {
  return(
    <section>
      <Nav_Admin/>
          <S.Cadastro>
          <main>
              <div className="Form">
                  <form>
                      <div className="nome">
                          <label htmlFor="nome">Nome</label>
                          <input
                              type="text"
                              placeholder="Pacote X"
                          />
                      </div>
                      <div className="descricao">
                          <label htmlFor="descricao">Descrição</label>
                          <textarea
                              placeholder="Descrição que o produto irá ter"
                          />
                      </div>
                      <div className="position">
                          <div className="imgs">
                              <div className="img1">
                                  <label htmlFor="url">Img1</label>
                                  <input
                                      type="text"
                                      placeholder="https://exemple.com/image1.jpg"
                                  />
                              </div>
                              <div className="img2">
                                  <label htmlFor="url">Img2</label>
                                  <input
                                      type="text"
                                      placeholder="https://exemple.com/image2.jpg"
                                  />
                              </div>
                              <div className="img3">
                                  <label htmlFor="url">Img3</label>
                                  <input
                                      type="text"
                                      placeholder="https://exemple.com/image3.jpg"
                                  />
                              </div>
                          </div>
                          <div className="produtos">
                          <Dropdown>
                            <Dropdown.Toggle id="dropdown-custom-components">
                                <>
                                    Adicionar produtos
                                </>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Form.Control aria-label="Text input with dropdown button"
                                    placeholder="Nome do produto..." />
                                            <Dropdown.ItemText>
                                                <Form.Check/>
                                            </Dropdown.ItemText>
                                        <Dropdown.ItemText>
                                            <Form.Check/>
                                        </Dropdown.ItemText>
                            </Dropdown.Menu>
                        </Dropdown>
                          </div>
                      </div>
                      <div className='preço'>
                        <label htmlFor="preco">Preço</label>
                                <input
                                    type="number"
                                    placeholder="R$ 00.00"
                                />
                                <Button color={'#ffff'} width={'8'} height={'3'} fontSize={'20'} backgroundColor={'#3a4ad9'} text={'Cadastrar'} type="submit" />
                      </div>
                  </form>
              </div>
          </main>
      </S.Cadastro>
    </section>
  ) 
}
export default cadastro;