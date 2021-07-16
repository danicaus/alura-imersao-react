// import styled from 'styled-components'
import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons.js'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

function ProfileSidebar(props) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${props.githubUser}.png`} style={{borderRadius: '8px'}}/>
      <hr/>
      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>
      <hr/>
      <AlurakutProfileSidebarMenuDefault/>
    </Box>
  )
}

function ProfileRelationsBox(props){
  return(
    <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">
          {props.title} ({props.items.length})
        </h2>
          <ul>
            {/* {items.map((itemAtual) => {
              return (
                <li key={itemAtual}>
                  <a href={`users/${itemAtual.login}`} key={itemAtual}>
                    <img src={`https://github.com/${itemAtual}.png`} />
                    <span>{itemAtual}</span>  
                  </a>
                </li>
              )
            })} */}
          </ul>
        </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const usuario = 'danicaus'
  const [comunidades, setComunidades ] = React.useState([]);
  const pessoasFavoritas = [
    'marcobrunodev',
    'omariosouto',
    'peas',
    'juunegreiros',
    'rafaballerini',
    'filipedeschamps'
  ]
  
  const [seguidores, setSeguidores] = React.useState([]);

  React.useEffect(() => {
    fetch(`https://api.github.com/users/${usuario}/followers`)
    .then((respostaServidor) => respostaServidor.json())
    .then((respostaCompleta) => setSeguidores(respostaCompleta))
    
    //api graphql
    fetch(`https://graphql.datocms.com/`, {
      method: 'POST',
      headers: {
        'Authorization': 'efb459aeb02e64d38c2ec702d8014a',
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
      },
      body: JSON.stringify({"query" : `query {
        allCommunities {
          creatorSlug
          title
          imageUrl
        }
      }`})
    })
    .then((response) => response.json())
    .then((respostaCompleta) => {
      const comunidadesDato = respostaCompleta.data.allCommunities;
      console.log(comunidadesDato)
      setComunidades(comunidadesDato)
    })
  }, [])

  return (
  <>
    <AlurakutMenu/>
    <MainGrid>
      <div className="profileArea" style={{ gridArea: 'profileArea' }}>
        <ProfileSidebar githubUser={usuario}/>
      </div>
      <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
        <Box>
          <h1 className="title">
            Bem-vindo(a), {usuario}!
          </h1>
          <OrkutNostalgicIconSet/>
        </Box>
        <Box>
          <h2 className="subTitle">O que você deseja fazer?</h2>
          <form onSubmit={function handleCriaComunidade(e) {
            e.preventDefault();
            
            const dadosDoForm = new FormData(e.target);

            const comunidade = {
              creatorSlug: usuario,
              title: dadosDoForm.get('title'),
              imageUrl: dadosDoForm.get('image'),
            }

            fetch('/api/communities', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(comunidade)
            })
            .then(async (res)=> {
              const dados = await res.json();
              console.log(dados.registro);
              const comunidade = dados.registro;
              const comunidadesAtualizadas = [...comunidades, comunidade];
              setComunidades(comunidadesAtualizadas);
            })

          }}>
            <div>
              <input 
                placeholder="Qual vai ser o nome da sua comunidade?"
                name="title" 
                aria-label="Qual vai ser o nome da sua comunidade?"
                type="text"
              />
            </div>
            <div>
              <input 
                placeholder="Coloque uma URL para a capa da sua comunidade"
                name="image"
                aria-label="Coloque uma URL para a capa da sua comunidade"
                type="text"
              />
            </div>

            <button>
              Criar comunidade
            </button>
          </form>
        </Box>
      </div>
      <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            Meus amigos ({pessoasFavoritas.length})
          </h2>

          <ul>
            {pessoasFavoritas.map((amigo) => {
              return (
                <li key={amigo}>
                  <a href={`users/${amigo}`}>
                    <img src={`https://github.com/${amigo}.png`} />
                    <span>{amigo}</span>  
                  </a>
                </li>
              )
            })}
          </ul>
        </ProfileRelationsBoxWrapper>
        <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">
          Comunidades({comunidades.length})
        </h2>
          <ul>
            {comunidades.map((itemAtual) => {
              return (
                <li key={itemAtual.title}>
                  <a href={`/communities/${itemAtual.title}`}>
                    <img src={itemAtual.imageUrl} />
                    <span>{itemAtual.title}</span>  
                  </a>
                </li>
              )
            })}
          </ul>
        </ProfileRelationsBoxWrapper>
        <ProfileRelationsBox title="Seguidores" items={seguidores}/>
      </div>
    </MainGrid>
  </>
  )

}
